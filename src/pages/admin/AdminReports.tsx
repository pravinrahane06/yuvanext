import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Download, FileDown } from "lucide-react";

const AdminReports = () => {
  const { toast } = useToast();
  const [campaigns, setCampaigns] = useState<{ id: string; title: string }[]>([]);
  const [filterCampaign, setFilterCampaign] = useState("");
  const [filterFrom, setFilterFrom] = useState("");
  const [filterTo, setFilterTo] = useState("");
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    supabase.from("campaigns").select("id, title").then(({ data }) => setCampaigns(data || []));
  }, []);

  const exportCSV = async () => {
    setExporting(true);
    let query = supabase
      .from("donations")
      .select("id, amount, type, is_anonymous, tribute_name, payment_status, transaction_id, created_at, pan_number, phone, campaigns(title), profiles!donations_user_id_fkey(name)")
      .order("created_at", { ascending: false });

    if (filterCampaign) query = query.eq("campaign_id", filterCampaign);
    if (filterFrom) query = query.gte("created_at", filterFrom);
    if (filterTo) query = query.lte("created_at", filterTo + "T23:59:59");

    const { data, error } = await query;
    setExporting(false);

    if (error || !data?.length) {
      toast({ title: data?.length === 0 ? "No data" : "Error", description: error?.message || "No donations match the filters.", variant: "destructive" });
      return;
    }

    const headers = ["Transaction ID", "Donor", "Amount", "Type", "Campaign", "Status", "PAN", "Phone", "Date"];
    const rows = data.map((d: any) => [
      d.transaction_id,
      d.is_anonymous ? "Anonymous" : ((d.profiles as any)?.name || "—"),
      d.amount,
      d.type,
      (d.campaigns as any)?.title || "General",
      d.payment_status,
      d.pan_number || "",
      d.phone || "",
      new Date(d.created_at).toLocaleDateString("en-IN"),
    ]);

    const csv = [headers.join(","), ...rows.map((r: string[]) => r.map((v: string) => `"${v}"`).join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `donations-report-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: "Report downloaded!" });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Reports</h2>
          <p className="text-muted-foreground text-sm">Export donation data as CSV</p>
        </div>

        <Card className="shadow-sm">
          <CardContent className="p-6 space-y-4">
            <h3 className="font-semibold text-foreground flex items-center gap-2"><FileDown className="h-5 w-5" /> Donation Export</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <Label className="text-xs">Campaign</Label>
                <Select value={filterCampaign} onValueChange={setFilterCampaign}>
                  <SelectTrigger><SelectValue placeholder="All campaigns" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All campaigns</SelectItem>
                    {campaigns.map((c) => <SelectItem key={c.id} value={c.id}>{c.title}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label className="text-xs">From Date</Label>
                <Input type="date" value={filterFrom} onChange={(e) => setFilterFrom(e.target.value)} />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">To Date</Label>
                <Input type="date" value={filterTo} onChange={(e) => setFilterTo(e.target.value)} />
              </div>
            </div>
            <Button onClick={exportCSV} disabled={exporting} className="gap-2">
              <Download className="h-4 w-4" /> {exporting ? "Exporting..." : "Export CSV"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminReports;
