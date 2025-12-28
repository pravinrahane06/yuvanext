import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import PageHero from "@/components/ui/PageHero";
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

const Activities = () => {
  const { t, language } = useTranslation();

  // Get unique categories
  const categories = [...new Set(activities.map((a) => a.category))];

  const getLocalizedDate = (dateString: string) => {
    const locale = language === "mr" ? "mr-IN" : "en-IN";
    return new Date(dateString).toLocaleDateString(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Layout>
      <PageHero
        title={t("activities.title")}
        subtitle={t("activities.subtitle")}
      />

      {/* Filter Section */}
      <section className="py-8 bg-background border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            <Button variant="default" size="sm">
              {t("activities.all")}
            </Button>
            {categories.map((category) => (
              <Button key={category} variant="outline" size="sm">
                {t(categoryKeys[category] || category)}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Activities Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activities.map((activity, index) => (
              <Card
                key={activity.id}
                className="card-hover overflow-hidden group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-video bg-muted relative overflow-hidden">
                  <img
                    src={activity.image}
                    alt={t(`activitiesData.${activityKeys[index]}.title`)}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                      <Tag className="w-3 h-3" />
                      {t(categoryKeys[activity.category] || activity.category)}
                    </span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <Calendar className="w-4 h-4" />
                    {getLocalizedDate(activity.date)}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {t(`activitiesData.${activityKeys[index]}.title`)}
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {t(`activitiesData.${activityKeys[index]}.excerpt`)}
                  </p>
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

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              {t("activities.loadMore")}
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {t("cta.stayUpdated")}
            </h2>
            <p className="text-muted-foreground mb-8">
              {t("cta.stayUpdatedDesc")}
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder={t("cta.enterEmail")}
                className="flex-1 px-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button type="submit">{t("cta.subscribe")}</Button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Activities;
