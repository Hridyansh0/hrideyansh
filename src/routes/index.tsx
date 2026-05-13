import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/kanpur-hero.jpg";
import { SiteLayout } from "@/components/SiteLayout";
import { SERVICES_I18N, NEWS_I18N, NOTICES_I18N, LEADERS_I18N, useT } from "@/lib/i18n";
import { ArrowRight, FileText, Search, Phone, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "कानपुर नगर निगम — मुख्य पृष्ठ | Kanpur Nagar Nigam — Home" },
      { name: "description", content: "Welcome to the Kanpur Nagar Nigam citizen service portal. कानपुर नगर निगम के नागरिक सेवा पोर्टल पर आपका स्वागत है।" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <SiteLayout>
      <Hero />
      <Marquee />
      <QuickActions />
      <StatsBar />
      <ServicesGrid />
      <LeadersStrip />
      <NewsSection />
      <CTABand />
    </SiteLayout>
  );
}

function Hero() {
  const { t } = useT();
  return (
    <section className="relative h-[520px] md:h-[600px] overflow-hidden">
      <img src={heroImg} alt={t("brand.name")} className="absolute inset-0 w-full h-full object-cover" width={1920} height={1024} />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/30" />
      <div className="relative container mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl text-primary-foreground">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-saffron/20 border border-saffron text-saffron text-xs font-bold mb-5">
            {t("home.heroBadge")}
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight mb-4">
            {t("home.heroTitle1")}<br/>
            <span className="text-saffron">{t("home.heroTitle2")}</span>
          </h1>
          <p className="text-base md:text-lg opacity-90 mb-8 leading-relaxed">{t("home.heroDesc")}</p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-saffron text-saffron-foreground hover:bg-saffron/90 shadow-lg">
              <Link to="/complaint/register"><FileText className="w-5 h-5" /> {t("nav.register")}</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-white/10 backdrop-blur border-white text-white hover:bg-white hover:text-primary">
              <Link to="/complaint/track"><Search className="w-5 h-5" /> {t("nav.track")}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const { t } = useT();
  const notices = NOTICES_I18N.map((k) => t(k));
  return (
    <div className="bg-marquee border-y border-saffron/30 overflow-hidden">
      <div className="container mx-auto px-4 flex items-center gap-4 py-3">
        <span className="flex-shrink-0 px-3 py-1 bg-saffron text-saffron-foreground text-xs font-bold rounded">
          {t("home.marqueeTag")}
        </span>
        <div className="overflow-hidden flex-1">
          <div className="flex gap-12 animate-marquee whitespace-nowrap">
            {[...notices, ...notices].map((n, i) => (
              <span key={i} className="text-sm text-foreground/80 font-medium">{n}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function QuickActions() {
  const { t } = useT();
  const actions = [
    { icon: FileText, title: t("home.qa.register"), desc: t("home.qa.registerDesc"), to: "/complaint/register" as const, color: "saffron" },
    { icon: Search, title: t("home.qa.track"), desc: t("home.qa.trackDesc"), to: "/complaint/track" as const, color: "india-green" },
    { icon: Phone, title: t("home.qa.helpline"), desc: t("home.qa.helplineDesc"), to: "/contact" as const, color: "primary" },
    { icon: Calendar, title: t("home.qa.services"), desc: t("home.qa.servicesDesc"), to: "/services" as const, color: "primary" },
  ];
  return (
    <section className="container mx-auto px-4 -mt-10 relative z-10">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((a) => (
          <Link key={a.title} to={a.to} className="group bg-card border border-border rounded-xl p-5 shadow-md hover:shadow-xl transition-all hover:-translate-y-1">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 ${
              a.color === 'saffron' ? 'bg-saffron text-saffron-foreground' :
              a.color === 'india-green' ? 'bg-india-green text-india-green-foreground' :
              'bg-primary text-primary-foreground'
            }`}>
              <a.icon className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-sm md:text-base text-foreground mb-1">{a.title}</h3>
            <p className="text-xs text-muted-foreground mb-2">{a.desc}</p>
            <span className="text-xs font-semibold text-saffron flex items-center gap-1 group-hover:gap-2 transition-all">
              {t("home.qa.open")} <ArrowRight className="w-3 h-3" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function StatsBar() {
  const { t } = useT();
  const stats = [
    { value: t("stats.populationVal"), label: t("stats.population") },
    { value: "110", label: t("stats.wards") },
    { value: "85%", label: t("stats.literacy") },
    { value: "605 km²", label: t("stats.area") },
  ];
  return (
    <section className="container mx-auto px-4 mt-12">
      <div className="gov-gradient rounded-2xl p-8 md:p-10 text-primary-foreground grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s) => (
          <div key={s.label} className="text-center border-r border-white/10 last:border-r-0">
            <div className="text-3xl md:text-4xl font-display font-bold text-saffron">{s.value}</div>
            <div className="text-sm opacity-85 mt-1">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ServicesGrid() {
  const { t } = useT();
  return (
    <section className="container mx-auto px-4 py-16">
      <SectionHeading kicker={t("home.services.kicker")} title={t("home.services.title")} />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        {SERVICES_I18N.map((s) => (
          <div key={s.titleKey} className="bg-card border border-border rounded-xl p-5 hover:border-saffron hover:shadow-lg transition-all">
            <div className="text-4xl mb-3">{s.icon}</div>
            <h3 className="font-bold text-base mb-1.5">{t(s.titleKey)}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{t(s.descKey)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function LeadersStrip() {
  const { t } = useT();
  return (
    <section className="bg-muted py-16">
      <div className="container mx-auto px-4">
        <SectionHeading kicker={t("home.leaders.kicker")} title={t("home.leaders.title")} />
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">
          {LEADERS_I18N.map((l) => {
            const name = t(l.nameKey);
            const initial = name.split(" ")[1]?.[0] || name[0];
            return (
              <div key={l.nameKey} className="bg-card rounded-xl p-5 text-center border border-border">
                <div className={`w-20 h-20 mx-auto rounded-full ${l.color} flex items-center justify-center text-3xl text-white font-display font-bold mb-3 ring-4 ring-background shadow-md`}>
                  {initial}
                </div>
                <h4 className="font-bold text-sm">{name}</h4>
                <p className="text-xs text-muted-foreground mt-1">{t(l.postKey)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function NewsSection() {
  const { t } = useT();
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="flex items-end justify-between mb-8 flex-wrap gap-3">
        <SectionHeading kicker={t("home.news.kicker")} title={t("home.news.title")} align="left" />
        <Button asChild variant="outline">
          <Link to="/news">{t("home.news.all")} <ArrowRight className="w-4 h-4" /></Link>
        </Button>
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        {NEWS_I18N.map((n) => (
          <article key={n.titleKey} className="bg-card border border-border rounded-xl p-6 hover:border-saffron transition-colors">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
              <Calendar className="w-3 h-3 text-saffron" /> {t(n.dateKey)}
            </div>
            <h3 className="font-bold text-lg mb-2 leading-snug">{t(n.titleKey)}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{t(n.excerptKey)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function CTABand() {
  const { t } = useT();
  return (
    <section className="container mx-auto px-4 mb-12">
      <div className="saffron-gradient rounded-2xl p-8 md:p-12 text-center text-saffron-foreground">
        <h2 className="font-display text-2xl md:text-4xl font-bold mb-3">{t("home.cta.title")}</h2>
        <p className="opacity-95 mb-6 max-w-2xl mx-auto">{t("home.cta.desc")}</p>
        <Button asChild size="lg" className="bg-white text-saffron hover:bg-white/90 font-bold">
          <Link to="/complaint/register">{t("home.cta.btn")} <ArrowRight className="w-5 h-5" /></Link>
        </Button>
      </div>
    </section>
  );
}

function SectionHeading({ kicker, title, align = "center" }: { kicker: string; title: string; align?: "center" | "left" }) {
  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      <div className="inline-flex items-center gap-2 mb-2">
        <span className="h-0.5 w-8 bg-saffron" />
        <span className="text-xs font-bold tracking-widest uppercase text-saffron">{kicker}</span>
        <span className="h-0.5 w-8 bg-india-green" />
      </div>
      <h2 className="font-display text-3xl md:text-4xl font-bold text-primary">{title}</h2>
    </div>
  );
}
