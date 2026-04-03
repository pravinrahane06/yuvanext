import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock, Target, Calendar } from "lucide-react";

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

function useCountdown(endDate: string | null) {
  const [timeLeft, setTimeLeft] = useState("");
  useEffect(() => {
    if (!endDate) { setTimeLeft(""); return; }
    const tick = () => {
      const diff = new Date(endDate).getTime() - Date.now();
      if (diff <= 0) { setTimeLeft("Campaign ended"); return; }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      setTimeLeft(`${d}d ${h}h ${m}m remaining`);
    };
    tick();
    const id = setInterval(tick, 60000);
    return () => clearInterval(id);
  }, [endDate]);
  return timeLeft;
}

const CampaignDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    supabase
      .from("campaigns")
      .select("*")
      .eq("slug", slug)
      .maybeSingle()
      .then(({ data }) => {
        setCampaign(data as Campaign | null);
        setLoading(false);
      });
  }, [slug]);

  const countdown = useCountdown(campaign?.end_date ?? null);
  const pct = campaign && Number(campaign.goal_amount) > 0
    ? Math.min(Math.round((Number(campaign.raised_amount) / Number(campaign.goal_amount)) * 100), 100)
    : 0;

  if (loading) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto py-20 px-4 space-y-4">
          <Skeleton className="h-64 rounded-lg" />
          <Skeleton className="h-8 w-2/3" />
          <Skeleton className="h-4 w-full" />
        </div>
      </Layout>
    );
  }

  if (!campaign) {
    return (
      <Layout>
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold text-foreground">Campaign not found</h2>
          <Button asChild className="mt-4"><Link to="/campaigns">Back to Campaigns</Link></Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-12 px-4 space-y-8">
        {campaign.featured_image && (
          <img src={campaign.featured_image} alt={campaign.title} className="w-full h-72 object-cover rounded-lg" />
        )}

        <h1 className="text-3xl font-bold text-foreground">{campaign.title}</h1>

        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> Started {campaign.start_date}</span>
          {countdown && <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {countdown}</span>}
        </div>

        <div className="bg-card border rounded-lg p-6 space-y-3">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-sm text-muted-foreground">Raised</p>
              <p className="text-2xl font-bold text-primary">₹{Number(campaign.raised_amount).toLocaleString("en-IN")}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground flex items-center gap-1 justify-end"><Target className="h-4 w-4" /> Goal</p>
              <p className="text-2xl font-bold text-foreground">₹{Number(campaign.goal_amount).toLocaleString("en-IN")}</p>
            </div>
          </div>
          <Progress value={pct} className="h-3" />
          <p className="text-sm text-muted-foreground text-center">{pct}% funded</p>
        </div>

        <div className="prose max-w-none text-foreground">
          <p>{campaign.description}</p>
        </div>

        <Button asChild size="lg" className="w-full sm:w-auto">
          <Link to={`/donate?campaign=${campaign.id}`}>Donate Now</Link>
        </Button>
      </div>
    </Layout>
  );
};

export default CampaignDetail;
