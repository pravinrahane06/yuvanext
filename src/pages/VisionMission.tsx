import { Link } from "react-router-dom";
import { ArrowRight, Target, Eye, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import PageHero from "@/components/ui/PageHero";
import { useTranslation } from "@/hooks/useTranslation";

const VisionMission = () => {
  const { t } = useTranslation();

  const missionPointKeys = [
    "missionPoints.education",
    "missionPoints.health",
    "missionPoints.women",
    "missionPoints.environment",
    "missionPoints.community",
    "missionPoints.advocacy",
    "missionPoints.leadership",
  ];

  return (
    <Layout>
      <PageHero
        title={t("vision.title")}
        subtitle={t("vision.subtitle")}
      />

      {/* Vision Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Eye className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                {t("vision.ourVision")}
              </h2>
            </div>

            <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8 md:p-12 border">
              <blockquote className="text-2xl md:text-3xl font-medium text-foreground leading-relaxed text-center italic">
                "{t("vision.visionText")}"
              </blockquote>
            </div>

            <p className="text-lg text-muted-foreground mt-8 leading-relaxed text-center">
              {t("cta.visionDesc")}
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
                <Target className="w-8 h-8 text-accent" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                {t("vision.ourMission")}
              </h2>
            </div>

            <div className="space-y-4">
              {missionPointKeys.map((key, index) => (
                <div
                  key={index}
                  className="flex gap-4 p-5 bg-card rounded-xl border card-hover"
                >
                  <CheckCircle className="w-6 h-6 text-accent shrink-0 mt-0.5" />
                  <p className="text-foreground">{t(key)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Commitment */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
              {t("vision.commitment")}
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: t("vision.commitmentIntegrity"),
                  description: t("vision.commitmentIntegrityDesc"),
                },
                {
                  title: t("vision.commitmentImpact"),
                  description: t("vision.commitmentImpactDesc"),
                },
                {
                  title: t("vision.commitmentInclusion"),
                  description: t("vision.commitmentInclusionDesc"),
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="text-center p-8 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl border"
                >
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-foreground text-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t("vision.exploreObjectives")}
            </h2>
            <p className="text-xl text-background/70 mb-8">
              {t("objectives.subtitle")}
            </p>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link to="/objectives">
                {t("cta.viewObjectives")}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default VisionMission;
