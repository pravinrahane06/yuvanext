import { Link } from "react-router-dom";
import { FileText, Download, Shield, Eye, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import { useTranslation } from "@/hooks/useTranslation";

const Transparency = () => {
  const { t } = useTranslation();

  const documents = [
    {
      titleKey: "documentsData.incorporation.title",
      descKey: "documentsData.incorporation.description",
      type: "PDF",
      size: "1.2 MB",
    },
    {
      titleKey: "documentsData.moa.title",
      descKey: "documentsData.moa.description",
      type: "PDF",
      size: "2.5 MB",
    },
    {
      titleKey: "documentsData.aoa.title",
      descKey: "documentsData.aoa.description",
      type: "PDF",
      size: "1.8 MB",
    },
    {
      titleKey: "documentsData.80g.title",
      descKey: "documentsData.80g.description",
      type: "PDF",
      size: "0.8 MB",
    },
    {
      titleKey: "documentsData.12a.title",
      descKey: "documentsData.12a.description",
      type: "PDF",
      size: "0.6 MB",
    },
    {
      titleKey: "documentsData.annualReport.title",
      descKey: "documentsData.annualReport.description",
      type: "PDF",
      size: "5.2 MB",
    },
  ];

  return (
    <Layout>
      <PageHero
        title={t("transparency.title")}
        subtitle={t("transparency.subtitle")}
      />

      {/* Our Commitment */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                <Shield className="w-10 h-10 text-accent" />
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                {t("transparency.commitment")}
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Eye,
                  title: t("transparency.accountability"),
                  description: t("transparency.accountabilityDesc"),
                },
                {
                  icon: FileText,
                  title: t("transparency.auditedReports"),
                  description: t("transparency.auditedReportsDesc"),
                },
                {
                  icon: Shield,
                  title: t("transparency.openDoor"),
                  description: t("transparency.openDoorDesc"),
                },
              ].map((item, index) => (
                <div key={index} className="text-center p-6">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Documents */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <SectionHeading
            title={t("transparency.documents")}
            subtitle=""
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {documents.map((doc, index) => (
              <Card key={index} className="card-hover">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <FileText className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                      {doc.type} • {doc.size}
                    </span>
                  </div>
                  <CardTitle className="text-lg mt-4">{t(doc.titleKey)}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {t(doc.descKey)}
                  </p>
                  <Button variant="outline" size="sm" className="w-full" disabled>
                    <Download className="w-4 h-4 mr-2" />
                    {t("transparency.download")} ({t("transparency.comingSoon")})
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Financial Overview */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">
              {t("transparency.fundUtilization")}
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-8 bg-muted/30 rounded-2xl">
                <h3 className="text-xl font-semibold text-foreground mb-6">
                  {t("transparency.fundUtilization")}
                </h3>
                <div className="space-y-4">
                  {[
                    { label: t("transparency.programs"), percentage: 75 },
                    { label: t("transparency.administration"), percentage: 15 },
                    { label: t("transparency.fundraising"), percentage: 5 },
                    { label: t("transparency.emergency"), percentage: 5 },
                  ].map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-foreground">{item.label}</span>
                        <span className="text-muted-foreground">{item.percentage}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            index === 0 ? "bg-primary" : index === 1 ? "bg-accent" : "bg-muted-foreground/30"
                          }`}
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-8 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl">
                <h3 className="text-xl font-semibold text-foreground mb-6">
                  {t("transparency.financialIntegrity")}
                </h3>
                <p className="text-muted-foreground">
                  {t("transparency.financialIntegrity")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Governance */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              {t("transparency.governance")}
            </h2>
            <p className="text-lg text-muted-foreground mb-12">
              {t("transparency.governanceDesc")}
            </p>
            <Button asChild variant="outline" size="lg">
              <Link to="/about">
                {t("transparency.viewTeam")}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact for Verification */}
      <section className="py-20 bg-foreground text-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t("transparency.contactVerification")}
            </h2>
            <p className="text-xl text-background/70 mb-8">
              {t("transparency.contactVerificationDesc")}
            </p>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link to="/contact">
                {t("transparency.verifyNow")}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Transparency;
