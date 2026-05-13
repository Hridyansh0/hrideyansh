import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { STATUS_COLOR } from "@/lib/site-data";
import { useT } from "@/lib/i18n";
import { ShieldCheck, Loader2, Filter } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin Panel — Kanpur Nagar Nigam" }, { name: "robots", content: "noindex" }] }),
  component: AdminPage,
});

interface ComplaintRow {
  id: string; complaint_number: string; citizen_name: string; citizen_phone: string;
  category: string; subject: string; description: string; address: string; ward: string | null;
  status: "pending" | "in_progress" | "resolved" | "rejected"; priority: string; created_at: string;
}

function AdminPage() {
  const navigate = useNavigate();
  const { t, lang } = useT();
  const locale = lang === "hi" ? "hi-IN" : "en-IN";
  const [authChecked, setAuthChecked] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [complaints, setComplaints] = useState<ComplaintRow[]>([]);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { navigate({ to: "/auth" }); return; }
      const { data: role } = await supabase.from("user_roles").select("role")
        .eq("user_id", session.user.id).eq("role", "admin").maybeSingle();
      setIsAdmin(!!role);
      setAuthChecked(true);
      if (role) loadComplaints();
    })();
  }, [navigate]);

  const loadComplaints = async () => {
    const { data } = await supabase.from("complaints").select("*").order("created_at", { ascending: false });
    setComplaints((data as ComplaintRow[]) || []);
  };

  const updateStatus = async (id: string, status: string, note: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    const { error: e1 } = await supabase.from("complaints").update({ status: status as ComplaintRow["status"] } as never).eq("id", id);
    if (e1) { toast.error(e1.message); return; }
    await supabase.from("complaint_updates").insert({
      complaint_id: id, status: status as ComplaintRow["status"], note, created_by: user?.id,
    } as never);
    toast.success(t("admin.updated"));
    loadComplaints();
  };

  if (!authChecked) return <SiteLayout><div className="container mx-auto py-20 text-center"><Loader2 className="w-8 h-8 animate-spin mx-auto" /></div></SiteLayout>;

  if (!isAdmin) {
    return (
      <SiteLayout>
        <div className="container mx-auto px-4 py-16 max-w-md text-center">
          <div className="bg-card border border-destructive/40 rounded-xl p-8">
            <ShieldCheck className="w-12 h-12 mx-auto text-destructive mb-3" />
            <h2 className="font-display text-2xl font-bold mb-2">{t("admin.denied")}</h2>
            <p className="text-sm text-muted-foreground mb-4">{t("admin.deniedDesc")}</p>
            <p className="text-xs text-muted-foreground mb-4">{t("admin.deniedHint")}</p>
            <Button asChild variant="outline"><Link to="/">{t("reg.home")}</Link></Button>
          </div>
        </div>
      </SiteLayout>
    );
  }

  const filtered = filter === "all" ? complaints : complaints.filter((c) => c.status === filter);
  const counts = {
    all: complaints.length,
    pending: complaints.filter((c) => c.status === "pending").length,
    in_progress: complaints.filter((c) => c.status === "in_progress").length,
    resolved: complaints.filter((c) => c.status === "resolved").length,
    rejected: complaints.filter((c) => c.status === "rejected").length,
  };

  return (
    <SiteLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div>
            <h1 className="font-display text-3xl font-bold text-primary flex items-center gap-2">
              <ShieldCheck className="w-7 h-7 text-saffron" /> {t("admin.title")}
            </h1>
            <p className="text-muted-foreground text-sm mt-1">{t("admin.subtitle")}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
          {(["all","pending","in_progress","resolved","rejected"] as const).map((k) => (
            <button key={k} onClick={() => setFilter(k)}
              className={`p-4 rounded-xl border text-left transition-all ${
                filter === k ? "border-saffron bg-saffron/10 shadow-md" : "border-border bg-card hover:border-saffron/50"
              }`}>
              <p className="text-xs font-bold uppercase text-muted-foreground">
                {k === "all" ? t("admin.all") : t(`status.${k}`)}
              </p>
              <p className="text-2xl font-display font-bold text-primary">{counts[k]}</p>
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filtered.length === 0 && (
            <div className="text-center py-12 text-muted-foreground bg-card rounded-xl border border-border">
              <Filter className="w-10 h-10 mx-auto mb-2 opacity-40" />
              {t("admin.empty")}
            </div>
          )}
          {filtered.map((c) => <AdminCard key={c.id} c={c} onUpdate={updateStatus} locale={locale} />)}
        </div>
      </div>
    </SiteLayout>
  );
}

function AdminCard({ c, onUpdate, locale }: { c: ComplaintRow; onUpdate: (id: string, s: string, n: string) => void; locale: string }) {
  const { t } = useT();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(c.status);
  const [note, setNote] = useState("");

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full text-left p-5 hover:bg-muted/50 transition-colors">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="font-display font-bold text-primary">{c.complaint_number}</span>
              <span className={`px-2 py-0.5 text-xs font-bold rounded border ${STATUS_COLOR[c.status]}`}>
                {t(`status.${c.status}`)}
              </span>
              {c.priority === "high" && <span className="px-2 py-0.5 text-xs font-bold rounded bg-destructive text-destructive-foreground">{t("admin.high")}</span>}
            </div>
            <p className="font-semibold text-sm">{c.subject}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {c.category} · {c.citizen_name} ({c.citizen_phone}) · {new Date(c.created_at).toLocaleString(locale)}
            </p>
          </div>
        </div>
      </button>
      {open && (
        <div className="border-t border-border p-5 bg-muted/30 space-y-4">
          <div>
            <p className="text-xs font-bold uppercase text-muted-foreground mb-1">{t("admin.detail")}</p>
            <p className="text-sm">{c.description}</p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase text-muted-foreground mb-1">{t("admin.address")}</p>
            <p className="text-sm">{c.address} {c.ward && `(${c.ward})`}</p>
          </div>

          <div className="bg-card rounded-lg p-4 border border-border">
            <p className="font-bold text-sm mb-3 text-primary">{t("admin.updateStatus")}</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <select value={status} onChange={(e) => setStatus(e.target.value as ComplaintRow["status"])}
                className="h-10 rounded-md border border-input bg-background px-3 text-sm sm:w-48">
                {(["pending","in_progress","resolved","rejected"] as const).map((k) => (
                  <option key={k} value={k}>{t(`status.${k}`)}</option>
                ))}
              </select>
              <Textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder={t("admin.notePh")} rows={2} className="flex-1" />
            </div>
            <Button className="mt-3 bg-india-green text-india-green-foreground hover:bg-india-green/90"
              onClick={() => { onUpdate(c.id, status, note); setNote(""); setOpen(false); }}>
              {t("admin.update")}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
