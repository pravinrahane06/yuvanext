import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { initialDonations, Donation } from "@/data/mockData";
import { toast } from "@/hooks/use-toast";
import { Heart, TrendingUp, Plus, LogOut } from "lucide-react";

const VolunteerDashboard = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [donorName, setDonorName] = useState("");
  const [amount, setAmount] = useState("");
  const [collected, setCollected] = useState<Donation[]>(
    initialDonations.filter((d) => d.collectedBy !== "Direct").slice(0, 3)
  );

  if (!user) return null;

  const totalCollected = collected.reduce((s, d) => s + d.amount, 0);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: Donation = {
      id: `don-${Date.now()}`,
      userId: "new",
      donorName,
      amount: Number(amount),
      date: new Date().toISOString().split("T")[0],
      method: "Cash",
      collectedBy: user.name,
      status: "completed",
    };
    setCollected((prev) => [newEntry, ...prev]);
    setDonorName(""); setAmount(""); setShowForm(false);
    toast({ title: "Entry Added", description: `₹${Number(amount).toLocaleString("en-IN")} from ${donorName} recorded.` });
  };

  const handleLogout = () => { logout(); navigate("/"); };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto py-10 px-4 space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Volunteer Dashboard</h1>
            <p className="text-muted-foreground text-sm">Welcome, {user.name}</p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="gap-2">
            <LogOut className="h-4 w-4" /> Logout
          </Button>
        </div>

        {/* Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card className="shadow-sm">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Collected</p>
                <p className="text-xl font-bold text-foreground">₹{totalCollected.toLocaleString("en-IN")}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-sm">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Campaigns</p>
                <p className="text-xl font-bold text-foreground">3</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Donations Collected */}
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Donations Collected</CardTitle>
            <Button size="sm" className="gap-1" onClick={() => setShowForm(!showForm)}>
              <Plus className="h-4 w-4" /> Add Entry
            </Button>
          </CardHeader>

          {showForm && (
            <CardContent className="pt-0 pb-4 border-b border-border">
              <form onSubmit={handleAdd} className="flex flex-col sm:flex-row gap-3 items-end">
                <div className="flex-1 space-y-1">
                  <Label htmlFor="dname" className="text-xs">Donor Name</Label>
                  <Input id="dname" value={donorName} onChange={(e) => setDonorName(e.target.value)} placeholder="Donor name" required />
                </div>
                <div className="w-full sm:w-40 space-y-1">
                  <Label htmlFor="damount" className="text-xs">Amount (₹)</Label>
                  <Input id="damount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" required />
                </div>
                <Button type="submit" size="sm">Save</Button>
              </form>
            </CardContent>
          )}

          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Donor Name</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {collected.map((d) => (
                  <TableRow key={d.id}>
                    <TableCell className="font-medium text-foreground">{d.donorName}</TableCell>
                    <TableCell className="font-semibold text-primary">₹{d.amount.toLocaleString("en-IN")}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">{d.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default VolunteerDashboard;
