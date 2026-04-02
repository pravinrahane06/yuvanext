import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { initialDonations } from "@/data/mockData";
import { DollarSign, Calendar, TrendingUp, LogOut, User } from "lucide-react";
import { useEffect } from "react";

const UserDashboard = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  // Mock user's donations (demo data)
  const userDonations = initialDonations.slice(0, 3);

  const totalDonated = userDonations.reduce((s, d) => s + d.amount, 0);
  const lastDonation = userDonations[userDonations.length - 1];

  const handleLogout = () => { logout(); navigate("/"); };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto py-10 px-4 space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Welcome, {user.name}</h1>
            <p className="text-muted-foreground text-sm">Your donor dashboard</p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="gap-2">
            <LogOut className="h-4 w-4" /> Logout
          </Button>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                <p className="text-xl font-bold text-foreground">{lastDonation?.date ?? "—"}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-sm">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-green/10 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Impact Score</p>
                <p className="text-xl font-bold text-foreground">Excellent</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Donation History */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Donation History</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead className="hidden sm:table-cell">Method</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {userDonations.map((d) => (
                  <TableRow key={d.id}>
                    <TableCell className="text-sm">{d.date}</TableCell>
                    <TableCell className="font-semibold text-primary">₹{d.amount.toLocaleString("en-IN")}</TableCell>
                    <TableCell className="hidden sm:table-cell text-sm">{d.method}</TableCell>
                    <TableCell>
                      <span className={`text-xs px-2 py-1 rounded-full ${d.status === "completed" ? "bg-green/10 text-green" : "bg-saffron/10 text-saffron"}`}>
                        {d.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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
