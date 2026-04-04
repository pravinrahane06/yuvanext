import { Link } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import PageHero from "@/components/ui/PageHero";
import { useTranslation } from "@/hooks/useTranslation";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

const Activities = () => {
  const { t, language } = useTranslation();

  const { data: activities = [], isLoading } = useQuery({
    queryKey: ["public-activities"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("activities")
        .select("*")
        .eq("status", "published")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

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

      {/* Activities Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : activities.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">{t("activities.noActivities") || "No activities published yet."}</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {activities.map((activity, index) => (
                <Card
                  key={activity.id}
                  className="card-hover overflow-hidden group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="aspect-video bg-muted relative overflow-hidden">
                    <img
                      src={activity.featured_image || "/placeholder.svg"}
                      alt={activity.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <Calendar className="w-4 h-4" />
                      {getLocalizedDate(activity.created_at)}
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {activity.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {activity.short_description}
                    </p>
                    <Link
                      to={`/activities/${activity.slug}`}
                      className="inline-flex items-center text-primary font-medium hover:gap-2 transition-all"
                    >
                      {t("activities.readMore")}
                      <ArrowRight className="ml-1 w-4 h-4" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
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
