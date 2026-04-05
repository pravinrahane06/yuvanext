import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/layout/Layout";
import PageHero from "@/components/ui/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, User, CreditCard } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

const DonorIdCard = () => {
  const { user } = useAuth();

  const { data: profile } = useQuery({
    queryKey: ["donor-profile", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user!.id)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const { data: totalDonated = 0 } = useQuery({
    queryKey: ["donor-total", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("donations")
        .select("amount")
        .eq("user_id", user!.id)
        .eq("payment_status", "completed");
      if (error) throw error;
      return data.reduce((s, d) => s + Number(d.amount), 0);
    },
    enabled: !!user,
  });

  const downloadCard = () => {
    const content = `
╔══════════════════════════════════════╗
║      YUVANEXT FOUNDATION            ║
║      DONOR IDENTITY CARD            ║
╠══════════════════════════════════════╣
║                                      ║
║  Name: ${(profile?.name || "Donor").padEnd(28)}║
║  Email: ${(user?.email || "").padEnd(27)}║
║  Phone: ${(profile?.phone || "N/A").padEnd(27)}║
║  Member Since: ${new Date(profile?.created_at || "").toLocaleDateString("en-IN").padEnd(20)}║
║  Total Contributed: ₹${totalDonated.toLocaleString("en-IN").padEnd(14)}║
║  Donor ID: ${(user?.id?.slice(0, 8).toUpperCase() || "").padEnd(24)}║
║                                      ║
║  This card certifies that the above  ║
║  person is a registered donor of     ║
║  YUVANEXT Foundation.                ║
║                                      ║
╚══════════════════════════════════════╝
    `.trim();

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `YUVANEXT_Donor_ID_${user?.id?.slice(0, 8)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!user) {
    return (
      <Layout>
        <PageHero title="Donor ID Card" subtitle="Login to view your donor identity card" />
        <div className="py-20 text-center">
          <p className="text-muted-foreground">Please <a href="/login" className="text-primary underline">login</a> to access your ID card.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageHero title="Donor ID Card" subtitle="Your official YUVANEXT Foundation donor identity" />
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-lg">
          <Card className="overflow-hidden">
            <div className="bg-gradient-to-r from-primary to-accent p-6 text-primary-foreground">
              <div className="flex items-center gap-3 mb-2">
                <CreditCard className="w-6 h-6" />
                <span className="font-bold text-lg">YUVANEXT FOUNDATION</span>
              </div>
              <p className="text-sm opacity-80">Official Donor Identity Card</p>
            </div>
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-foreground">{profile?.name || "Donor"}</h3>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><span className="text-muted-foreground">Donor ID</span><p className="font-mono font-semibold text-foreground">{user.id.slice(0, 8).toUpperCase()}</p></div>
                <div><span className="text-muted-foreground">Member Since</span><p className="font-semibold text-foreground">{new Date(profile?.created_at || "").toLocaleDateString("en-IN")}</p></div>
                <div><span className="text-muted-foreground">Total Donated</span><p className="font-semibold text-primary">₹{totalDonated.toLocaleString("en-IN")}</p></div>
                <div><span className="text-muted-foreground">Status</span><Badge className="mt-1">Active Donor</Badge></div>
              </div>
              <Button onClick={downloadCard} className="w-full mt-4">
                <Download className="w-4 h-4 mr-2" /> Download ID Card
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
};

export default DonorIdCard;
