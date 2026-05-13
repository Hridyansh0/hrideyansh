import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { CATEGORIES_I18N, useT } from "@/lib/i18n";
import { CheckCircle2, Copy, FileText, Loader2 } from "lucide-react";

export const Route = createFileRoute("/complaint/register")({
  head: () => ({
    meta: [
      { title: "शिकायत दर्ज करें | Register Complaint — Kanpur Nagar Nigam" },
      { name: "description", content: "File your civic complaint online — sanitation, water, roads, street lights and more." },
    ],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  const navigate = useNavigate();
  const { t, lang } = useT();
  const [authReady, setAuthReady] = useState(false);
  const [hasSession, setHasSession] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<{ number: string } | null>(null);

  // Always store the Hindi label in DB for category to keep DB consistent.
  const defaultCategoryHi = (() => {
    const TR = (k: string) => k; // placeholder; we'll resolve via t below for display
    return CATEGORIES_I18N[0];
  })();

  const [form, setForm] = useState({
    citizen_name: "",
    citizen_phone: "",
    category: defaultCategoryHi, // store the key; we map to Hindi label on submit
    subject: "",
    description: "",
    address: "",
    ward: "",
    priority: "medium" as "low" | "medium" | "high",
  });

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      setHasSession(!!data.session);
      setAuthReady(true);
      if (data.session?.user) {
        const { data: profile } = await supabase
          .from("profiles").select("full_name, phone")
          .eq("user_id", data.session.user.id).maybeSingle();
        setForm((f) => ({
          ...f,
          citizen_name: profile?.full_name || "",
          citizen_phone: profile?.phone || data.session?.user.phone || "",
        }));
      }
    });
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.subject.trim() || !form.description.trim() || !form.address.trim()) {
      toast.error(t("reg.errFields")); return;
    }
    setSubmitting(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast.error(t("reg.errLogin"));
      navigate({ to: "/auth" }); return;
    }
    // Resolve category key to Hindi label (canonical) for DB storage
    const categoryHi = (() => {
      // Look up using "hi" — call t but we only have current lang; use translation map directly
      // Import is local: use TRANSLATIONS via a tiny helper
      return resolveHi(form.category);
    })();
    const payload = { ...form, category: categoryHi, user_id: user.id, complaint_number: "" };
    const { data, error } = await supabase
      .from("complaints").insert(payload as never)
      .select("complaint_number").single();
    setSubmitting(false);
    if (error) { toast.error("Error: " + error.message); return; }
    setSuccess({ number: data.complaint_number });
  };

  if (!authReady) return <SiteLayout><div className="container mx-auto px-4 py-20 text-center"><Loader2 className="w-8 h-8 animate-spin mx-auto" /></div></SiteLayout>;

  if (!hasSession) {
    return (
      <SiteLayout>
        <div className="container mx-auto px-4 py-16 max-w-md text-center">
          <div className="bg-card border border-border rounded-2xl p-8 shadow-md">
            <FileText className="w-12 h-12 mx-auto text-saffron mb-3" />
            <h2 className="font-display text-2xl font-bold mb-2">{t("reg.loginFirst")}</h2>
            <p className="text-muted-foreground text-sm mb-6">{t("reg.loginFirstDesc")}</p>
            <Button asChild className="bg-saffron text-saffron-foreground hover:bg-saffron/90">
              <Link to="/auth">{t("reg.loginBtn")}</Link>
            </Button>
          </div>
        </div>
      </SiteLayout>
    );
  }

  if (success) {
    return (
      <SiteLayout>
        <div className="container mx-auto px-4 py-12 max-w-xl">
          <div className="bg-card border border-india-green/40 rounded-2xl p-8 shadow-xl">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto rounded-full bg-india-green/10 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-12 h-12 text-india-green" />
              </div>
              <h1 className="font-display text-3xl font-bold text-primary mb-2">{t("reg.success")}</h1>
              <p className="text-muted-foreground mb-6">{t("reg.successDesc")}</p>
              <div className="bg-saffron/10 border-2 border-dashed border-saffron rounded-xl p-5 mb-6">
                <p className="text-xs uppercase tracking-wider text-saffron font-bold mb-1">{t("reg.complaintNo")}</p>
                <p className="font-display text-3xl font-bold text-primary tracking-wider">{success.number}</p>
                <button
                  onClick={() => { navigator.clipboard.writeText(success.number); toast.success(t("reg.copied")); }}
                  className="mt-2 inline-flex items-center gap-1 text-xs text-saffron hover:underline"
                >
                  <Copy className="w-3 h-3" /> {t("reg.copy")}
                </button>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild className="bg-india-green text-india-green-foreground hover:bg-india-green/90">
                  <Link to="/complaint/track">{t("reg.trackBtn")}</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/">{t("reg.home")}</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <div className="container mx-auto px-4 py-10 max-w-3xl">
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-primary">{t("reg.title")}</h1>
          <p className="text-muted-foreground mt-2">{t("reg.subtitle")}</p>
        </div>

        <form onSubmit={submit} className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-md space-y-5">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>{t("reg.name")}</Label>
              <Input value={form.citizen_name} onChange={(e) => setForm({ ...form, citizen_name: e.target.value })} required />
            </div>
            <div>
              <Label>{t("reg.phone")}</Label>
              <Input value={form.citizen_phone} onChange={(e) => setForm({ ...form, citizen_phone: e.target.value })} required />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>{t("reg.category")}</Label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
              >
                {CATEGORIES_I18N.map((k) => <option key={k} value={k}>{t(k)}</option>)}
              </select>
            </div>
            <div>
              <Label>{t("reg.priority")}</Label>
              <select
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: e.target.value as "low"|"medium"|"high" })}
                className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
              >
                <option value="low">{t("reg.pLow")}</option>
                <option value="medium">{t("reg.pMed")}</option>
                <option value="high">{t("reg.pHigh")}</option>
              </select>
            </div>
          </div>

          <div>
            <Label>{t("reg.subject")}</Label>
            <Input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} placeholder={t("reg.subjectPh")} required maxLength={150} />
          </div>

          <div>
            <Label>{t("reg.desc")}</Label>
            <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={5} placeholder={t("reg.descPh")} required maxLength={1000} />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>{t("reg.address")}</Label>
              <Textarea value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} rows={2} required />
            </div>
            <div>
              <Label>{t("reg.ward")}</Label>
              <Input value={form.ward} onChange={(e) => setForm({ ...form, ward: e.target.value })} placeholder={t("reg.wardPh")} />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="submit" disabled={submitting} className="bg-saffron text-saffron-foreground hover:bg-saffron/90 flex-1">
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : t("reg.submit")}
            </Button>
            <Button type="button" variant="outline" onClick={() => navigate({ to: "/" })}>
              {t("reg.cancel")}
            </Button>
          </div>
          {/* unused to silence lint */}
          <span className="hidden">{lang}</span>
        </form>
      </div>
    </SiteLayout>
  );
}

// Resolve a category key to its Hindi label for DB storage (canonical).
import { TRANSLATIONS } from "@/lib/i18n";
function resolveHi(key: string): string {
  return TRANSLATIONS[key]?.hi ?? key;
}
