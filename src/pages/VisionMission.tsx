import { Link } from "react-router-dom";
import { ArrowRight, Target, Eye, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import PageHero from "@/components/ui/PageHero";

const missionPoints = [
  "Provide quality education and skill development opportunities to underprivileged youth",
  "Promote health awareness and ensure access to basic healthcare in rural areas",
  "Empower women through education, financial literacy, and entrepreneurship support",
  "Protect the environment through conservation and sustainability initiatives",
  "Foster community development through participatory and inclusive programs",
  "Advocate for social justice and equal opportunities for all",
  "Build youth leadership capacity for driving positive change",
];

const VisionMission = () => {
  return (
    <Layout>
      <PageHero
        title="Vision & Mission"
        subtitle="Our guiding principles and aspirations for a better tomorrow."
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
                Our Vision
              </h2>
            </div>

            <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8 md:p-12 border">
              <blockquote className="text-2xl md:text-3xl font-medium text-foreground leading-relaxed text-center italic">
                "To create a self-reliant, educated, and healthy society where every 
                individual has the opportunity to realize their full potential and 
                contribute meaningfully to nation-building."
              </blockquote>
            </div>

            <p className="text-lg text-muted-foreground mt-8 leading-relaxed text-center">
              We envision an India where youth are empowered with knowledge and skills, 
              communities thrive in harmony with nature, and every person has access to 
              opportunities for growth and development.
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
                Our Mission
              </h2>
            </div>

            <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
              Our mission is to drive holistic development through targeted interventions 
              in education, health, environment, and economic empowerment. We aim to:
            </p>

            <div className="space-y-4">
              {missionPoints.map((point, index) => (
                <div
                  key={index}
                  className="flex gap-4 p-5 bg-card rounded-xl border card-hover"
                >
                  <CheckCircle className="w-6 h-6 text-accent shrink-0 mt-0.5" />
                  <p className="text-foreground">{point}</p>
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
              Our Commitment
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "To Communities",
                  description: "We are committed to working alongside communities, not for them, ensuring local ownership and sustainable outcomes.",
                },
                {
                  title: "To Transparency",
                  description: "Every action, every rupee is accounted for. We maintain complete transparency in all our operations and finances.",
                },
                {
                  title: "To Excellence",
                  description: "We strive for excellence in everything we do, continuously learning and improving our programs for maximum impact.",
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
              Explore Our 360° Objectives
            </h2>
            <p className="text-xl text-background/70 mb-8">
              Discover the seven key areas where we are making a difference.
            </p>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link to="/objectives">
                View 360 Objectives
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
