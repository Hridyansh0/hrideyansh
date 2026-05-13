import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHeader } from "./services";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "संपर्क | Contact — Kanpur Nagar Nigam" },
      { name: "description", content: "Address, phone, email and office hours of Kanpur Nagar Nigam." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { t } = useT();
  const cards = [
    { icon: MapPin, title: t("contact.hq"), value: t("contact.hqVal"), color: "saffron" },
    { icon: Phone, title: t("contact.helpline"), value: t("contact.helplineVal"), color: "india-green" },
    { icon: Mail, title: t("contact.email"), value: t("contact.emailVal"), color: "primary" },
    { icon: Clock, title: t("contact.hours"), value: t("contact.hoursVal"), color: "primary" },
  ];
  return (
    <SiteLayout>
      <PageHeader title={t("contact.title")} subtitle={t("contact.subtitle")} />
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="grid md:grid-cols-2 gap-6">
          {cards.map((c) => (
            <div key={c.title} className="bg-card border border-border rounded-xl p-6 flex gap-4">
              <div className={`w-12 h-12 rounded-lg flex-shrink-0 flex items-center justify-center ${
                c.color === 'saffron' ? 'bg-saffron text-saffron-foreground' :
                c.color === 'india-green' ? 'bg-india-green text-india-green-foreground' :
                'bg-primary text-primary-foreground'
              }`}>
                <c.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-primary mb-1">{c.title}</h3>
                <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">{c.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-saffron/10 border-2 border-dashed border-saffron rounded-xl p-6 text-center">
          <p className="font-bold text-primary text-lg mb-1">{t("contact.emergency")}</p>
          <p className="text-sm text-muted-foreground">{t("contact.emergencyDesc")} <strong className="text-saffron text-xl">1533</strong> (24×7)</p>
        </div>
      </div>
    </SiteLayout>
  );
}
