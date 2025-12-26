import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import DynamicIcon from "@/components/ui/DynamicIcon";
import { coreValues } from "@/data/siteData";

const whyYuvanext = [
  {
    title: "Youth-Centric Approach",
    description: "Our programs are designed with young people at the center, ensuring relevance and maximum impact.",
  },
  {
    title: "Grassroots Connection",
    description: "We work directly with communities, understanding their unique needs and challenges.",
  },
  {
    title: "Sustainable Impact",
    description: "Our initiatives focus on creating long-term, sustainable change rather than temporary solutions.",
  },
  {
    title: "Transparent Operations",
    description: "Complete transparency in our operations and finances, ensuring every rupee counts.",
  },
];

const About = () => {
  return (
    <Layout>
      <PageHero
        title="About Us"
        subtitle="Learn about our journey, values, and commitment to creating positive change in society."
      />

      {/* Who We Are */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
                Section-8 Registered Organization
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Who We Are
              </h2>
            </div>

            <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
              <p className="text-lg leading-relaxed">
                <strong className="text-foreground">YUVANEXT Foundation</strong> is a Section-8 
                registered non-profit organization established with a vision to empower youth and 
                transform communities across India. Registered under the Companies Act, 2013, we 
                are committed to transparency, accountability, and sustainable impact.
              </p>
              <p className="text-lg leading-relaxed">
                Our foundation was born from the belief that young people are the driving force 
                of positive change. By investing in their education, health, and skills, we can 
                build a stronger, more equitable society for all.
              </p>
              <p className="text-lg leading-relaxed">
                We operate across multiple focus areas including education, healthcare, 
                environmental conservation, women empowerment, and community development. Our 
                holistic approach ensures that we address the interconnected challenges facing 
                our communities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why YUVANEXT */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Why YUVANEXT?"
            subtitle="What makes us different in our approach to social development."
          />

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {whyYuvanext.map((item, index) => (
              <div
                key={index}
                className="flex gap-4 p-6 bg-card rounded-xl border card-hover"
              >
                <CheckCircle className="w-6 h-6 text-accent shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Our Approach"
            subtitle="A systematic methodology to create lasting change."
          />

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Identify",
                description: "We identify communities and individuals who need support through ground-level research and community engagement.",
              },
              {
                step: "02",
                title: "Implement",
                description: "We design and implement tailored programs that address specific needs with measurable outcomes.",
              },
              {
                step: "03",
                title: "Impact",
                description: "We continuously monitor, evaluate, and improve our programs to maximize sustainable impact.",
              },
            ].map((item, index) => (
              <div key={index} className="text-center p-8 bg-card rounded-xl border card-hover">
                <div className="w-16 h-16 rounded-full bg-gradient-saffron text-primary-foreground text-2xl font-bold flex items-center justify-center mx-auto mb-6">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {item.title}
                </h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Our Core Values"
            subtitle="The principles that guide everything we do."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value, index) => (
              <Card key={index} className="card-hover text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                    <DynamicIcon name={value.icon} className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join our community of changemakers and help us create lasting impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/get-involved">
                  Get Involved
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/vision-mission">Our Vision & Mission</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
