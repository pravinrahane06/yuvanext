import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { initialUsers, initialVolunteerRecords, User, VolunteerRecord } from "@/data/mockData";
import { toast } from "@/hooks/use-toast";
import { UserPlus } from "lucide-react";

const ManageVolunteers = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [records] = useState<VolunteerRecord[]>(initialVolunteerRecords);

  const volunteers = users.filter((u) => u.role === "volunteer");
  const donors = users.filter((u) => u.role === "donor");

  const convertToVolunteer = (userId: string) => {
    setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, role: "volunteer" as const } : u)));
    toast({ title: "Role Updated", description: "User has been converted to Volunteer." });
  };

  const getRecord = (userId: string) => records.find((r) => r.userId === userId);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Volunteers</h2>
          <p className="text-muted-foreground text-sm">{volunteers.length} active volunteers</p>
        </div>

        <Card className="shadow-sm">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">Email</TableHead>
                  <TableHead>Collected</TableHead>
                  <TableHead className="hidden sm:table-cell">Campaigns</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {volunteers.map((v) => {
                  const rec = getRecord(v.id);
                  return (
                    <TableRow key={v.id}>
                      <TableCell className="font-medium text-foreground">{v.name}</TableCell>
                      <TableCell className="hidden md:table-cell text-muted-foreground text-sm">{v.email}</TableCell>
                      <TableCell className="font-semibold text-primary">₹{(rec?.donationsCollected ?? 0).toLocaleString("en-IN")}</TableCell>
                      <TableCell className="hidden sm:table-cell">{rec?.campaignsActive ?? 0}</TableCell>
                      <TableCell>
                        <Badge variant={rec?.status === "active" ? "default" : "secondary"} className="capitalize">
                          {rec?.status ?? "active"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {donors.length > 0 && (
          <>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Convert Donors to Volunteers</h3>
              <p className="text-muted-foreground text-sm">Assign volunteer role to existing donors</p>
            </div>
            <Card className="shadow-sm">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {donors.map((d) => (
                      <TableRow key={d.id}>
                        <TableCell className="font-medium text-foreground">{d.name}</TableCell>
                        <TableCell className="text-muted-foreground text-sm">{d.email}</TableCell>
                        <TableCell className="text-right">
                          <Button size="sm" variant="outline" className="gap-1" onClick={() => convertToVolunteer(d.id)}>
                            <UserPlus className="h-3.5 w-3.5" /> Make Volunteer
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </AdminLayout>
  );
};

export default ManageVolunteers;
