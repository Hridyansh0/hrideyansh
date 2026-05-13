import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Search, Loader2, MapPin, Calendar, CheckCircle2 } from "lucide-react";
import { STATUS_COLOR } from "@/lib/site-data";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/complaint/track")({
  head: () => ({
    meta: [
      { title: "शिकायत ट्रैक करें | Track Complaint — Kanpur Nagar Nigam" },
      { name: "description", content: "Check the current status of your complaint by complaint number." },
    ],
  }),
  component: TrackPage,
});

interface ComplaintRow {
  id: string; complaint_number: string; citizen_name: string; category: string;
  subject: string; description: string; address: string; ward: string | null;
  status: "pending" | "in_progress" | "resolved" | "rejected"; priority: string; created_at: string;
}
interface UpdateRow {
  id: string; status: ComplaintRow["status"]; note: string | null; created_at: string;
}

function TrackPage() {
  const { t, lang } = useT();
  const [number, setNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [complaint, setComplaint] = useState<ComplaintRow | null>(null);
  const [updates, setUpdates] = useState<UpdateRow[]>([]);
  const [myList, setMyList] = useState<ComplaintRow[]>([]);
  const [hasSession, setHasSession] = useState(false);
  const locale = lang === "hi" ? "hi-IN" : "en-IN";

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      if (data.session) {
        setHasSession(true);
        const { data: list } = await supabase.from("complaints").select("*").order("created_at", { ascending: false });
        setMyList((list as ComplaintRow[]) || []);
      }
    });
  }, []);

  const search = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const q = number.trim().toUpperCase();
    if (!q) { toast.error(t("track.errEmpty")); return; }
    setLoading(true);
    const { data, error } = await supabase.from("complaints").select("*").eq("complaint_number", q).maybeSingle();
    if (error || !data) {
      setLoading(false);
      toast.error(t("track.errNotFound"));
      setComplaint(null); setUpdates([]); return;
    }
    const { data: ups } = await supabase.from("complaint_updates").select("*").eq("complaint_id", data.id).order("created_at", { ascending: true });
    setComplaint(data as ComplaintRow);
    setUpdates((ups as UpdateRow[]) || []);
    setLoading(false);
  };

  return (
    <SiteLayout>
      <div className="container mx-auto px-4 py-10 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-primary">{t("track.title")}</h1>
          <p className="text-muted-foreground mt-2">{t("track.subtitle")}</p>
        </div>

        <form onSubmit={search} className="bg-card border border-border rounded-2xl p-6 shadow-md mb-8">
          <div className="flex flex-col sm:flex-row gap-3">
            <Input value={number} onChange={(e) => setNumber(e.target.value.toUpperCase())} placeholder={t("track.placeholder")} className="flex-1 font-display text-lg tracking-wider" />
            <Button type="submit" disabled={loading} className="bg-saffron text-saffron-foreground hover:bg-saffron/90 sm:w-auto w-full">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Search className="w-4 h-4" /> {t("track.search")}</>}
            </Button>
          </div>
        </form>

        {complaint && <ComplaintDetail complaint={complaint} updates={updates} locale={locale} />}

        {hasSession && myList.length > 0 && !complaint && (
          <section>
            <h2 className="font-display text-xl font-bold mb-4 text-primary">{t("track.myList")}</h2>
            <div className="space-y-3">
              {myList.map((c) => (
                <button key={c.id} onClick={() => { setNumber(c.complaint_number); setTimeout(() => search(), 0); }}
                  className="w-full text-left bg-card border border-border rounded-xl p-4 hover:border-saffron transition-all">
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <div>
                      <p className="font-display font-bold text-primary">{c.complaint_number}</p>
                      <p className="text-sm font-semibold mt-0.5">{c.subject}</p>
                      <p className="text-xs text-muted-foreground mt-1">{c.category} · {new Date(c.created_at).toLocaleDateString(locale)}</p>
                    </div>
                    <span className={`px-3 py-1 text-xs font-bold rounded-full border ${STATUS_COLOR[c.status]}`}>
                      {t(`status.${c.status}`)}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}

        {!hasSession && !complaint && (
          <div className="text-center text-sm text-muted-foreground">
            <Link to="/auth" className="text-saffron font-semibold hover:underline">{t("track.loginCta1")}</Link> {t("track.loginCta2")}
          </div>
        )}
      </div>
    </SiteLayout>
  );
}

function ComplaintDetail({ complaint, updates, locale }: { complaint: ComplaintRow; updates: UpdateRow[]; locale: string }) {
  const { t } = useT();
  return (
    <div className="bg-card border border-border rounded-2xl shadow-md overflow-hidden mb-8">
      <div className="h-1 tiranga-bar" />
      <div className="p-6 md:p-8">
        <div className="flex items-start justify-between gap-4 flex-wrap mb-6">
          <div>
            <p className="text-xs uppercase tracking-wider text-saffron font-bold">{t("reg.complaintNo")}</p>
            <h2 className="font-display text-2xl font-bold text-primary tracking-wider">{complaint.complaint_number}</h2>
          </div>
          <span className={`px-4 py-2 text-sm font-bold rounded-full border ${STATUS_COLOR[complaint.status]}`}>
            {t(`status.${complaint.status}`)}
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <Field label={t("track.subject")} value={complaint.subject} />
          <Field label={t("track.cat")} value={complaint.category} />
          <Field label={t("track.citizen")} value={complaint.citizen_name} />
          <Field label={t("track.ward")} value={complaint.ward || "—"} />
          <Field label={t("track.date")} value={new Date(complaint.created_at).toLocaleString(locale)} icon={<Calendar className="w-3 h-3" />} />
          <Field label={t("track.address")} value={complaint.address} icon={<MapPin className="w-3 h-3" />} />
        </div>

        <div className="bg-muted rounded-lg p-4 mb-6">
          <p className="text-xs uppercase tracking-wider text-muted-foreground font-bold mb-1">{t("track.detail")}</p>
          <p className="text-sm leading-relaxed">{complaint.description}</p>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-4 text-primary">{t("track.history")}</h3>
          <div className="space-y-3">
            {updates.map((u, i) => (
              <div key={u.id} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${i === updates.length - 1 ? 'bg-saffron text-saffron-foreground' : 'bg-muted'}`}>
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  {i < updates.length - 1 && <div className="w-0.5 flex-1 bg-border my-1" />}
                </div>
                <div className="flex-1 pb-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`px-2 py-0.5 text-xs font-bold rounded border ${STATUS_COLOR[u.status]}`}>
                      {t(`status.${u.status}`)}
                    </span>
                    <span className="text-xs text-muted-foreground">{new Date(u.created_at).toLocaleString(locale)}</span>
                  </div>
                  {u.note && <p className="text-sm mt-1">{u.note}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wider text-muted-foreground font-bold mb-0.5 flex items-center gap-1">{icon}{label}</p>
      <p className="text-sm font-medium">{value}</p>
    </div>
  );
}
