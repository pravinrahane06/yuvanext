import { Link } from "react-router-dom";
import { Heart, Building, Gift, AlertCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Layout from "@/components/layout/Layout";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import { useTranslation } from "@/hooks/useTranslation";

const Donate = () => {
  const { t } = useTranslation();

  const donationOptions = [
    { amount: "₹500", label: t("donate.impact500") },
    { amount: "₹1,000", label: t("donate.impact1000") },
    { amount: "₹2,500", label: t("donate.impact5000") },
    { amount: "₹5,000", label: t("donate.impact5000") },
    { amount: "₹10,000", label: t("donate.impact10000") },
    { amount: "Custom", label: t("donate.makeContribution") },
  ];

  return (
    <Layout>
      <PageHero
        title={t("donate.title")}
        subtitle={t("donate.subtitle")}
      />

      {/* Coming Soon Notice */}
      <section className="py-8 bg-background">
        <div className="container mx-auto px-4">
          <Alert className="max-w-4xl mx-auto bg-primary/10 border-primary/20">
            <AlertCircle className="h-5 w-5 text-primary" />
            <AlertDescription className="text-foreground">
              <strong>{t("donate.comingSoon")}</strong> {t("donate.comingSoonDesc")}
            </AlertDescription>
          </Alert>
        </div>
      </section>

      {/* Donation Options */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <SectionHeading
            title={t("donate.makeContribution")}
            subtitle=""
          />

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            {donationOptions.map((option, index) => (
              <Card
                key={index}
                className="card-hover text-center cursor-not-allowed opacity-75"
              >
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {option.amount}
                  </div>
                  <p className="text-sm text-muted-foreground">{option.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button disabled size="lg" className="opacity-75">
              <Heart className="mr-2 w-5 h-5" />
              {t("hero.donateComingSoon")}
            </Button>
          </div>
        </div>
      </section>

      {/* Ways to Give */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <SectionHeading
            title={t("donate.otherWays")}
            subtitle=""
          />

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="card-hover">
              <CardHeader>
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Building className="w-7 h-7 text-primary" />
                </div>
                <CardTitle>{t("donate.csrTitle")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  {t("donate.csrDesc")}
                </p>
                <Button asChild variant="outline">
                  <Link to="/contact">{t("donate.contactPartnership")}</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader>
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  <Gift className="w-7 h-7 text-accent" />
                </div>
                <CardTitle>{t("donate.inKindTitle")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  {t("donate.inKindDesc")}
                </p>
                <Button asChild variant="outline">
                  <Link to="/contact">{t("donate.contactDonations")}</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Impact of Donations */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">
              {t("donate.impactTitle")}
            </h2>
            <div className="grid md:grid-cols-4 gap-8 text-center">
              {[
                { number: "₹500", impact: t("donate.impact500") },
                { number: "₹1,000", impact: t("donate.impact1000") },
                { number: "₹5,000", impact: t("donate.impact5000") },
                { number: "₹10,000", impact: t("donate.impact10000") },
              ].map((item, index) => (
                <div key={index} className="p-6 bg-muted/30 rounded-xl">
                  <div className="text-2xl font-bold text-primary mb-3">
                    {item.number}
                  </div>
                  <p className="text-sm text-muted-foreground">{item.impact}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tax Benefits */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              {t("donate.taxTitle")}
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              {t("donate.taxDesc")}
            </p>
            <Button asChild variant="outline" size="lg">
              <Link to="/transparency">
                {t("donate.viewCertifications")}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-foreground text-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t("donate.contactCta")}
            </h2>
            <p className="text-xl text-background/70 mb-8">
              {t("donate.contactCtaDesc")}
            </p>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link to="/contact">
                {t("donate.contactUs")}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Donate;
