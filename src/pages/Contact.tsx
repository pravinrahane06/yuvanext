import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/layout/Layout";
import PageHero from "@/components/ui/PageHero";
import { contactInfo } from "@/data/siteData";
import { useTranslation } from "@/hooks/useTranslation";

const Contact = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: t("common.success"),
      description: t("contact.sendMessage"),
    });

    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <Layout>
      <PageHero
        title={t("contact.title")}
        subtitle={t("contact.subtitle")}
      />

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold text-foreground mb-8">
                {t("contact.getInTouch")}
              </h2>

              <div className="space-y-6">
                <Card className="card-hover">
                  <CardContent className="p-6 flex gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{t("contact.address")}</h3>
                      <p className="text-muted-foreground text-sm">
                        {contactInfo.address}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-hover">
                  <CardContent className="p-6 flex gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{t("contact.email")}</h3>
                      <a
                        href={`mailto:${contactInfo.email}`}
                        className="text-muted-foreground text-sm hover:text-primary transition-colors"
                      >
                        {contactInfo.email}
                      </a>
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-hover">
                  <CardContent className="p-6 flex gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{t("contact.phone")}</h3>
                      <a
                        href={`tel:${contactInfo.phone}`}
                        className="text-muted-foreground text-sm hover:text-primary transition-colors block"
                      >
                        {contactInfo.phone}
                      </a>
                      <a
                        href={`tel:${contactInfo.alternatePhone}`}
                        className="text-muted-foreground text-sm hover:text-primary transition-colors block"
                      >
                        {contactInfo.alternatePhone}
                      </a>
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-hover">
                  <CardContent className="p-6 flex gap-4">
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                      <Clock className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        {t("contact.workingHours")}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {contactInfo.workingHours}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-foreground mb-6">
                    {t("contact.sendMessage")}
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">{t("contact.fullName")} *</Label>
                        <Input
                          id="name"
                          placeholder={t("contact.fullName")}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">{t("contact.emailAddress")} *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder={t("contact.emailAddress")}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone">{t("contact.phoneNumber")}</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder={t("contact.phoneNumber")}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject">{t("contact.subject")} *</Label>
                        <Input
                          id="subject"
                          placeholder={t("contact.subject")}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">{t("contact.message")} *</Label>
                      <Textarea
                        id="message"
                        placeholder={t("contact.message")}
                        rows={6}
                        required
                      />
                    </div>

                    <Button type="submit" size="lg" disabled={isSubmitting}>
                      {isSubmitting ? (
                        t("contact.sending")
                      ) : (
                        <>
                          {t("contact.send")}
                          <Send className="ml-2 w-4 h-4" />
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {t("contact.findUs")}
            </h2>
            <p className="text-muted-foreground">
              {t("contact.mapPlaceholder")}
            </p>
          </div>

          {/* Map Placeholder */}
          <div className="max-w-5xl mx-auto">
            <div className="aspect-[16/9] bg-muted rounded-2xl flex items-center justify-center border">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  {t("contact.mapPlaceholder")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
