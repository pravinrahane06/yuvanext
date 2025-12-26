import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import PageHero from "@/components/ui/PageHero";
import DynamicIcon from "@/components/ui/DynamicIcon";
import { objectives } from "@/data/siteData";

const Objectives = () => {
  return (
    <Layout>
      <PageHero
        title="360° Objectives"
        subtitle="Our comprehensive approach to holistic development across seven key areas."
      />

      {/* Objectives Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Circular/Hexagonal Layout on larger screens */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {objectives.map((objective, index) => (
                <div
                  key={objective.id}
                  className={`group p-8 bg-card rounded-2xl border card-hover relative overflow-hidden ${
                    index === objectives.length - 1 && objectives.length % 3 === 1
                      ? "lg:col-start-2"
                      : ""
                  }`}
                >
                  {/* Background decoration */}
                  <div
                    className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl transition-opacity duration-300 group-hover:opacity-100 ${
                      objective.color === "primary"
                        ? "bg-primary/10 opacity-50"
                        : "bg-accent/10 opacity-50"
                    }`}
                  />

                  <div className="relative">
                    <div
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 ${
                        objective.color === "primary"
                          ? "bg-primary/10 text-primary"
                          : "bg-accent/10 text-accent"
                      }`}
                    >
                      <DynamicIcon name={objective.icon} className="w-8 h-8" />
                    </div>

                    <span className="text-sm font-medium text-muted-foreground mb-2 block">
                      Objective {objective.id}
                    </span>

                    <h3 className="text-xl font-semibold text-foreground mb-4">
                      {objective.title}
                    </h3>

                    <p className="text-muted-foreground leading-relaxed">
                      {objective.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Central 360° concept */}
            <div className="mt-16 text-center">
              <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground">
                <div className="text-center">
                  <span className="text-4xl font-bold">360°</span>
                  <span className="block text-sm">Approach</span>
                </div>
              </div>
              <p className="text-lg text-muted-foreground mt-6 max-w-2xl mx-auto">
                Our 360-degree approach ensures comprehensive development by addressing 
                all interconnected aspects of community welfare.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Statement */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
              Creating Holistic Impact
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Each of our seven objectives is interconnected, creating a ripple effect 
              of positive change. When we educate a young person, we're not just building 
              their future—we're strengthening families, communities, and the nation.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: "7", label: "Key Objectives" },
                { number: "5+", label: "Active Programs" },
                { number: "100%", label: "Community Focus" },
                { number: "∞", label: "Commitment" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">
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
      <section className="py-20 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              See Our Programs in Action
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Explore how we translate our objectives into impactful programs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/programs">
                  View Programs
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/activities">See Activities</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Objectives;
