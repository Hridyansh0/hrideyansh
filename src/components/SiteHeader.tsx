import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Phone, LogIn, LogOut, ShieldCheck, Languages } from "lucide-react";
import { AshokaChakra } from "./AshokaChakra";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useT } from "@/lib/i18n";
import type { Session } from "@supabase/supabase-js";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const { t, lang, setLang } = useT();

  const NAV = [
    { to: "/", label: t("nav.home") },
    { to: "/services", label: t("nav.services") },
    { to: "/news", label: t("nav.news") },
    { to: "/about", label: t("nav.about") },
    { to: "/contact", label: t("nav.contact") },
  ] as const;

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s);
      if (s?.user) {
        setTimeout(async () => {
          const { data } = await supabase
            .from("user_roles")
            .select("role")
            .eq("user_id", s.user.id)
            .eq("role", "admin")
            .maybeSingle();
          setIsAdmin(!!data);
        }, 0);
      } else {
        setIsAdmin(false);
      }
    });
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    return () => subscription.unsubscribe();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/" });
  };

  const LangToggle = ({ className = "" }: { className?: string }) => (
    <button
      onClick={() => setLang(lang === "hi" ? "en" : "hi")}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-saffron/40 bg-saffron/10 hover:bg-saffron hover:text-saffron-foreground text-xs font-bold transition-colors ${className}`}
      aria-label="Toggle language"
      title={lang === "hi" ? "Switch to English" : "हिंदी में देखें"}
    >
      <Languages className="w-3.5 h-3.5" />
      {lang === "hi" ? "EN" : "हिं"}
    </button>
  );

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border shadow-sm">
      <div className="h-1 tiranga-bar" />

      <div className="bg-primary text-primary-foreground text-xs">
        <div className="container mx-auto px-4 h-8 flex items-center justify-between">
          <span className="hidden sm:flex items-center gap-2">
            <Phone className="w-3 h-3" /> {t("brand.helpline")}
          </span>
          <span className="text-saffron font-semibold tracking-wide">
            {t("brand.govStrip")}
          </span>
          <LangToggle />
        </div>
      </div>

      <div className="container mx-auto px-4 py-3 flex items-center gap-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-full bg-saffron flex items-center justify-center shadow-md ring-2 ring-saffron/30">
            <AshokaChakra size={36} className="text-navy" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-primary leading-tight font-display">
              {t("brand.name")}
            </h1>
            <p className="text-[11px] md:text-xs text-muted-foreground">
              {t("brand.tag")}
            </p>
          </div>
        </Link>

        <div className="flex-1" />

        <div className="hidden lg:flex items-center gap-2">
          {session ? (
            <>
              {isAdmin && (
                <Button asChild variant="outline" size="sm">
                  <Link to="/admin"><ShieldCheck className="w-4 h-4" /> {t("nav.admin")}</Link>
                </Button>
              )}
              <Button onClick={logout} variant="ghost" size="sm">
                <LogOut className="w-4 h-4" /> {t("nav.logout")}
              </Button>
            </>
          ) : (
            <Button asChild variant="ghost" size="sm">
              <Link to="/auth"><LogIn className="w-4 h-4" /> {t("nav.login")}</Link>
            </Button>
          )}
          <Button asChild className="bg-saffron text-saffron-foreground hover:bg-saffron/90">
            <Link to="/complaint/register">{t("nav.register")}</Link>
          </Button>
          <Button asChild variant="outline" className="border-india-green text-india-green hover:bg-india-green hover:text-india-green-foreground">
            <Link to="/complaint/track">{t("nav.track")}</Link>
          </Button>
        </div>

        <button
          className="lg:hidden p-2 rounded-md hover:bg-muted"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      <nav className="hidden lg:block bg-primary/5 border-t border-border">
        <div className="container mx-auto px-4">
          <ul className="flex items-center gap-1">
            {NAV.map((n) => (
              <li key={n.to}>
                <Link
                  to={n.to}
                  className="block px-4 py-3 text-sm font-semibold text-primary hover:bg-saffron hover:text-saffron-foreground transition-colors"
                  activeProps={{ className: "block px-4 py-3 text-sm font-semibold bg-saffron text-saffron-foreground" }}
                  activeOptions={{ exact: n.to === "/" }}
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {open && (
        <div className="lg:hidden border-t border-border bg-card">
          <div className="container mx-auto px-4 py-3 flex flex-col gap-1">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="px-3 py-2 rounded font-semibold text-primary hover:bg-muted"
              >
                {n.label}
              </Link>
            ))}
            <div className="h-px bg-border my-2" />
            <LangToggle className="self-start" />
            <Button asChild className="bg-saffron text-saffron-foreground" onClick={() => setOpen(false)}>
              <Link to="/complaint/register">{t("nav.register")}</Link>
            </Button>
            <Button asChild variant="outline" onClick={() => setOpen(false)}>
              <Link to="/complaint/track">{t("nav.trackFull")}</Link>
            </Button>
            {session ? (
              <>
                {isAdmin && (
                  <Button asChild variant="outline" onClick={() => setOpen(false)}>
                    <Link to="/admin">{t("nav.adminPanel")}</Link>
                  </Button>
                )}
                <Button variant="ghost" onClick={() => { logout(); setOpen(false); }}>
                  {t("nav.logout")}
                </Button>
              </>
            ) : (
              <Button asChild variant="ghost" onClick={() => setOpen(false)}>
                <Link to="/auth">{t("nav.loginRegister")}</Link>
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
