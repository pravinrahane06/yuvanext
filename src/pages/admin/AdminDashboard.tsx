import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { FileText, Users, Heart, DollarSign, Target } from "lucide-react";
import { initialActivities } from "@/data/mockData";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalDonations: 0,
    donationCount: 0,
    totalCampaigns: 0,
    totalUsers: 0,
    totalVolunteers: 0,
  });
  const [recentDonations, setRecentDonations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const [campaignsRes, donationsRes, usersRes, volunteersRes, recentRes] = await Promise.all([
        supabase.from("campaigns").select("id", { count: "exact", head: true }),
        supabase.from("donations").select("amount"),
        supabase.from("profiles").select("id", { count: "exact", head: true }),
        supabase.from("user_roles").select("id", { count: "exact", head: true }).eq("role", "volunteer"),
        supabase.from("donations").select("*, campaigns(title)").order("created_at", { ascending: false }).limit(5),
      ]);

      const totalDonations = (donationsRes.data || []).reduce((sum: number, d: any) => sum + Number(d.amount), 0);

      setStats({
        totalDonations,
        donationCount: donationsRes.data?.length || 0,
        totalCampaigns: campaignsRes.count || 0,
        totalUsers: usersRes.count || 0,
        totalVolunteers: volunteersRes.count || 0,
      });
      setRecentDonations(recentRes.data || []);
      setLoading(false);
    };
    fetchStats();
  }, []);

  const cards = [
    { label: "Total Donations", value: `₹${stats.totalDonations.toLocaleString("en-IN")}`, sub: `${stats.donationCount} donations`, icon: DollarSign, color: "bg-accent/10 text-accent", link: "/admin-donations" },
    { label: "Campaigns", value: stats.totalCampaigns, icon: Target, color: "bg-primary/10 text-primary", link: "/admin-campaigns" },
    { label: "Users", value: stats.totalUsers, icon: Users, color: "bg-secondary text-secondary-foreground", link: "/admin-users" },
    { label: "Volunteers", value: stats.totalVolunteers, icon: Heart, color: "bg-destructive/10 text-destructive", link: "/admin-volunteers" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Dashboard</h2>
          <p className="text-muted-foreground text-sm">Welcome back, Admin</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((s) => (
            <Link key={s.label} to={s.link}>
              <Card className="shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-5 flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${s.color}`}>
                    <s.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{s.label}</p>
                    <p className="text-2xl font-bold text-foreground">{loading ? "…" : s.value}</p>
                    {s.sub && <p className="text-xs text-muted-foreground">{s.sub}</p>}
                  </div>
                </CardContent>
              </Card>
            </Link>
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
                  <span className={`text-xs px-2 py-1 rounded-full ${a.status === "published" ? "bg-accent/10 text-accent" : "bg-muted text-muted-foreground"}`}>
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
              {loading ? (
                <p className="text-sm text-muted-foreground">Loading...</p>
              ) : recentDonations.length === 0 ? (
                <p className="text-sm text-muted-foreground">No donations yet</p>
              ) : (
                recentDonations.map((d: any) => (
                  <div key={d.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {d.is_anonymous ? "Anonymous" : d.transaction_id}
                      </p>
                      <p className="text-xs text-muted-foreground">{d.campaigns?.title || "General"}</p>
                    </div>
                    <span className="text-sm font-semibold text-primary">₹{Number(d.amount).toLocaleString("en-IN")}</span>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
