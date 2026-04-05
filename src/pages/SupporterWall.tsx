import { Heart, Loader2 } from "lucide-react";
import Layout from "@/components/layout/Layout";
import PageHero from "@/components/ui/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "@/hooks/useTranslation";

const SupporterWall = () => {
  const { t } = useTranslation();

  const { data: donors = [], isLoading } = useQuery({
    queryKey: ["supporter-wall"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("donations")
        .select("amount, created_at, is_anonymous, tribute_name, user_id, profiles(name)")
        .eq("payment_status", "completed")
        .eq("is_anonymous", false)
        .order("created_at", { ascending: false })
        .limit(100);
      if (error) throw error;
      return data;
    },
  });

  const uniqueDonors = donors.reduce((acc: Record<string, { name: string; total: number; count: number }>, d: any) => {
    const name = d.profiles?.name || d.tribute_name || "Supporter";
    const key = d.user_id || name;
    if (!acc[key]) acc[key] = { name, total: 0, count: 0 };
    acc[key].total += Number(d.amount);
    acc[key].count += 1;
    return acc;
  }, {});

  const supporterList = Object.values(uniqueDonors).sort((a, b) => b.total - a.total);

  return (
    <Layout>
      <PageHero title="Supporter Wall" subtitle="Honoring the generous hearts who make our mission possible" />

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : supporterList.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">Be the first to support our cause!</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
              {supporterList.map((supporter, i) => (
                <Card key={i} className="card-hover text-center">
                  <CardContent className="pt-6">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                      <Heart className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground">{supporter.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {supporter.count} contribution{supporter.count > 1 ? "s" : ""}
                    </p>
                    <p className="text-xs text-primary font-medium mt-1">
                      ₹{supporter.total.toLocaleString("en-IN")}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default SupporterWall;
