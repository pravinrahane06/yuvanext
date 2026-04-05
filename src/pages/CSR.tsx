import { Building2, Handshake, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";

const partners = [
  { name: "Partner Company 1", description: "Supporting education initiatives across rural India.", logo: "" },
  { name: "Partner Company 2", description: "Funding health and sanitation programs.", logo: "" },
  { name: "Partner Company 3", description: "Sponsoring digital literacy workshops.", logo: "" },
  { name: "Partner Company 4", description: "Environmental sustainability partnerships.", logo: "" },
];

const csrBenefits = [
  { title: "Tax Benefits", description: "CSR contributions qualify for tax deductions under Section 80G and Section 135 of the Companies Act." },
  { title: "Impact Reports", description: "We provide detailed impact reports and documentation for your CSR compliance needs." },
  { title: "Custom Programs", description: "We design tailored programs that align with your company's CSR objectives." },
  { title: "Transparency", description: "Complete financial transparency with audited reports and real-time project tracking." },
];

const CSR = () => (
  <Layout>
    <PageHero title="CSR Partnerships" subtitle="Partner with us to create lasting social impact while fulfilling your CSR commitments" />

    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <SectionHeading title="Why Partner With Us" subtitle="We make CSR simple, impactful, and transparent" />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {csrBenefits.map((b, i) => (
            <Card key={i} className="card-hover text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Handshake className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{b.title}</h3>
                <p className="text-sm text-muted-foreground">{b.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <SectionHeading title="Our CSR Partners" subtitle="Companies making a difference with us" />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {partners.map((p, i) => (
            <Card key={i} className="card-hover text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <Building2 className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{p.name}</h3>
                <p className="text-sm text-muted-foreground">{p.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20 bg-foreground text-background">
      <div className="container mx-auto px-4 text-center max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Interested in a CSR Partnership?</h2>
        <p className="text-xl text-background/70 mb-8">Let's discuss how we can align your CSR goals with meaningful community impact.</p>
        <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
          <Link to="/contact">Get in Touch <ArrowRight className="ml-2 w-4 h-4" /></Link>
        </Button>
      </div>
    </section>
  </Layout>
);

export default CSR;
