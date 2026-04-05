import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/layout/Layout";
import PageHero from "@/components/ui/PageHero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const CreateFundraiser = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", goal_amount: "", featured_image: "" });

  const generateSlug = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { toast({ title: "Please login first", variant: "destructive" }); return; }
    if (!form.title || !form.goal_amount) { toast({ title: "Title and goal amount are required", variant: "destructive" }); return; }

    setLoading(true);
    const slug = generateSlug(form.title) + "-" + Date.now().toString(36);
    const { error } = await supabase.from("fundraising_pages").insert({
      user_id: user.id,
      title: form.title,
      slug,
      description: form.description,
      goal_amount: Number(form.goal_amount),
      featured_image: form.featured_image,
    });
    setLoading(false);

    if (error) {
      toast({ title: "Error creating fundraiser", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Fundraiser created!" });
      navigate("/fundraising");
    }
  };

  if (!user) {
    return (
      <Layout>
        <PageHero title="Create Fundraiser" subtitle="Login to create your personal fundraising page" />
        <div className="py-20 text-center">
          <p className="text-muted-foreground">Please <a href="/login" className="text-primary underline">login</a> to create a fundraiser.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageHero title="Create Your Fundraiser" subtitle="Start a personal fundraising campaign for a cause you care about" />
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card>
            <CardHeader><CardTitle>Fundraiser Details</CardTitle></CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div><Label htmlFor="title">Title *</Label><Input id="title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="My Fundraising Campaign" /></div>
                <div><Label htmlFor="description">Description</Label><Textarea id="description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Tell your story..." rows={4} /></div>
                <div><Label htmlFor="goal">Goal Amount (₹) *</Label><Input id="goal" type="number" value={form.goal_amount} onChange={(e) => setForm({ ...form, goal_amount: e.target.value })} placeholder="10000" /></div>
                <div><Label htmlFor="image">Featured Image URL</Label><Input id="image" value={form.featured_image} onChange={(e) => setForm({ ...form, featured_image: e.target.value })} placeholder="https://..." /></div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />} Create Fundraiser
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
};

export default CreateFundraiser;
