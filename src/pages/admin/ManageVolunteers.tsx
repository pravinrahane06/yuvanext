import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";

interface VolunteerRow {
  user_id: string;
  name: string;
  phone: string | null;
  donations_collected: number;
  donation_count: number;
}

const ManageVolunteers = () => {
  const [volunteers, setVolunteers] = useState<VolunteerRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      // Get volunteer user_ids
      const { data: roles } = await supabase.from("user_roles").select("user_id").eq("role", "volunteer");
      if (!roles?.length) { setLoading(false); return; }

      const vIds = roles.map((r: any) => r.user_id);

      const { data: profiles } = await supabase.from("profiles").select("user_id, name, phone").in("user_id", vIds);
      
      // Get donations made by volunteers (donations they collected — their own user_id)
      const { data: donations } = await supabase
        .from("donations")
        .select("user_id, amount")
        .in("user_id", vIds)
        .eq("payment_status", "completed");

      const donMap: Record<string, { total: number; count: number }> = {};
      (donations || []).forEach((d: any) => {
        if (!donMap[d.user_id]) donMap[d.user_id] = { total: 0, count: 0 };
        donMap[d.user_id].total += Number(d.amount);
        donMap[d.user_id].count += 1;
      });

      const combined = (profiles || []).map((p: any) => ({
        user_id: p.user_id,
        name: p.name || "—",
        phone: p.phone,
        donations_collected: donMap[p.user_id]?.total || 0,
        donation_count: donMap[p.user_id]?.count || 0,
      }));

      setVolunteers(combined);
      setLoading(false);
    };
    fetch();
  }, []);

  const totalCollected = volunteers.reduce((s, v) => s + v.donations_collected, 0);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Volunteer Tracking</h2>
            <p className="text-muted-foreground text-sm">{volunteers.length} volunteers</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Total Collected</p>
            <p className="text-2xl font-bold text-primary">₹{totalCollected.toLocaleString("en-IN")}</p>
          </div>
        </div>

        <Card className="shadow-sm">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden sm:table-cell">Phone</TableHead>
                  <TableHead>Collected</TableHead>
                  <TableHead className="hidden md:table-cell"># Donations</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow><TableCell colSpan={5} className="text-center py-8 text-muted-foreground">Loading...</TableCell></TableRow>
                ) : volunteers.length === 0 ? (
                  <TableRow><TableCell colSpan={5} className="text-center py-8 text-muted-foreground">No volunteers found</TableCell></TableRow>
                ) : volunteers.map((v) => (
                  <TableRow key={v.user_id}>
                    <TableCell className="font-medium text-foreground">{v.name}</TableCell>
                    <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">{v.phone || "—"}</TableCell>
                    <TableCell className="font-semibold text-primary">₹{v.donations_collected.toLocaleString("en-IN")}</TableCell>
                    <TableCell className="hidden md:table-cell">{v.donation_count}</TableCell>
                    <TableCell>
                      <Badge variant="default" className="capitalize">Active</Badge>
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

export default ManageVolunteers;
