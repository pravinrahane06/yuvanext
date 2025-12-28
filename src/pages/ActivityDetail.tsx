import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Tag, Share2, Facebook, Twitter, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import { activities } from "@/data/siteData";
import { useTranslation } from "@/hooks/useTranslation";

const activityKeys = [
  "treePlantation",
  "healthCamp",
  "digitalLiteracy",
  "womenSHG",
  "bloodDonation",
  "careerCounseling",
];

const categoryKeys: Record<string, string> = {
  "Environment": "categoriesData.environment",
  "Health": "categoriesData.health",
  "Education": "categoriesData.education",
  "Women Empowerment": "categoriesData.womenEmpowerment",
};

const ActivityDetail = () => {
  const { t, language } = useTranslation();
  const { id } = useParams();
  const activityIndex = activities.findIndex((a) => a.id === id);
  const activity = activities[activityIndex];

  const getLocalizedDate = (dateString: string) => {
    const locale = language === "mr" ? "mr-IN" : "en-IN";
    return new Date(dateString).toLocaleDateString(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (!activity) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">{t("common.notFound")}</h1>
            <p className="text-muted-foreground mb-8">{t("common.notFoundDesc")}</p>
            <Button asChild>
              <Link to="/activities">{t("activities.backTo")}</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const recentActivities = activities.filter((a) => a.id !== id).slice(0, 3);

  return (
    <Layout>
      {/* Hero Image */}
      <div className="pt-20">
        <div className="relative h-[40vh] md:h-[50vh] bg-muted">
          <img
            src={activity.image}
            alt={t(`activitiesData.${activityKeys[activityIndex]}.title`)}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="container mx-auto">
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full mb-4">
                <Tag className="w-4 h-4" />
                {t(categoryKeys[activity.category] || activity.category)}
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-background max-w-3xl">
                {t(`activitiesData.${activityKeys[activityIndex]}.title`)}
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Link
                to="/activities"
                className="inline-flex items-center text-primary hover:gap-2 transition-all mb-8"
              >
                <ArrowLeft className="mr-2 w-4 h-4" />
                {t("activities.backTo")}
              </Link>

              <div className="flex items-center gap-4 text-muted-foreground mb-8">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  {getLocalizedDate(activity.date)}
                </div>
              </div>

              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                  {t(`activitiesData.${activityKeys[activityIndex]}.excerpt`)}
                </p>
                <p className="text-foreground leading-relaxed">
                  {t(`activitiesData.${activityKeys[activityIndex]}.content`)}
                </p>
              </div>

              {/* Share */}
              <div className="mt-12 pt-8 border-t">
                <div className="flex items-center gap-4">
                  <span className="text-foreground font-medium flex items-center gap-2">
                    <Share2 className="w-5 h-5" />
                    {t("activities.share")}:
                  </span>
                  <div className="flex gap-2">
                    <button className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                      <Facebook className="w-5 h-5" />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                      <Twitter className="w-5 h-5" />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                      <Linkedin className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <h3 className="text-xl font-semibold text-foreground mb-6">
                  {t("activities.recentActivities")}
                </h3>
                <div className="space-y-4">
                  {recentActivities.map((item) => {
                    const itemIndex = activities.findIndex((a) => a.id === item.id);
                    return (
                      <Card key={item.id} className="card-hover">
                        <CardContent className="p-4">
                          <Link to={`/activities/${item.id}`}>
                            <div className="flex gap-4">
                              <div className="w-20 h-20 rounded-lg bg-muted overflow-hidden shrink-0">
                                <img
                                  src={item.image}
                                  alt={t(`activitiesData.${activityKeys[itemIndex]}.title`)}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                                <h4 className="font-medium text-foreground hover:text-primary transition-colors line-clamp-2">
                                  {t(`activitiesData.${activityKeys[itemIndex]}.title`)}
                                </h4>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {getLocalizedDate(item.date)}
                                </p>
                              </div>
                            </div>
                          </Link>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>

                {/* CTA Box */}
                <div className="mt-8 p-6 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl border">
                  <h4 className="font-semibold text-foreground mb-3">
                    {t("activities.getInvolved")}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    {t("activities.getInvolvedDesc")}
                  </p>
                  <Button asChild className="w-full">
                    <Link to="/get-involved">{t("activities.volunteer")}</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ActivityDetail;
