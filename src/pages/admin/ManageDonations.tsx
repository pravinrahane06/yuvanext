import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, Filter, X } from "lucide-react";

interface Donation {
  id: string;
  amount: number;
  type: string;
  is_anonymous: boolean;
  tribute_name: string;
  payment_status: string;
  transaction_id: string;
  created_at: string;
  campaign_id: string | null;
  user_id: string | null;
  campaigns: { title: string } | null;
  profiles: { name: string } | null;
}

const ManageDonations = () => {
  const { toast } = useToast();
  const [donations, setDonations] = useState<Donation[]>([]);
  const [campaigns, setCampaigns] = useState<{ id: string; title: string }[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [filterCampaign, setFilterCampaign] = useState("");
  const [filterDateFrom, setFilterDateFrom] = useState("");
  const [filterDateTo, setFilterDateTo] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const fetchDonations = async () => {
    let query = supabase
      .from("donations")
      .select("*, campaigns(title), profiles!donations_user_id_fkey(name)")
      .order("created_at", { ascending: false });

    if (filterCampaign) query = query.eq("campaign_id", filterCampaign);
    if (filterStatus) query = query.eq("payment_status", filterStatus);
    if (filterDateFrom) query = query.gte("created_at", filterDateFrom);
    if (filterDateTo) query = query.lte("created_at", filterDateTo + "T23:59:59");

    const { data } = await query;
    setDonations((data as any) || []);
    setLoading(false);
  };

  useEffect(() => {
    supabase.from("campaigns").select("id, title").then(({ data }) => setCampaigns(data || []));
    fetchDonations();
  }, []);

  useEffect(() => { fetchDonations(); }, [filterCampaign, filterDateFrom, filterDateTo, filterStatus]);

  const clearFilters = () => {
    setFilterCampaign("");
    setFilterDateFrom("");
    setFilterDateTo("");
    setFilterStatus("");
  };

  const markApproved = async (id: string) => {
    const { error } = await supabase
      .from("donations")
      .update({ payment_status: "completed" } as any)
      .eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Donation approved" });
    fetchDonations();
  };

  const total = donations.reduce((sum, d) => sum + Number(d.amount), 0);
  const hasFilters = filterCampaign || filterDateFrom || filterDateTo || filterStatus;

  const statusColors: Record<string, string> = {
    completed: "bg-accent/10 text-accent",
    pending: "bg-primary/10 text-primary",
    failed: "bg-destructive/10 text-destructive",
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Donations</h2>
            <p className="text-muted-foreground text-sm">{donations.length} donations</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Total</p>
            <p className="text-2xl font-bold text-primary">₹{total.toLocaleString("en-IN")}</p>
          </div>
        </div>

        {/* Filters */}
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Filters</span>
              {hasFilters && (
                <Button variant="ghost" size="sm" onClick={clearFilters} className="ml-auto gap-1 text-xs">
                  <X className="h-3 w-3" /> Clear
                </Button>
              )}
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="space-y-1">
                <Label className="text-xs">Campaign</Label>
                <Select value={filterCampaign} onValueChange={setFilterCampaign}>
                  <SelectTrigger><SelectValue placeholder="All campaigns" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All campaigns</SelectItem>
                    {campaigns.map((c) => (
                      <SelectItem key={c.id} value={c.id}>{c.title}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Status</Label>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger><SelectValue placeholder="All statuses" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label className="text-xs">From Date</Label>
                <Input type="date" value={filterDateFrom} onChange={(e) => setFilterDateFrom(e.target.value)} />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">To Date</Label>
                <Input type="date" value={filterDateTo} onChange={(e) => setFilterDateTo(e.target.value)} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Donor</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead className="hidden md:table-cell">Campaign</TableHead>
                  <TableHead className="hidden sm:table-cell">Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden lg:table-cell">Txn ID</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow><TableCell colSpan={7} className="text-center py-8 text-muted-foreground">Loading...</TableCell></TableRow>
                ) : donations.length === 0 ? (
                  <TableRow><TableCell colSpan={7} className="text-center py-8 text-muted-foreground">No donations found</TableCell></TableRow>
                ) : donations.map((d) => (
                  <TableRow key={d.id}>
                    <TableCell className="font-medium text-foreground">
                      {d.is_anonymous ? "Anonymous" : (d.profiles as any)?.name || "—"}
                    </TableCell>
                    <TableCell className="font-semibold text-primary">₹{Number(d.amount).toLocaleString("en-IN")}</TableCell>
                    <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                      {(d.campaigns as any)?.title || "General"}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">
                      {new Date(d.created_at).toLocaleDateString("en-IN")}
                    </TableCell>
                    <TableCell>
                      <span className={`text-xs px-2 py-1 rounded-full ${statusColors[d.payment_status] || "bg-muted text-muted-foreground"}`}>
                        {d.payment_status}
                      </span>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-xs font-mono text-muted-foreground">
                      {d.transaction_id?.slice(0, 12)}…
                    </TableCell>
                    <TableCell>
                      {d.payment_status === "pending" && (
                        <Button size="sm" variant="outline" className="gap-1" onClick={() => markApproved(d.id)}>
                          <CheckCircle className="h-3.5 w-3.5" /> Approve
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default ManageDonations;
