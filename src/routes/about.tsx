import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHeader } from "./services";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "हमारे बारे में | About — Kanpur Nagar Nigam" },
      { name: "description", content: "About Kanpur Nagar Nigam — history, mission, vision and scope." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { t } = useT();
  const stats = [
    { value: t("stats.populationVal"), label: t("stats.population") },
    { value: "110", label: t("stats.wards") },
    { value: "85%", label: t("stats.literacy") },
    { value: "605 km²", label: t("stats.area") },
  ];
  return (
    <SiteLayout>
      <PageHeader title={t("about.title")} subtitle={t("about.subtitle")} />
      <div className="container mx-auto px-4 py-12 max-w-4xl space-y-8">
        <section className="prose prose-lg max-w-none">
          <p className="text-lg leading-relaxed text-foreground">{t("about.intro")}</p>
        </section>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="text-3xl mb-2">🎯</div>
            <h3 className="font-display text-xl font-bold text-primary mb-2">{t("about.visionT")}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{t("about.visionD")}</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="text-3xl mb-2">🏛️</div>
            <h3 className="font-display text-xl font-bold text-primary mb-2">{t("about.missionT")}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{t("about.missionD")}</p>
          </div>
        </div>

        <div className="gov-gradient text-primary-foreground rounded-2xl p-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-display font-bold text-saffron">{s.value}</div>
              <div className="text-sm opacity-85 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        <section>
          <h2 className="font-display text-2xl font-bold text-primary mb-4">{t("about.historyT")}</h2>
          <p className="text-muted-foreground leading-relaxed">{t("about.historyD")}</p>
        </section>
      </div>
    </SiteLayout>
  );
}
