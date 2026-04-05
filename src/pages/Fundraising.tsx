import { Link } from "react-router-dom";
import { ArrowRight, Loader2, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Layout from "@/components/layout/Layout";
import PageHero from "@/components/ui/PageHero";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

const Fundraising = () => {
  const { data: pages = [], isLoading } = useQuery({
    queryKey: ["fundraising-pages"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("fundraising_pages")
        .select("*")
        .eq("status", "active")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  return (
    <Layout>
      <PageHero title="Peer Fundraising" subtitle="Support personal fundraising campaigns created by our community members" />

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <Button asChild>
              <Link to="/create-fundraiser">Start Your Own Fundraiser <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
          ) : pages.length === 0 ? (
            <div className="text-center py-12">
              <Target className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">No fundraising pages yet. Be the first!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {pages.map((page: any) => {
                const progress = page.goal_amount > 0 ? (Number(page.raised_amount) / Number(page.goal_amount)) * 100 : 0;
                return (
                  <Card key={page.id} className="card-hover">
                    {page.featured_image && (
                      <img src={page.featured_image} alt={page.title} className="w-full h-48 object-cover rounded-t-lg" />
                    )}
                    <CardHeader>
                      <CardTitle className="text-lg">{page.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{page.description}</p>
                      <Progress value={Math.min(progress, 100)} className="mb-2" />
                      <div className="flex justify-between text-sm">
                        <span className="text-primary font-medium">₹{Number(page.raised_amount).toLocaleString("en-IN")}</span>
                        <span className="text-muted-foreground">of ₹{Number(page.goal_amount).toLocaleString("en-IN")}</span>
                      </div>
                      <Button asChild variant="outline" size="sm" className="w-full mt-4">
                        <Link to={`/fundraising/${page.slug}`}>View & Donate</Link>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Fundraising;
