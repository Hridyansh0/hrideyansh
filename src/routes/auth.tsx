import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Phone, KeyRound, Loader2 } from "lucide-react";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "नागरिक लॉगिन | Citizen Login — Kanpur Nagar Nigam" },
      { name: "description", content: "Secure citizen login via mobile OTP." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const { t } = useT();
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/" });
    });
  }, [navigate]);

  const sendOtp = async () => {
    const cleaned = phone.replace(/\D/g, "");
    if (cleaned.length !== 10) { toast.error(t("auth.errPhone")); return; }
    if (!name.trim()) { toast.error(t("auth.errName")); return; }
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      phone: `+91${cleaned}`,
      options: { data: { full_name: name } },
    });
    setLoading(false);
    if (error) { toast.error(error.message); return; }
    toast.success(t("auth.otpSent"));
    setStep("otp");
  };

  const verifyOtp = async () => {
    if (otp.length !== 6) { toast.error(t("auth.errOtp")); return; }
    setLoading(true);
    const cleaned = phone.replace(/\D/g, "");
    const { error } = await supabase.auth.verifyOtp({ phone: `+91${cleaned}`, token: otp, type: "sms" });
    setLoading(false);
    if (error) { toast.error(t("auth.errOtpWrong")); return; }
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase.from("profiles").update({ full_name: name, phone: `+91${cleaned}` }).eq("user_id", user.id);
    }
    toast.success(t("auth.success"));
    navigate({ to: "/" });
  };

  return (
    <SiteLayout>
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-md mx-auto bg-card border border-border rounded-2xl shadow-xl overflow-hidden">
          <div className="h-1 tiranga-bar" />
          <div className="p-6 md:p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto rounded-full bg-saffron/10 flex items-center justify-center mb-3">
                {step === "phone" ? <Phone className="w-7 h-7 text-saffron" /> : <KeyRound className="w-7 h-7 text-saffron" />}
              </div>
              <h1 className="font-display text-2xl font-bold text-primary">
                {step === "phone" ? t("auth.titlePhone") : t("auth.titleOtp")}
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                {step === "phone" ? t("auth.subtitlePhone") : `${t("auth.subtitleOtp")} +91 ${phone}`}
              </p>
            </div>

            {step === "phone" ? (
              <div className="space-y-4">
                <div>
                  <Label>{t("auth.fullName")}</Label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} placeholder={t("auth.fullNamePh")} />
                </div>
                <div>
                  <Label>{t("auth.mobile")}</Label>
                  <div className="flex gap-2">
                    <span className="flex items-center px-3 rounded-md border border-input bg-muted text-sm font-semibold">+91</span>
                    <Input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                      placeholder={t("auth.mobilePh")}
                      inputMode="numeric"
                    />
                  </div>
                </div>
                <Button onClick={sendOtp} disabled={loading} className="w-full bg-saffron text-saffron-foreground hover:bg-saffron/90">
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : t("auth.sendOtp")}
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <Label>{t("auth.otpLabel")}</Label>
                  <Input
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    placeholder="••••••"
                    inputMode="numeric"
                    className="text-center text-2xl tracking-widest font-display"
                  />
                </div>
                <Button onClick={verifyOtp} disabled={loading} className="w-full bg-india-green text-india-green-foreground hover:bg-india-green/90">
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : t("auth.verify")}
                </Button>
                <Button variant="ghost" onClick={() => setStep("phone")} className="w-full">
                  {t("auth.changeNumber")}
                </Button>
              </div>
            )}
          </div>
          <div className="bg-muted px-6 py-3 text-xs text-center text-muted-foreground">
            {t("auth.secure")}
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
