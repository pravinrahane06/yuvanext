import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { initialDonations, Donation } from "@/data/mockData";

const statusColor: Record<string, string> = {
  completed: "bg-green/10 text-green",
  pending: "bg-saffron/10 text-saffron",
  failed: "bg-destructive/10 text-destructive",
};

const ManageDonations = () => {
  const [donations] = useState<Donation[]>(initialDonations);
  const total = donations.reduce((sum, d) => sum + d.amount, 0);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Donations</h2>
            <p className="text-muted-foreground text-sm">{donations.length} donations recorded</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Total Collected</p>
            <p className="text-2xl font-bold text-primary">₹{total.toLocaleString("en-IN")}</p>
          </div>
        </div>

        <Card className="shadow-sm">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Donor Name</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead className="hidden md:table-cell">Date</TableHead>
                  <TableHead className="hidden sm:table-cell">Method</TableHead>
                  <TableHead className="hidden lg:table-cell">Collected By</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {donations.map((d) => (
                  <TableRow key={d.id}>
                    <TableCell className="font-medium text-foreground">{d.donorName}</TableCell>
                    <TableCell className="font-semibold text-primary">₹{d.amount.toLocaleString("en-IN")}</TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground text-sm">{d.date}</TableCell>
                    <TableCell className="hidden sm:table-cell text-sm">{d.method}</TableCell>
                    <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">{d.collectedBy}</TableCell>
                    <TableCell>
                      <span className={`text-xs px-2 py-1 rounded-full ${statusColor[d.status]}`}>
                        {d.status}
                      </span>
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
