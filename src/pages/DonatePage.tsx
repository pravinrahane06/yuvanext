import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import PageHero from "@/components/ui/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface CampaignOption {
  id: string;
  title: string;
}

const DonatePage = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();

  const [campaigns, setCampaigns] = useState<CampaignOption[]>([]);
  const [campaignId, setCampaignId] = useState(params.get("campaign") || "");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"one-time" | "recurring">("one-time");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [tributeName, setTributeName] = useState("");
  const [coverFee, setCoverFee] = useState(false);
  const [pan, setPan] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    supabase
      .from("campaigns")
      .select("id, title")
      .eq("status", "active")
      .then(({ data }) => setCampaigns((data as CampaignOption[]) || []));
  }, []);

  const generateTxnId = () => `TXN${Date.now()}${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const amt = Number(amount);
    if (!amt || amt < 1 || amt > 10000000) {
      toast({ title: "Invalid amount", description: "Enter between ₹1 and ₹1,00,00,000", variant: "destructive" });
      return;
    }
    if (!isAuthenticated || !user) {
      toast({ title: "Please login", description: "You must be logged in to donate.", variant: "destructive" });
      return;
    }

    setSubmitting(true);
    const txnId = generateTxnId();

    const { error } = await supabase.from("donations").insert({
      user_id: user.id,
      campaign_id: campaignId || null,
      amount: amt,
      type,
      is_anonymous: isAnonymous,
      tribute_name: tributeName,
      cover_fee: coverFee,
      pan_number: pan,
      phone,
      payment_status: "completed", // placeholder — real gateway would set this
      transaction_id: txnId,
    });

    setSubmitting(false);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }

    navigate(`/donation-success?txn=${txnId}&campaign=${campaignId}`);
  };

  const presetAmounts = [500, 1000, 2500, 5000, 10000];

  return (
    <Layout>
      <PageHero title="Make a Donation" subtitle="Every contribution makes a difference" />
      <section className="py-12 px-4 max-w-2xl mx-auto">
        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Campaign select */}
              <div className="space-y-2">
                <Label>Select Campaign (optional)</Label>
                <Select value={campaignId} onValueChange={setCampaignId}>
                  <SelectTrigger><SelectValue placeholder="General Donation" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">General Donation</SelectItem>
                    {campaigns.map((c) => (
                      <SelectItem key={c.id} value={c.id}>{c.title}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Amount */}
              <div className="space-y-2">
                <Label>Amount (₹) *</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {presetAmounts.map((a) => (
                    <Button
                      key={a}
                      type="button"
                      variant={amount === String(a) ? "default" : "outline"}
                      size="sm"
                      onClick={() => setAmount(String(a))}
                    >
                      ₹{a.toLocaleString("en-IN")}
                    </Button>
                  ))}
                </div>
                <Input
                  type="number"
                  min={1}
                  max={10000000}
                  placeholder="Enter custom amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>

              {/* Type */}
              <div className="space-y-2">
                <Label>Donation Type</Label>
                <div className="flex gap-3">
                  <Button type="button" variant={type === "one-time" ? "default" : "outline"} size="sm" onClick={() => setType("one-time")}>One-time</Button>
                  <Button type="button" variant={type === "recurring" ? "default" : "outline"} size="sm" onClick={() => setType("recurring")}>Recurring</Button>
                </div>
              </div>

              {/* Anonymous */}
              <div className="flex items-center gap-2">
                <Checkbox id="anon" checked={isAnonymous} onCheckedChange={(v) => setIsAnonymous(!!v)} />
                <Label htmlFor="anon" className="text-sm">Donate anonymously</Label>
              </div>

              {/* Tribute */}
              <div className="space-y-2">
                <Label>In honor/memory of (optional)</Label>
                <Input placeholder="Name of person" value={tributeName} onChange={(e) => setTributeName(e.target.value)} />
              </div>

              {/* Cover fee */}
              <div className="flex items-center gap-2">
                <Checkbox id="fee" checked={coverFee} onCheckedChange={(v) => setCoverFee(!!v)} />
                <Label htmlFor="fee" className="text-sm">Cover payment gateway fee (2.5%)</Label>
              </div>

              {/* PAN & Phone */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>PAN Number (for 80G receipt)</Label>
                  <Input placeholder="ABCDE1234F" value={pan} onChange={(e) => setPan(e.target.value.toUpperCase())} maxLength={10} />
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input placeholder="+91 9876543210" value={phone} onChange={(e) => setPhone(e.target.value)} maxLength={15} />
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={submitting}>
                {submitting ? "Processing..." : `Donate ₹${Number(amount || 0).toLocaleString("en-IN")}`}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                Payment gateway integration placeholder — currently simulates a completed donation.
              </p>
            </form>
          </CardContent>
        </Card>
      </section>
    </Layout>
  );
};

export default DonatePage;
