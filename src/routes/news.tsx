import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHeader } from "./services";
import { NEWS_I18N, NEWS_EXTRA_I18N, useT } from "@/lib/i18n";
import { Calendar } from "lucide-react";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "समाचार | News — Kanpur Nagar Nigam" },
      { name: "description", content: "Latest announcements, news and citizen notices from Kanpur Nagar Nigam." },
    ],
  }),
  component: NewsPage,
});

function NewsPage() {
  const { t } = useT();
  const all = [...NEWS_I18N, ...NEWS_EXTRA_I18N];
  return (
    <SiteLayout>
      <PageHeader title={t("news.title")} subtitle={t("news.subtitle")} />
      <div className="container mx-auto px-4 py-12 max-w-4xl space-y-5">
        {all.map((n) => (
          <article key={n.titleKey} className="bg-card border border-border rounded-xl p-6 hover:border-saffron transition-colors">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
              <Calendar className="w-3 h-3 text-saffron" /> {t(n.dateKey)}
            </div>
            <h2 className="font-display font-bold text-xl mb-2 text-primary">{t(n.titleKey)}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{t(n.excerptKey)}</p>
          </article>
        ))}
      </div>
    </SiteLayout>
  );
}
