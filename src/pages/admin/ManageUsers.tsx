import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { UserPlus } from "lucide-react";

interface UserRow {
  user_id: string;
  name: string;
  phone: string | null;
  role: string;
  donation_total?: number;
}

const ManageUsers = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    // Get profiles + roles
    const { data: profiles } = await supabase.from("profiles").select("user_id, name, phone");
    const { data: roles } = await supabase.from("user_roles").select("user_id, role");
    const { data: donations } = await supabase.from("donations").select("user_id, amount").eq("payment_status", "completed");

    const roleMap: Record<string, string> = {};
    (roles || []).forEach((r: any) => { roleMap[r.user_id] = r.role; });

    const donationMap: Record<string, number> = {};
    (donations || []).forEach((d: any) => {
      if (d.user_id) donationMap[d.user_id] = (donationMap[d.user_id] || 0) + Number(d.amount);
    });

    const combined = (profiles || []).map((p: any) => ({
      user_id: p.user_id,
      name: p.name || "—",
      phone: p.phone,
      role: roleMap[p.user_id] || "donor",
      donation_total: donationMap[p.user_id] || 0,
    }));

    setUsers(combined);
    setLoading(false);
  };

  useEffect(() => { fetchUsers(); }, []);

  const assignVolunteer = async (userId: string) => {
    const { error } = await supabase
      .from("user_roles")
      .update({ role: "volunteer" } as any)
      .eq("user_id", userId);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Role updated to Volunteer" });
    fetchUsers();
  };

  const donors = users.filter((u) => u.role === "donor");
  const volunteers = users.filter((u) => u.role === "volunteer");
  const admins = users.filter((u) => u.role === "admin");

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Users</h2>
          <p className="text-muted-foreground text-sm">{users.length} registered users</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="shadow-sm"><CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-foreground">{admins.length}</p>
            <p className="text-xs text-muted-foreground">Admins</p>
          </CardContent></Card>
          <Card className="shadow-sm"><CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-foreground">{donors.length}</p>
            <p className="text-xs text-muted-foreground">Donors</p>
          </CardContent></Card>
          <Card className="shadow-sm"><CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-foreground">{volunteers.length}</p>
            <p className="text-xs text-muted-foreground">Volunteers</p>
          </CardContent></Card>
        </div>

        <Card className="shadow-sm">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden sm:table-cell">Phone</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="text-right">Donations</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow><TableCell colSpan={5} className="text-center py-8 text-muted-foreground">Loading...</TableCell></TableRow>
                ) : users.map((u) => (
                  <TableRow key={u.user_id}>
                    <TableCell className="font-medium text-foreground">{u.name}</TableCell>
                    <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">{u.phone || "—"}</TableCell>
                    <TableCell>
                      <Badge variant={u.role === "admin" ? "destructive" : u.role === "volunteer" ? "default" : "secondary"} className="capitalize">
                        {u.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-semibold text-primary">₹{(u.donation_total || 0).toLocaleString("en-IN")}</TableCell>
                    <TableCell>
                      {u.role === "donor" && (
                        <Button size="sm" variant="outline" className="gap-1" onClick={() => assignVolunteer(u.user_id)}>
                          <UserPlus className="h-3.5 w-3.5" /> Make Volunteer
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

export default ManageUsers;
