import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { initialActivities, initialUsers, initialDonations } from "@/data/mockData";
import { FileText, Users, Heart, DollarSign } from "lucide-react";

const stats = [
  {
    label: "Total Activities",
    value: initialActivities.length,
    icon: FileText,
    color: "bg-primary/10 text-primary",
  },
  {
    label: "Total Users",
    value: initialUsers.length,
    icon: Users,
    color: "bg-accent/10 text-accent",
  },
  {
    label: "Total Volunteers",
    value: initialUsers.filter((u) => u.role === "volunteer").length,
    icon: Heart,
    color: "bg-saffron/10 text-saffron",
  },
  {
    label: "Total Donations",
    value: `₹${initialDonations.reduce((sum, d) => sum + d.amount, 0).toLocaleString("en-IN")}`,
    icon: DollarSign,
    color: "bg-green/10 text-green",
  },
];

const AdminDashboard = () => (
  <AdminLayout>
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Dashboard</h2>
        <p className="text-muted-foreground text-sm">Welcome back, Admin</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label} className="shadow-sm">
            <CardContent className="p-5 flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${s.color}`}>
                <s.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{s.label}</p>
                <p className="text-2xl font-bold text-foreground">{s.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Recent Activities</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {initialActivities.slice(0, 3).map((a) => (
              <div key={a.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <p className="text-sm font-medium text-foreground">{a.title}</p>
                  <p className="text-xs text-muted-foreground">{a.createdAt}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${a.status === "published" ? "bg-green/10 text-green" : "bg-muted text-muted-foreground"}`}>
                  {a.status}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Recent Donations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {initialDonations.slice(0, 4).map((d) => (
              <div key={d.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <p className="text-sm font-medium text-foreground">{d.donorName}</p>
                  <p className="text-xs text-muted-foreground">{d.date}</p>
                </div>
                <span className="text-sm font-semibold text-primary">₹{d.amount.toLocaleString("en-IN")}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  </AdminLayout>
);

export default AdminDashboard;
