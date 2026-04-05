import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Loader2, Share2, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Layout from "@/components/layout/Layout";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";

const FundraiserDetail = () => {
  const { slug } = useParams();

  const { data: page, isLoading } = useQuery({
    queryKey: ["fundraiser", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("fundraising_pages")
        .select("*")
        .eq("slug", slug)
        .eq("status", "active")
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({ title: "Link copied!" });
  };

  if (isLoading) return <Layout><div className="flex justify-center py-32"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div></Layout>;
  if (!page) return <Layout><div className="py-32 text-center"><Target className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" /><p className="text-muted-foreground">Fundraiser not found.</p></div></Layout>;

  const progress = page.goal_amount > 0 ? (Number(page.raised_amount) / Number(page.goal_amount)) * 100 : 0;

  return (
    <Layout>
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <Button asChild variant="ghost" size="sm" className="mb-6"><Link to="/fundraising"><ArrowLeft className="w-4 h-4 mr-2" /> Back</Link></Button>

          {page.featured_image && <img src={page.featured_image} alt={page.title} className="w-full h-64 object-cover rounded-2xl mb-8" />}

          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{page.title}</h1>

          <Card className="mb-8">
            <CardContent className="pt-6">
              <Progress value={Math.min(progress, 100)} className="mb-3 h-3" />
              <div className="flex justify-between text-lg">
                <span className="text-primary font-bold">₹{Number(page.raised_amount).toLocaleString("en-IN")}</span>
                <span className="text-muted-foreground">raised of ₹{Number(page.goal_amount).toLocaleString("en-IN")}</span>
              </div>
            </CardContent>
          </Card>

          <div className="prose prose-lg max-w-none text-muted-foreground mb-8">
            <p>{page.description}</p>
          </div>

          <div className="flex gap-3">
            <Button asChild size="lg" className="flex-1"><Link to={`/donate-now?fundraiser=${page.id}`}>Donate Now</Link></Button>
            <Button variant="outline" size="lg" onClick={copyLink}><Share2 className="w-4 h-4 mr-2" /> Share</Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default FundraiserDetail;
