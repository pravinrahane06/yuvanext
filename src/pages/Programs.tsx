import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Layout from "@/components/layout/Layout";
import PageHero from "@/components/ui/PageHero";
import DynamicIcon from "@/components/ui/DynamicIcon";
import { programs } from "@/data/siteData";
import { useTranslation } from "@/hooks/useTranslation";

const programKeys = ["shiksha", "swasthya", "prakriti", "shakti", "kaushal"];

const Programs = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <PageHero
        title={t("programs.title")}
        subtitle={t("programs.subtitle")}
      />

      {/* Programs Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {programs.map((program, index) => {
                const programData = t(`programsData.${programKeys[index]}`);
                const objectives = t(`programsData.${programKeys[index]}.objectives`);
                
                return (
                  <AccordionItem
                    key={program.id}
                    value={program.id}
                    className="bg-card border rounded-xl overflow-hidden data-[state=open]:shadow-lg transition-shadow"
                  >
                    <AccordionTrigger className="px-6 py-6 hover:no-underline hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-4 text-left">
                        <div
                          className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 ${
                            index % 2 === 0
                              ? "bg-primary/10 text-primary"
                              : "bg-accent/10 text-accent"
                          }`}
                        >
                          <DynamicIcon name={program.icon} className="w-7 h-7" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-foreground">
                            {t(`programsData.${programKeys[index]}.title`)}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                            {t(`programsData.${programKeys[index]}.description`)}
                          </p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                      <div className="pt-4 border-t">
                        <p className="text-muted-foreground mb-6 leading-relaxed">
                          {t(`programsData.${programKeys[index]}.description`)}
                        </p>
                        <h4 className="font-semibold text-foreground mb-4">
                          {t("programs.keyInitiatives")}:
                        </h4>
                        <ul className="space-y-3">
                          {Array.isArray(objectives) ? objectives.map((objective: string, objIndex: number) => (
                            <li key={objIndex} className="flex gap-3">
                              <CheckCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                              <span className="text-muted-foreground">{objective}</span>
                            </li>
                          )) : program.objectives.map((objective, objIndex) => (
                            <li key={objIndex} className="flex gap-3">
                              <CheckCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                              <span className="text-muted-foreground">{objective}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Program Impact */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
              {t("programs.impactTitle")}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: "500+", label: t("programs.studentsTutored") },
                { number: "300+", label: t("programs.healthCamps") },
                { number: "5000+", label: t("programs.treesPlanted") },
                { number: "200+", label: t("programs.womenEmpowered") },
              ].map((stat, index) => (
                <div key={index} className="text-center p-6 bg-card rounded-xl border">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    {stat.number}
                  </div>
                  <div className="text-muted-foreground text-sm">{stat.label}</div>
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
              {t("programs.supportTitle")}
            </h2>
            <p className="text-xl text-background/70 mb-8">
              {t("programs.supportDesc")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/donate">
                  {t("programs.donateNow")}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-background/30 text-background hover:bg-background/10"
              >
                <Link to="/get-involved">{t("programs.volunteerWithUs")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Programs;
