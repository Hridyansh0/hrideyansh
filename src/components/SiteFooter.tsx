import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin } from "lucide-react";
import { AshokaChakra } from "./AshokaChakra";
import { useT } from "@/lib/i18n";

export function SiteFooter() {
  const { t } = useT();
  return (
    <footer className="mt-16 bg-primary text-primary-foreground">
      <div className="h-1 tiranga-bar" />
      <div className="container mx-auto px-4 py-12 grid md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-saffron flex items-center justify-center">
              <AshokaChakra size={32} className="text-navy" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold">{t("brand.name")}</h3>
              <p className="text-xs opacity-80">{t("brand.motto")}</p>
            </div>
          </div>
          <p className="text-sm opacity-80 leading-relaxed">{t("footer.about")}</p>
        </div>

        <div>
          <h4 className="font-bold mb-4 text-saffron">{t("footer.quickLinks")}</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/services" className="hover:text-saffron">{t("nav.services")}</Link></li>
            <li><Link to="/news" className="hover:text-saffron">{t("nav.news")}</Link></li>
            <li><Link to="/about" className="hover:text-saffron">{t("nav.about")}</Link></li>
            <li><Link to="/contact" className="hover:text-saffron">{t("nav.contact")}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4 text-saffron">{t("footer.complaintMgmt")}</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/complaint/register" className="hover:text-saffron">{t("nav.register")}</Link></li>
            <li><Link to="/complaint/track" className="hover:text-saffron">{t("nav.trackFull")}</Link></li>
            <li><Link to="/auth" className="hover:text-saffron">{t("footer.citizenLogin")}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4 text-saffron">{t("footer.contact")}</h4>
          <ul className="space-y-3 text-sm opacity-90">
            <li className="flex gap-2"><MapPin className="w-4 h-4 text-saffron flex-shrink-0 mt-0.5" /><span>{t("footer.address")}</span></li>
            <li className="flex gap-2"><Phone className="w-4 h-4 text-saffron flex-shrink-0 mt-0.5" /><span>{t("footer.phone")}</span></li>
            <li className="flex gap-2"><Mail className="w-4 h-4 text-saffron flex-shrink-0 mt-0.5" /><span>info@kmc.up.nic.in</span></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between text-xs opacity-80 gap-2">
          <p>© {new Date().getFullYear()} {t("brand.name")} · {t("footer.copyright")}</p>
          <p>{t("footer.tagline")}</p>
        </div>
      </div>
    </footer>
  );
}
