import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import {
  Heart, TrendingUp, Plus, LogOut, Users, Link2, Copy,
  Loader2, DollarSign, Target,
} from "lucide-react";

const VolunteerDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [donorName, setDonorName] = useState("");
  const [donorPhone, setDonorPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [campaignId, setCampaignId] = useState("");
  const [saving, setSaving] = useState(false);

  // Fetch donations where this volunteer's user_id matches (they created the entry)
  const { data: collectedDonations = [], isLoading } = useQuery({
    queryKey: ["volunteer-donations", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("donations")
        .select("*, campaigns(title)")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const { data: campaigns = [] } = useQuery({
    queryKey: ["active-campaigns"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("campaigns")
        .select("id, title")
        .eq("status", "active");
      if (error) throw error;
      return data;
    },
  });

  if (!user) return null;

  const handleLogout = async () => { await logout(); navigate("/"); };

  const completedDonations = collectedDonations.filter((d) => d.payment_status === "completed");
  const totalCollected = completedDonations.reduce((s, d) => s + Number(d.amount), 0);
  const uniqueDonors = new Set(collectedDonations.filter((d) => d.tribute_name).map((d) => d.tribute_name)).size;

  const fundraisingLink = `${window.location.origin}/donate-now?ref=${user.id.slice(0, 8)}`;

  const copyLink = () => {
    navigator.clipboard.writeText(fundraisingLink);
    toast({ title: "Link Copied!", description: "Share this link to collect donations." });
  };

  const handleAddDonation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0) {
      toast({ title: "Error", description: "Enter a valid amount", variant: "destructive" });
      return;
    }
    setSaving(true);
    const txnId = `VOL-${Date.now()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
    const { error } = await supabase.from("donations").insert({
      user_id: user.id,
      amount: Number(amount),
      campaign_id: campaignId || null,
      type: "one-time" as const,
      is_anonymous: false,
      tribute_name: donorName || null,
      phone: donorPhone || null,
      payment_status: "completed",
      transaction_id: txnId,
      cover_fee: false,
    });
    setSaving(false);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }
    queryClient.invalidateQueries({ queryKey: ["volunteer-donations"] });
    setDonorName(""); setDonorPhone(""); setAmount(""); setCampaignId("");
    setShowForm(false);
    toast({ title: "Donation Recorded", description: `₹${Number(amount).toLocaleString("en-IN")} from ${donorName || "donor"} added.` });
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto py-10 px-4 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Volunteer Dashboard</h1>
            <p className="text-muted-foreground text-sm">Welcome, {user.name}</p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="gap-2" size="sm">
            <LogOut className="h-4 w-4" /> Logout
          </Button>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="shadow-sm">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Collected</p>
                <p className="text-xl font-bold text-foreground">₹{totalCollected.toLocaleString("en-IN")}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-sm">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <Heart className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Donations</p>
                <p className="text-xl font-bold text-foreground">{collectedDonations.length}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-sm">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Unique Donors</p>
                <p className="text-xl font-bold text-foreground">{uniqueDonors}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-sm">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <Target className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Campaigns</p>
                <p className="text-xl font-bold text-foreground">{campaigns.length}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Personal Fundraising Link */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Link2 className="h-5 w-5" /> Your Fundraising Link
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-3">
              <Input value={fundraisingLink} readOnly className="flex-1 text-sm text-muted-foreground" />
              <Button onClick={copyLink} className="gap-2" size="sm">
                <Copy className="h-4 w-4" /> Copy Link
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Share this link with potential donors. All donations through this link will be tracked to your profile.
            </p>
          </CardContent>
        </Card>

        {/* Donations Collected */}
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Donations Collected</CardTitle>
            <Button size="sm" className="gap-1" onClick={() => setShowForm(!showForm)}>
              <Plus className="h-4 w-4" /> Add Entry
            </Button>
          </CardHeader>

          {showForm && (
            <CardContent className="pt-0 pb-4 border-b border-border">
              <form onSubmit={handleAddDonation} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-end">
                <div className="space-y-1">
                  <Label htmlFor="dname" className="text-xs">Donor Name</Label>
                  <Input id="dname" value={donorName} onChange={(e) => setDonorName(e.target.value)} placeholder="Donor name" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="dphone" className="text-xs">Phone</Label>
                  <Input id="dphone" value={donorPhone} onChange={(e) => setDonorPhone(e.target.value)} placeholder="Phone number" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="damount" className="text-xs">Amount (₹)</Label>
                  <Input id="damount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" required min={1} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="dcampaign" className="text-xs">Campaign</Label>
                  <select
                    id="dcampaign"
                    value={campaignId}
                    onChange={(e) => setCampaignId(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-sm bg-background"
                  >
                    <option value="">General</option>
                    {campaigns.map((c) => (
                      <option key={c.id} value={c.id}>{c.title}</option>
                    ))}
                  </select>
                </div>
                <Button type="submit" size="sm" disabled={saving}>
                  {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}
                </Button>
              </form>
            </CardContent>
          )}

          <CardContent className="p-0">
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : collectedDonations.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No donations collected yet. Start by adding an entry!</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Donor</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead className="hidden md:table-cell">Campaign</TableHead>
                    <TableHead className="hidden sm:table-cell">Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {collectedDonations.map((d) => (
                    <TableRow key={d.id}>
                      <TableCell className="font-medium text-foreground">
                        {d.tribute_name || (d.is_anonymous ? "Anonymous" : "—")}
                        {d.phone && <span className="block text-xs text-muted-foreground">{d.phone}</span>}
                      </TableCell>
                      <TableCell className="font-semibold text-primary">₹{Number(d.amount).toLocaleString("en-IN")}</TableCell>
                      <TableCell className="hidden md:table-cell text-sm">
                        {(d as any).campaigns?.title || "General"}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-muted-foreground text-sm">
                        {new Date(d.created_at).toLocaleDateString("en-IN")}
                      </TableCell>
                      <TableCell>
                        <Badge variant={d.payment_status === "completed" ? "default" : "secondary"}>
                          {d.payment_status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default VolunteerDashboard;
