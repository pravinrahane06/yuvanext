import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import {
  DollarSign, Calendar, TrendingUp, LogOut, User, Receipt,
  RefreshCw, Download, FileText, Loader2, BarChart3,
} from "lucide-react";

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const { data: donations = [], isLoading } = useQuery({
    queryKey: ["user-donations", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("donations")
        .select("*, campaigns(title)")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  if (!user) return null;

  const handleLogout = async () => { await logout(); navigate("/"); };

  const completedDonations = donations.filter((d) => d.payment_status === "completed");
  const totalDonated = completedDonations.reduce((s, d) => s + Number(d.amount), 0);
  const recurringDonations = donations.filter((d) => d.type === "recurring");
  const lastDonation = donations[0];

  // Annual summary
  const yearDonations = completedDonations.filter(
    (d) => new Date(d.created_at).getFullYear() === selectedYear
  );
  const yearTotal = yearDonations.reduce((s, d) => s + Number(d.amount), 0);
  const yearsByDonation = [...new Set(completedDonations.map((d) => new Date(d.created_at).getFullYear()))].sort((a, b) => b - a);
  if (yearsByDonation.length === 0) yearsByDonation.push(new Date().getFullYear());

  // Monthly breakdown for selected year
  const monthlyData = Array.from({ length: 12 }, (_, i) => {
    const monthDonations = yearDonations.filter((d) => new Date(d.created_at).getMonth() === i);
    return {
      month: new Date(selectedYear, i).toLocaleString("en-IN", { month: "short" }),
      total: monthDonations.reduce((s, d) => s + Number(d.amount), 0),
      count: monthDonations.length,
    };
  });

  const downloadReceipt = (donation: typeof donations[0]) => {
    const text = [
      "=== DONATION RECEIPT ===",
      `YUVANEXT FOUNDATION`,
      `Transaction ID: ${donation.transaction_id}`,
      `Date: ${new Date(donation.created_at).toLocaleDateString("en-IN")}`,
      `Amount: ₹${Number(donation.amount).toLocaleString("en-IN")}`,
      `Campaign: ${(donation as any).campaigns?.title || "General"}`,
      `Status: ${donation.payment_status}`,
      `Type: ${donation.type}`,
      donation.pan_number ? `PAN: ${donation.pan_number}` : "",
      `========================`,
    ].filter(Boolean).join("\n");
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `receipt-${donation.transaction_id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto py-10 px-4 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Welcome, {user.name}</h1>
            <p className="text-muted-foreground text-sm">Your donor dashboard</p>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="default" size="sm">
              <Link to="/donate-now">Donate Now</Link>
            </Button>
            <Button variant="outline" onClick={handleLogout} className="gap-2" size="sm">
              <LogOut className="h-4 w-4" /> Logout
            </Button>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="shadow-sm">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Donated</p>
                <p className="text-xl font-bold text-foreground">₹{totalDonated.toLocaleString("en-IN")}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-sm">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Last Donation</p>
                <p className="text-xl font-bold text-foreground">
                  {lastDonation ? new Date(lastDonation.created_at).toLocaleDateString("en-IN") : "—"}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-sm">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <RefreshCw className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Recurring</p>
                <p className="text-xl font-bold text-foreground">{recurringDonations.length}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-sm">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Donations</p>
                <p className="text-xl font-bold text-foreground">{donations.length}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Annual Summary */}
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <BarChart3 className="h-5 w-5" /> Annual Summary
            </CardTitle>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="px-3 py-1.5 border rounded-lg text-sm bg-background"
            >
              {yearsByDonation.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold text-primary">₹{yearTotal.toLocaleString("en-IN")}</p>
                <p className="text-xs text-muted-foreground">Total in {selectedYear}</p>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold text-foreground">{yearDonations.length}</p>
                <p className="text-xs text-muted-foreground">Transactions</p>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold text-foreground">
                  ₹{yearDonations.length ? Math.round(yearTotal / yearDonations.length).toLocaleString("en-IN") : 0}
                </p>
                <p className="text-xs text-muted-foreground">Avg. Donation</p>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold text-foreground">
                  {monthlyData.filter((m) => m.count > 0).length}
                </p>
                <p className="text-xs text-muted-foreground">Active Months</p>
              </div>
            </div>
            {/* Simple bar chart */}
            <div className="flex items-end gap-1 h-32">
              {monthlyData.map((m) => {
                const maxVal = Math.max(...monthlyData.map((x) => x.total), 1);
                const height = m.total > 0 ? Math.max((m.total / maxVal) * 100, 4) : 0;
                return (
                  <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-full bg-primary/80 rounded-t-sm transition-all"
                      style={{ height: `${height}%` }}
                      title={`₹${m.total.toLocaleString("en-IN")}`}
                    />
                    <span className="text-[10px] text-muted-foreground">{m.month}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recurring Donation Controls */}
        {recurringDonations.length > 0 && (
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <RefreshCw className="h-5 w-5" /> Recurring Donations
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Campaign</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Started</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recurringDonations.map((d) => (
                    <TableRow key={d.id}>
                      <TableCell className="font-medium">{(d as any).campaigns?.title || "General"}</TableCell>
                      <TableCell className="text-primary font-semibold">₹{Number(d.amount).toLocaleString("en-IN")}/mo</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(d.created_at).toLocaleDateString("en-IN")}
                      </TableCell>
                      <TableCell>
                        <Badge variant={d.payment_status === "completed" ? "default" : "secondary"}>
                          {d.payment_status === "completed" ? "Active" : d.payment_status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" disabled className="text-xs">
                          Manage
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <p className="text-xs text-muted-foreground px-4 py-3">
                Payment gateway integration coming soon for managing recurring donations.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Donation History & Receipts */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="h-5 w-5" /> Donation History & Receipts
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : donations.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">No donations yet.</p>
                <Button asChild size="sm">
                  <Link to="/donate-now">Make Your First Donation</Link>
                </Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Campaign</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead className="hidden sm:table-cell">Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Receipt</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {donations.map((d) => (
                    <TableRow key={d.id}>
                      <TableCell className="text-sm">
                        {new Date(d.created_at).toLocaleDateString("en-IN")}
                      </TableCell>
                      <TableCell className="text-sm">{(d as any).campaigns?.title || "General"}</TableCell>
                      <TableCell className="font-semibold text-primary">₹{Number(d.amount).toLocaleString("en-IN")}</TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge variant="outline" className="text-xs">{d.type}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={d.payment_status === "completed" ? "default" : "secondary"}>
                          {d.payment_status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {d.payment_status === "completed" && (
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => downloadReceipt(d)}>
                            <Download className="h-4 w-4" />
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Profile */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2"><User className="h-5 w-5" /> Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-medium text-foreground">{user.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium text-foreground">{user.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Role</p>
                <p className="font-medium text-foreground capitalize">{user.role}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default UserDashboard;
