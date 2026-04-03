import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Mail, Send } from "lucide-react";

const AdminEmail = () => {
  const { toast } = useToast();
  const [profiles, setProfiles] = useState<{ user_id: string; name: string }[]>([]);
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    supabase.from("profiles").select("user_id, name").then(({ data }) => setProfiles(data || []));
  }, []);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipient || !subject.trim() || !message.trim()) {
      toast({ title: "Missing fields", description: "Fill all fields", variant: "destructive" });
      return;
    }
    // Placeholder — real email integration to be added later
    toast({
      title: "Email queued",
      description: "Email sending will be enabled once a mail service is connected. This is a UI placeholder.",
    });
    setSubject("");
    setMessage("");
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Email Tool</h2>
          <p className="text-muted-foreground text-sm">Send emails to donors (placeholder UI)</p>
        </div>

        <Card className="shadow-sm max-w-2xl">
          <CardContent className="p-6">
            <form onSubmit={handleSend} className="space-y-4">
              <div className="space-y-2">
                <Label>Recipient</Label>
                <Select value={recipient} onValueChange={setRecipient}>
                  <SelectTrigger><SelectValue placeholder="Select a donor" /></SelectTrigger>
                  <SelectContent>
                    {profiles.map((p) => (
                      <SelectItem key={p.user_id} value={p.user_id}>{p.name || p.user_id}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Subject</Label>
                <Input placeholder="Email subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Message</Label>
                <Textarea rows={6} placeholder="Write your message..." value={message} onChange={(e) => setMessage(e.target.value)} />
              </div>
              <Button type="submit" className="gap-2">
                <Send className="h-4 w-4" /> Send Email
              </Button>
              <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                <Mail className="h-3.5 w-3.5" /> Email delivery requires connecting a mail service. This is a UI-ready placeholder.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminEmail;
