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

const skillOptions = [
  "Teaching/Tutoring",
  "Healthcare",
  "IT/Technology",
  "Marketing/Communications",
  "Event Management",
  "Photography/Videography",
  "Counseling",
  "Administration",
];

const GetInvolved = () => {
  const { toast } = useToast();
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    // Simulate form submission (will be replaced with PHP API call)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Application Submitted!",
      description: "Thank you for your interest. We'll get back to you soon.",
    });

    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
    setSelectedSkills([]);
  };

  return (
    <Layout>
      <PageHero
        title="Get Involved"
        subtitle="Join our community of changemakers and make a difference in society."
      />

      {/* Ways to Contribute */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Ways to Contribute"
            subtitle="There are many ways you can support our mission and create impact."
          />

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: "Volunteer",
                description: "Contribute your time and skills to our programs and initiatives.",
                features: ["Flexible timing", "Skill-based tasks", "Field activities", "Training provided"],
              },
              {
                icon: Handshake,
                title: "Partner With Us",
                description: "Collaborate with us to expand our reach and impact.",
                features: ["NGO partnerships", "Government tie-ups", "Academic collaborations", "Resource sharing"],
              },
              {
                icon: Building,
                title: "CSR Partnership",
                description: "Fulfill your CSR commitments through our impactful programs.",
                features: ["Project funding", "Employee engagement", "Impact reporting", "Tax benefits"],
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
              title="Become a Volunteer"
              subtitle="Fill out the form below to join our volunteer community."
            />

            <Card>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input id="name" placeholder="Enter your name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input id="email" type="email" placeholder="Enter your email" required />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input id="phone" type="tel" placeholder="Enter your phone" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input id="city" placeholder="Your city" required />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>Skills & Interests *</Label>
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
                    <Label htmlFor="availability">Availability</Label>
                    <Input id="availability" placeholder="e.g., Weekends, 4 hours/week" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Why do you want to volunteer?</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your motivation..."
                      rows={4}
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Application"}
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
                  Become a Member
                </h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Join YUVANEXT Foundation as a member and be part of our growing 
                  community of changemakers. Members enjoy exclusive benefits and 
                  opportunities to participate in our governance.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    "Voting rights in annual general meetings",
                    "Priority access to events and programs",
                    "Quarterly newsletters and updates",
                    "Networking opportunities with like-minded individuals",
                    "Certificate of membership",
                  ].map((benefit, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-accent" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild>
                  <Link to="/contact">
                    Enquire About Membership
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
                  <p className="text-muted-foreground">Active Members</p>
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
              Ready to Make an Impact?
            </h2>
            <p className="text-xl text-background/70 mb-8">
              Whether you volunteer, partner, or donate, your contribution matters.
            </p>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link to="/donate">
                Support Our Cause
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
