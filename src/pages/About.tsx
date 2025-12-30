import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import DynamicIcon from "@/components/ui/DynamicIcon";
import LeadershipSection from "@/components/sections/LeadershipSection";
import { coreValues } from "@/data/siteData";
import { useTranslation } from "@/hooks/useTranslation";

const About = () => {
  const { t } = useTranslation();

  const whyYuvanext = [
    {
      titleKey: "whyYuvanextData.youthCentric.title",
      descKey: "whyYuvanextData.youthCentric.description",
    },
    {
      titleKey: "whyYuvanextData.grassroots.title",
      descKey: "whyYuvanextData.grassroots.description",
    },
    {
      titleKey: "whyYuvanextData.sustainable.title",
      descKey: "whyYuvanextData.sustainable.description",
    },
    {
      titleKey: "whyYuvanextData.transparent.title",
      descKey: "whyYuvanextData.transparent.description",
    },
  ];

  const coreValueKeys = ["transparency", "inclusivity", "sustainability", "collaboration"];

  return (
    <Layout>
      <PageHero
        title={t("nav.aboutUs")}
        subtitle={t("about.description2")}
      />

      {/* Who We Are */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
                {t("hero.badge")}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                {t("about.whoWeAre")}
              </h2>
            </div>

            <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
              <p className="text-lg leading-relaxed">
                {t("about.description1")}
              </p>
              <p className="text-lg leading-relaxed">
                {t("about.description2")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why YUVANEXT */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <SectionHeading
            title={t("about.whyYuvanext")}
            subtitle=""
          />

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {whyYuvanext.map((item, index) => (
              <div
                key={index}
                className="flex gap-4 p-6 bg-card rounded-xl border card-hover"
              >
                <CheckCircle className="w-6 h-6 text-accent shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {t(item.titleKey)}
                  </h3>
                  <p className="text-muted-foreground">{t(item.descKey)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <SectionHeading
            title={t("about.ourApproach")}
            subtitle=""
          />

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: t("about.identify"),
                description: t("about.identifyDesc"),
              },
              {
                step: "02",
                title: t("about.implement"),
                description: t("about.implementDesc"),
              },
              {
                step: "03",
                title: t("about.impact"),
                description: t("about.impactDesc"),
              },
            ].map((item, index) => (
              <div key={index} className="text-center p-8 bg-card rounded-xl border card-hover">
                <div className="w-16 h-16 rounded-full bg-gradient-saffron text-primary-foreground text-2xl font-bold flex items-center justify-center mx-auto mb-6">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {item.title}
                </h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <SectionHeading
            title={t("coreValuesData.title")}
            subtitle=""
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value, index) => (
              <Card key={index} className="card-hover text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                    <DynamicIcon name={value.icon} className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {t(`coreValuesData.${coreValueKeys[index]}.title`)}
                  </h3>
                  <p className="text-muted-foreground">
                    {t(`coreValuesData.${coreValueKeys[index]}.description`)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Section - Full Version */}
      <LeadershipSection variant="full" />

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              {t("getInvolved.supportCta")}
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              {t("cta.bePartDesc")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/get-involved">
                  {t("nav.getInvolved")}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/vision-mission">{t("nav.visionMission")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
