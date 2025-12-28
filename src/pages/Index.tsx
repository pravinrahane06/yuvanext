import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/SectionHeading";
import DynamicIcon from "@/components/ui/DynamicIcon";
import { focusAreas, activities, coreValues } from "@/data/siteData";
import { useTranslation } from "@/hooks/useTranslation";

const Index = () => {
  const { t, language } = useTranslation();

  const getLocalizedDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString(language === "mr" ? "mr-IN" : "en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pb-32">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        </div>

        {/* Tricolor Accent Lines */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-white to-accent" />

        <div className="container mx-auto px-4 relative z-10 pt-20">
          <div className="max-w-4xl mx-auto text-center">
            <div
              className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-8 animate-fade-in"
            >
              {t("hero.badge")}
            </div>

            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              {t("hero.empowering")}{" "}
              <span className="text-gradient-saffron">{t("hero.youth")}</span>
              <br />
              {t("hero.transforming")}{" "}
              <span className="text-gradient-green">{t("hero.communities")}</span>
            </h1>

            <p
              className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-in"
              style={{ animationDelay: "0.4s" }}
            >
              {t("hero.subtitle")}
            </p>

            <div
              className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap animate-fade-in"
              style={{ animationDelay: "0.6s" }}
            >
              <Button asChild size="lg" className="text-lg px-8">
                <Link to="/get-involved">
                  {t("hero.joinMission")}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8">
                <Link to="/about">{t("hero.learnMore")}</Link>
              </Button>
              <Button variant="secondary" size="lg" className="text-lg px-8 cursor-not-allowed opacity-80" disabled>
                {t("hero.donateComingSoon")}
              </Button>
            </div>

            {/* Stats - Glassmorphic Card */}
            <div
              className="mt-20 animate-fade-in"
              style={{ animationDelay: "0.8s" }}
            >
              <div className="bg-background/60 dark:bg-background/40 backdrop-blur-xl rounded-2xl border border-border/50 shadow-xl p-8 md:p-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                  {[
                    { number: "5+", label: t("stats.programs") },
                    { number: "1000+", label: t("stats.livesImpacted") },
                    { number: "50+", label: t("stats.volunteers") },
                    { number: "10+", label: t("stats.communities") },
                  ].map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                        {stat.number}
                      </div>
                      <div className="text-muted-foreground text-sm font-medium">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-left">
              <div className="inline-block px-4 py-2 bg-accent/10 rounded-full text-accent text-sm font-medium mb-6">
                {t("about.badge")}
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                {t("about.whoWeAre")}
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                {t("about.description1")}
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                {t("about.description2")}
              </p>
              <Button asChild>
                <Link to="/about">
                  {t("about.discoverStory")}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4 animate-fade-in-right">
              {coreValues.map((value, index) => (
                <Card
                  key={index}
                  className="card-hover bg-card border-border"
                >
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <DynamicIcon name={value.icon} className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">
                      {t(`coreValues.${value.title.toLowerCase()}.title`)}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {t(`coreValues.${value.title.toLowerCase()}.description`)}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Focus Areas Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <SectionHeading
            title={t("focusAreas.title")}
            subtitle={t("focusAreas.subtitle")}
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {focusAreas.map((area, index) => (
              <Card
                key={area.id}
                className="card-hover bg-card border-border group overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 ${
                      area.color === "primary"
                        ? "bg-primary/10 text-primary"
                        : "bg-accent/10 text-accent"
                    }`}
                  >
                    <DynamicIcon name={area.icon} className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {t(`focusAreasData.${area.id}.title`)}
                  </h3>
                  <p className="text-muted-foreground">{t(`focusAreasData.${area.id}.description`)}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg">
              <Link to="/programs">
                {t("focusAreas.viewAll")}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Latest Activities Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <SectionHeading
            title={t("activities.latestTitle")}
            subtitle={t("activities.latestSubtitle")}
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activities.slice(0, 3).map((activity, index) => (
              <Card
                key={activity.id}
                className="card-hover bg-card border-border overflow-hidden group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-video bg-muted relative overflow-hidden">
                  <img
                    src={activity.image}
                    alt={activity.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                      {t(`categories.${activity.category.toLowerCase().replace(" ", "")}`)}
                    </span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground mb-2">
                    {getLocalizedDate(activity.date)}
                  </p>
                  <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {activity.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">{activity.excerpt}</p>
                  <Link
                    to={`/activities/${activity.id}`}
                    className="inline-flex items-center text-primary font-medium hover:gap-2 transition-all"
                  >
                    {t("activities.readMore")}
                    <ArrowRight className="ml-1 w-4 h-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link to="/activities">
                {t("activities.viewAll")}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Vision CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-accent/10 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              {t("cta.visionTitle")}
            </h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              {t("cta.visionDesc")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/vision-mission">
                  {t("cta.exploreVision")}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/objectives">{t("cta.viewObjectives")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Get Involved CTA */}
      <section className="py-20 bg-foreground text-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t("cta.bePartTitle")}
            </h2>
            <p className="text-xl text-background/70 mb-10">
              {t("cta.bePartDesc")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Link to="/get-involved">
                  {t("cta.becomeVolunteer")}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-background/30 text-background hover:bg-background/10"
              >
                <Link to="/donate">{t("cta.supportCause")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
