import { Link } from "react-router-dom";
import { FileText, Download, Shield, Eye, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";

const documents = [
  {
    title: "Certificate of Incorporation",
    description: "Section-8 Company Registration Certificate",
    type: "PDF",
    size: "1.2 MB",
  },
  {
    title: "Memorandum of Association (MOA)",
    description: "Foundation's objectives and scope",
    type: "PDF",
    size: "2.5 MB",
  },
  {
    title: "Articles of Association (AOA)",
    description: "Rules governing the organization",
    type: "PDF",
    size: "1.8 MB",
  },
  {
    title: "80G Certificate",
    description: "Tax exemption certificate for donors",
    type: "PDF",
    size: "0.8 MB",
  },
  {
    title: "12A Registration",
    description: "Income tax exemption registration",
    type: "PDF",
    size: "0.6 MB",
  },
  {
    title: "Annual Report 2023-24",
    description: "Yearly activities and financial summary",
    type: "PDF",
    size: "5.2 MB",
  },
];

const Transparency = () => {
  return (
    <Layout>
      <PageHero
        title="Transparency"
        subtitle="We believe in complete transparency and accountability in all our operations."
      />

      {/* Our Commitment */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                <Shield className="w-10 h-10 text-accent" />
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Our Commitment to Transparency
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                At YUVANEXT Foundation, we believe that transparency is the foundation 
                of trust. We are committed to maintaining the highest standards of 
                accountability in all our operations, finances, and programs.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Eye,
                  title: "Open Books",
                  description: "All financial records are available for review by stakeholders and donors.",
                },
                {
                  icon: FileText,
                  title: "Regular Reporting",
                  description: "We publish quarterly updates and annual reports on our activities and impact.",
                },
                {
                  icon: Shield,
                  title: "Audit Compliance",
                  description: "Our accounts are audited annually by certified chartered accountants.",
                },
              ].map((item, index) => (
                <div key={index} className="text-center p-6">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Documents */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Legal Documents & Certifications"
            subtitle="Download and verify our official registrations and certifications."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {documents.map((doc, index) => (
              <Card key={index} className="card-hover">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <FileText className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                      {doc.type} • {doc.size}
                    </span>
                  </div>
                  <CardTitle className="text-lg mt-4">{doc.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {doc.description}
                  </p>
                  <Button variant="outline" size="sm" className="w-full" disabled>
                    <Download className="w-4 h-4 mr-2" />
                    Download (Coming Soon)
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Financial Overview */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">
              Fund Utilization
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-8 bg-muted/30 rounded-2xl">
                <h3 className="text-xl font-semibold text-foreground mb-6">
                  Where Your Money Goes
                </h3>
                <div className="space-y-4">
                  {[
                    { label: "Programs & Activities", percentage: 75 },
                    { label: "Administration", percentage: 15 },
                    { label: "Fundraising", percentage: 5 },
                    { label: "Reserve Fund", percentage: 5 },
                  ].map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-foreground">{item.label}</span>
                        <span className="text-muted-foreground">{item.percentage}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            index === 0 ? "bg-primary" : index === 1 ? "bg-accent" : "bg-muted-foreground/30"
                          }`}
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-8 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl">
                <h3 className="text-xl font-semibold text-foreground mb-6">
                  Our Promise
                </h3>
                <ul className="space-y-4">
                  {[
                    "At least 75% of funds directly support programs",
                    "Regular financial audits by independent auditors",
                    "Detailed expense reports available on request",
                    "Zero tolerance for misuse of funds",
                    "Donor-specific utilization reports",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Governance */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Governance Structure
            </h2>
            <p className="text-lg text-muted-foreground mb-12">
              YUVANEXT Foundation is governed by a Board of Directors comprising 
              experienced professionals committed to our mission. The board meets 
              quarterly to review operations and ensure compliance.
            </p>
            <Button asChild variant="outline" size="lg">
              <Link to="/about">
                Learn About Our Team
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact for Verification */}
      <section className="py-20 bg-foreground text-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Need More Information?
            </h2>
            <p className="text-xl text-background/70 mb-8">
              We're happy to provide any additional documents or answer questions 
              about our operations and finances.
            </p>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link to="/contact">
                Contact Us
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Transparency;
