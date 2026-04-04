import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Share2, Facebook, Twitter, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import { useTranslation } from "@/hooks/useTranslation";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

const ActivityDetail = () => {
  const { t, language } = useTranslation();
  const { id: slugParam } = useParams();

  const { data: activity, isLoading } = useQuery({
    queryKey: ["activity-detail", slugParam],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("activities")
        .select("*")
        .eq("slug", slugParam)
        .eq("status", "published")
        .single();
      if (error) throw error;
      return data;
    },
  });

  const { data: recentActivities = [] } = useQuery({
    queryKey: ["recent-activities", slugParam],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("activities")
        .select("id, title, slug, featured_image, created_at")
        .eq("status", "published")
        .neq("slug", slugParam)
        .order("created_at", { ascending: false })
        .limit(3);
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

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </Layout>
    );
  }

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

  return (
    <Layout>
      {/* Set SEO meta */}
      {activity.meta_title && <title>{activity.meta_title}</title>}

      {/* Hero Image */}
      <div className="pt-20">
        <div className="relative h-[40vh] md:h-[50vh] bg-muted">
          <img
            src={activity.featured_image || "/placeholder.svg"}
            alt={activity.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="container mx-auto">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-background max-w-3xl">
                {activity.title}
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
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
                  {getLocalizedDate(activity.created_at)}
                </div>
              </div>

              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                  {activity.short_description}
                </p>
                <div className="text-foreground leading-relaxed whitespace-pre-wrap">
                  {activity.full_content}
                </div>
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
                  {recentActivities.map((item) => (
                    <Card key={item.id} className="card-hover">
                      <CardContent className="p-4">
                        <Link to={`/activities/${item.slug}`}>
                          <div className="flex gap-4">
                            <div className="w-20 h-20 rounded-lg bg-muted overflow-hidden shrink-0">
                              <img
                                src={item.featured_image || "/placeholder.svg"}
                                alt={item.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <h4 className="font-medium text-foreground hover:text-primary transition-colors line-clamp-2">
                                {item.title}
                              </h4>
                              <p className="text-sm text-muted-foreground mt-1">
                                {getLocalizedDate(item.created_at)}
                              </p>
                            </div>
                          </div>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
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
