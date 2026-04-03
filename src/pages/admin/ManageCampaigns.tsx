import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, X } from "lucide-react";

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

function generateSlug(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const ManageCampaigns = () => {
  const { toast } = useToast();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [goalAmount, setGoalAmount] = useState("");
  const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 10));
  const [endDate, setEndDate] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchCampaigns = async () => {
    const { data } = await supabase.from("campaigns").select("*").order("created_at", { ascending: false });
    setCampaigns((data as Campaign[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetchCampaigns(); }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !goalAmount) return;
    setSubmitting(true);
    const slug = generateSlug(title);
    const { error } = await supabase.from("campaigns").insert({
      title: title.trim(),
      slug,
      description: description.trim(),
      goal_amount: Number(goalAmount),
      start_date: startDate,
      end_date: endDate || null,
      featured_image: featuredImage,
      status: "active",
    });
    setSubmitting(false);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Campaign created!" });
    setTitle(""); setDescription(""); setGoalAmount(""); setEndDate(""); setFeaturedImage("");
    setShowForm(false);
    fetchCampaigns();
  };

  const handleDelete = async (id: string) => {
    await supabase.from("campaigns").delete().eq("id", id);
    fetchCampaigns();
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-foreground">Campaigns</h2>
          <Button onClick={() => setShowForm(!showForm)}>
            {showForm ? <><X className="h-4 w-4 mr-1" /> Cancel</> : <><Plus className="h-4 w-4 mr-1" /> New Campaign</>}
          </Button>
        </div>

        {showForm && (
          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleCreate} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Title *</Label>
                    <Input value={title} onChange={(e) => setTitle(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label>Slug</Label>
                    <Input value={generateSlug(title)} disabled />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Goal Amount (₹) *</Label>
                    <Input type="number" min={1} value={goalAmount} onChange={(e) => setGoalAmount(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Featured Image URL</Label>
                  <Input placeholder="https://..." value={featuredImage} onChange={(e) => setFeaturedImage(e.target.value)} />
                </div>
                <Button type="submit" disabled={submitting}>{submitting ? "Creating..." : "Create Campaign"}</Button>
              </form>
            </CardContent>
          </Card>
        )}

        <Card className="shadow-sm">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Goal</TableHead>
                  <TableHead>Raised</TableHead>
                  <TableHead className="hidden md:table-cell">Progress</TableHead>
                  <TableHead className="hidden sm:table-cell">Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">Loading...</TableCell></TableRow>
                ) : campaigns.length === 0 ? (
                  <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">No campaigns yet</TableCell></TableRow>
                ) : campaigns.map((c) => {
                  const pct = Number(c.goal_amount) > 0 ? Math.round((Number(c.raised_amount) / Number(c.goal_amount)) * 100) : 0;
                  return (
                    <TableRow key={c.id}>
                      <TableCell className="font-medium text-foreground">{c.title}</TableCell>
                      <TableCell>₹{Number(c.goal_amount).toLocaleString("en-IN")}</TableCell>
                      <TableCell className="text-primary font-semibold">₹{Number(c.raised_amount).toLocaleString("en-IN")}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex items-center gap-2">
                          <Progress value={pct} className="h-2 w-24" />
                          <span className="text-xs text-muted-foreground">{pct}%</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <span className={`text-xs px-2 py-1 rounded-full ${c.status === "active" ? "bg-accent/10 text-accent" : "bg-muted text-muted-foreground"}`}>
                          {c.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(c.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default ManageCampaigns;
