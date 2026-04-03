import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import PageHero from "@/components/ui/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

interface Campaign {
  id: string;
  title: string;
  slug: string;
  description: string;
  goal_amount: number;
  raised_amount: number;
  start_date: string;
  end_date: string | null;
  featured_image: string;
  status: string;
}

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("campaigns")
      .select("*")
      .eq("status", "active")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setCampaigns((data as Campaign[]) || []);
        setLoading(false);
      });
  }, []);

  const percent = (raised: number, goal: number) =>
    goal > 0 ? Math.min(Math.round((raised / goal) * 100), 100) : 0;

  return (
    <Layout>
      <PageHero title="Our Campaigns" subtitle="Support causes that matter" />
      <section className="py-16 px-4 max-w-6xl mx-auto">
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-72 rounded-lg" />
            ))}
          </div>
        ) : campaigns.length === 0 ? (
          <p className="text-center text-muted-foreground">No active campaigns at the moment.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.map((c) => (
              <Card key={c.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                {c.featured_image && (
                  <img
                    src={c.featured_image}
                    alt={c.title}
                    className="w-full h-48 object-cover"
                    loading="lazy"
                  />
                )}
                <CardContent className="p-5 space-y-3">
                  <h3 className="text-lg font-bold text-foreground">{c.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{c.description}</p>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">
                        ₹{Number(c.raised_amount).toLocaleString("en-IN")} raised
                      </span>
                      <span className="font-semibold text-primary">
                        ₹{Number(c.goal_amount).toLocaleString("en-IN")}
                      </span>
                    </div>
                    <Progress value={percent(Number(c.raised_amount), Number(c.goal_amount))} className="h-2" />
                  </div>
                  <Button asChild className="w-full">
                    <Link to={`/campaigns/${c.slug}`}>View & Donate</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
};

export default Campaigns;
