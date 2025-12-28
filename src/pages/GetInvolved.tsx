import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Users, Handshake, Building, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/layout/Layout";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import { useTranslation } from "@/hooks/useTranslation";

const GetInvolved = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const skillOptions = [
    t("skillsData.teaching"),
    t("skillsData.healthcare"),
    t("skillsData.it"),
    t("skillsData.marketing"),
    t("skillsData.eventManagement"),
    t("skillsData.photography"),
    t("skillsData.counseling"),
    t("skillsData.administration"),
  ];

  const handleSkillChange = (skill: string, checked: boolean) => {
    if (checked) {
      setSelectedSkills([...selectedSkills, skill]);
    } else {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: t("common.success"),
      description: t("getInvolved.submit"),
    });

    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
    setSelectedSkills([]);
  };

  return (
    <Layout>
      <PageHero
        title={t("getInvolved.title")}
        subtitle={t("getInvolved.subtitle")}
      />

      {/* Ways to Contribute */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <SectionHeading
            title={t("getInvolved.waysToContribute")}
            subtitle=""
          />

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: t("getInvolved.volunteer"),
                description: t("getInvolved.volunteerDesc"),
                features: [
                  t("volunteerFeatures.flexible"),
                  t("volunteerFeatures.skillBased"),
                  t("volunteerFeatures.field"),
                  t("volunteerFeatures.training"),
                ],
              },
              {
                icon: Handshake,
                title: t("getInvolved.partnership"),
                description: t("getInvolved.partnershipDesc"),
                features: [
                  t("partnershipFeatures.ngo"),
                  t("partnershipFeatures.government"),
                  t("partnershipFeatures.academic"),
                  t("partnershipFeatures.resource"),
                ],
              },
              {
                icon: Building,
                title: t("getInvolved.csr"),
                description: t("getInvolved.csrDesc"),
                features: [
                  t("csrFeatures.projectFunding"),
                  t("csrFeatures.employee"),
                  t("csrFeatures.impact"),
                  t("csrFeatures.tax"),
                ],
              },
            ].map((item, index) => (
              <Card key={index} className="card-hover">
                <CardHeader>
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <item.icon className="w-7 h-7 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">{item.description}</p>
                  <ul className="space-y-2">
                    {item.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-accent" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Volunteer Form */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <SectionHeading
              title={t("getInvolved.volunteerForm")}
              subtitle=""
            />

            <Card>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">{t("getInvolved.fullName")} *</Label>
                      <Input id="name" placeholder={t("getInvolved.fullName")} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">{t("getInvolved.email")} *</Label>
                      <Input id="email" type="email" placeholder={t("getInvolved.email")} required />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone">{t("getInvolved.phone")} *</Label>
                      <Input id="phone" type="tel" placeholder={t("getInvolved.phone")} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">{t("getInvolved.city")} *</Label>
                      <Input id="city" placeholder={t("getInvolved.city")} required />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>{t("getInvolved.skills")} *</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {skillOptions.map((skill) => (
                        <div key={skill} className="flex items-center space-x-2">
                          <Checkbox
                            id={skill}
                            checked={selectedSkills.includes(skill)}
                            onCheckedChange={(checked) =>
                              handleSkillChange(skill, checked as boolean)
                            }
                          />
                          <label
                            htmlFor={skill}
                            className="text-sm text-muted-foreground cursor-pointer"
                          >
                            {skill}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="availability">{t("getInvolved.availability")}</Label>
                    <Input id="availability" placeholder={t("getInvolved.selectAvailability")} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">{t("getInvolved.motivation")}</Label>
                    <Textarea
                      id="message"
                      placeholder={t("getInvolved.motivation")}
                      rows={4}
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? t("getInvolved.submitting") : t("getInvolved.submit")}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Membership */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  {t("getInvolved.membership")}
                </h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {t("getInvolved.membershipDesc")}
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    t("getInvolved.benefit1"),
                    t("getInvolved.benefit2"),
                    t("getInvolved.benefit3"),
                    t("getInvolved.benefit4"),
                  ].map((benefit, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-accent" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild>
                  <Link to="/contact">
                    {t("getInvolved.inquire")}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>
              <div className="p-8 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
                    <Users className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">50+</h3>
                  <p className="text-muted-foreground">{t("getInvolved.membershipBenefits")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-foreground text-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t("getInvolved.supportCta")}
            </h2>
            <p className="text-xl text-background/70 mb-8">
              {t("getInvolved.supportCtaDesc")}
            </p>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link to="/donate">
                {t("getInvolved.supportNow")}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default GetInvolved;
