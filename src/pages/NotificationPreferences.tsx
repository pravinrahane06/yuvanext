import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/layout/Layout";
import PageHero from "@/components/ui/PageHero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Bell, Mail, MessageSquare, Smartphone } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const channels = [
  { key: "email", label: "Email Notifications", description: "Receive updates via email", icon: Mail },
  { key: "sms", label: "SMS Notifications", description: "Get text messages for important updates", icon: Smartphone },
  { key: "whatsapp", label: "WhatsApp Notifications", description: "Receive messages on WhatsApp", icon: MessageSquare },
];

const categories = [
  { key: "donations", label: "Donation Receipts & Updates" },
  { key: "campaigns", label: "New Campaign Alerts" },
  { key: "activities", label: "Activity & Event Updates" },
  { key: "newsletters", label: "Monthly Newsletter" },
];

const NotificationPreferences = () => {
  const { user } = useAuth();
  const [prefs, setPrefs] = useState<Record<string, boolean>>({
    email: true, sms: false, whatsapp: false,
    donations: true, campaigns: true, activities: true, newsletters: false,
  });

  const toggle = (key: string) => setPrefs((p) => ({ ...p, [key]: !p[key] }));

  const save = () => {
    // TODO: Save to database when notification_preferences table is created
    toast({ title: "Preferences saved!", description: "Your notification preferences have been updated." });
  };

  if (!user) {
    return (
      <Layout>
        <PageHero title="Notification Preferences" subtitle="Manage how you receive updates" />
        <div className="py-20 text-center"><p className="text-muted-foreground">Please <a href="/login" className="text-primary underline">login</a> to manage preferences.</p></div>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageHero title="Notification Preferences" subtitle="Choose how and what updates you receive" />
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-2xl space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Bell className="w-5 h-5" /> Notification Channels</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {channels.map((ch) => (
                <div key={ch.key} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-3">
                    <ch.icon className="w-5 h-5 text-primary" />
                    <div>
                      <Label className="font-medium">{ch.label}</Label>
                      <p className="text-xs text-muted-foreground">{ch.description}</p>
                    </div>
                  </div>
                  <Switch checked={prefs[ch.key]} onCheckedChange={() => toggle(ch.key)} />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Notification Categories</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {categories.map((cat) => (
                <div key={cat.key} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <Label className="font-medium">{cat.label}</Label>
                  <Switch checked={prefs[cat.key]} onCheckedChange={() => toggle(cat.key)} />
                </div>
              ))}
            </CardContent>
          </Card>

          <Button onClick={save} className="w-full">Save Preferences</Button>
        </div>
      </section>
    </Layout>
  );
};

export default NotificationPreferences;
