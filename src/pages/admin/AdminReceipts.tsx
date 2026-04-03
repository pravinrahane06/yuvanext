import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Download, Receipt } from "lucide-react";

interface DonationRow {
  id: string;
  amount: number;
  transaction_id: string;
  created_at: string;
  payment_status: string;
  pan_number: string;
  profiles: { name: string } | null;
  campaigns: { title: string } | null;
}

const AdminReceipts = () => {
  const { toast } = useToast();
  const [donations, setDonations] = useState<DonationRow[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("donations")
      .select("id, amount, transaction_id, created_at, payment_status, pan_number, campaigns(title), profiles!donations_user_id_fkey(name)")
      .eq("payment_status", "completed")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setDonations((data as any) || []);
        setLoading(false);
      });
  }, []);

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const selectAll = () => {
    if (selected.size === donations.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(donations.map((d) => d.id)));
    }
  };

  const downloadReceipts = () => {
    if (selected.size === 0) {
      toast({ title: "No receipts selected", variant: "destructive" });
      return;
    }
    // Placeholder — generate and download receipts
    const receiptData = donations.filter((d) => selected.has(d.id));
    const text = receiptData.map((d) =>
      `RECEIPT\n--------\nTransaction: ${d.transaction_id}\nDonor: ${(d.profiles as any)?.name || "Anonymous"}\nAmount: ₹${Number(d.amount).toLocaleString("en-IN")}\nCampaign: ${(d.campaigns as any)?.title || "General"}\nDate: ${new Date(d.created_at).toLocaleDateString("en-IN")}\nPAN: ${d.pan_number || "N/A"}\n\n`
    ).join("=".repeat(40) + "\n\n");

    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `receipts-${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: `${selected.size} receipt(s) downloaded` });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Receipt Management</h2>
            <p className="text-muted-foreground text-sm">Download donation receipts in bulk</p>
          </div>
          <Button onClick={downloadReceipts} disabled={selected.size === 0} className="gap-2">
            <Download className="h-4 w-4" /> Download {selected.size > 0 ? `(${selected.size})` : ""} Receipts
          </Button>
        </div>

        <Card className="shadow-sm">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10">
                    <Checkbox checked={selected.size === donations.length && donations.length > 0} onCheckedChange={selectAll} />
                  </TableHead>
                  <TableHead>Donor</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead className="hidden md:table-cell">Campaign</TableHead>
                  <TableHead className="hidden sm:table-cell">Date</TableHead>
                  <TableHead className="hidden lg:table-cell">Txn ID</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">Loading...</TableCell></TableRow>
                ) : donations.length === 0 ? (
                  <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">No completed donations</TableCell></TableRow>
                ) : donations.map((d) => (
                  <TableRow key={d.id} className={selected.has(d.id) ? "bg-primary/5" : ""}>
                    <TableCell>
                      <Checkbox checked={selected.has(d.id)} onCheckedChange={() => toggleSelect(d.id)} />
                    </TableCell>
                    <TableCell className="font-medium text-foreground">{(d.profiles as any)?.name || "Anonymous"}</TableCell>
                    <TableCell className="font-semibold text-primary">₹{Number(d.amount).toLocaleString("en-IN")}</TableCell>
                    <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{(d.campaigns as any)?.title || "General"}</TableCell>
                    <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">{new Date(d.created_at).toLocaleDateString("en-IN")}</TableCell>
                    <TableCell className="hidden lg:table-cell text-xs font-mono text-muted-foreground">{d.transaction_id?.slice(0, 12)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <p className="text-xs text-muted-foreground flex items-center gap-1">
          <Receipt className="h-3.5 w-3.5" /> PDF receipt generation can be added with a document library. Currently exports as text.
        </p>
      </div>
    </AdminLayout>
  );
};

export default AdminReceipts;
