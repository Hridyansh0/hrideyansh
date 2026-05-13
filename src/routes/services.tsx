import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { SERVICES_I18N, useT } from "@/lib/i18n";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "सेवाएं | Services — Kanpur Nagar Nigam" },
      { name: "description", content: "All citizen services provided by Kanpur Nagar Nigam." },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const { t } = useT();
  return (
    <SiteLayout>
      <PageHeader title={t("services.title")} subtitle={t("services.subtitle")} />
      <div className="container mx-auto px-4 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES_I18N.map((s) => (
            <div key={s.titleKey} className="bg-card border border-border rounded-xl p-6 hover:border-saffron hover:shadow-lg transition-all">
              <div className="text-5xl mb-4">{s.icon}</div>
              <h3 className="font-bold text-lg mb-2 text-primary">{t(s.titleKey)}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{t(s.descKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </SiteLayout>
  );
}

export function PageHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="gov-gradient text-primary-foreground py-16">
      <div className="container mx-auto px-4 text-center">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-2">{title}</h1>
        <p className="opacity-90 max-w-2xl mx-auto">{subtitle}</p>
        <div className="mt-4 h-1 w-32 mx-auto tiranga-bar rounded" />
      </div>
    </div>
  );
}
