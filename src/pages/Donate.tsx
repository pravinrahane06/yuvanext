import { Link } from "react-router-dom";
import { Heart, Building, Gift, AlertCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Layout from "@/components/layout/Layout";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";

const donationOptions = [
  { amount: "₹500", label: "Provide books for 5 students" },
  { amount: "₹1,000", label: "Support a health camp" },
  { amount: "₹2,500", label: "Plant 50 trees" },
  { amount: "₹5,000", label: "Train 2 women in skills" },
  { amount: "₹10,000", label: "Sponsor a month of tutoring" },
  { amount: "Custom", label: "Enter your amount" },
];

const Donate = () => {
  return (
    <Layout>
      <PageHero
        title="Support Our Cause"
        subtitle="Your contribution helps us create lasting change in communities across India."
      />

      {/* Coming Soon Notice */}
      <section className="py-8 bg-background">
        <div className="container mx-auto px-4">
          <Alert className="max-w-4xl mx-auto bg-primary/10 border-primary/20">
            <AlertCircle className="h-5 w-5 text-primary" />
            <AlertDescription className="text-foreground">
              <strong>Online Donations Coming Soon!</strong> We are currently setting up 
              our secure payment gateway. In the meantime, please contact us directly 
              for donation inquiries.
            </AlertDescription>
          </Alert>
        </div>
      </section>

      {/* Donation Options */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Make a Difference"
            subtitle="Choose how you'd like to contribute to our mission."
          />

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            {donationOptions.map((option, index) => (
              <Card
                key={index}
                className="card-hover text-center cursor-not-allowed opacity-75"
              >
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {option.amount}
                  </div>
                  <p className="text-sm text-muted-foreground">{option.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button disabled size="lg" className="opacity-75">
              <Heart className="mr-2 w-5 h-5" />
              Donate Now (Coming Soon)
            </Button>
          </div>
        </div>
      </section>

      {/* Ways to Give */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Other Ways to Give"
            subtitle="Explore different ways to support our programs."
          />

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="card-hover">
              <CardHeader>
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Building className="w-7 h-7 text-primary" />
                </div>
                <CardTitle>CSR Partnership</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  Partner with us to fulfill your corporate social responsibility. 
                  We offer customized programs, impact reporting, and employee 
                  engagement opportunities.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                  <li>• Project-based funding</li>
                  <li>• Detailed impact assessment</li>
                  <li>• Tax benefits under 80G</li>
                  <li>• Brand visibility opportunities</li>
                </ul>
                <Button asChild variant="outline">
                  <Link to="/contact">Contact for CSR</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader>
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  <Gift className="w-7 h-7 text-accent" />
                </div>
                <CardTitle>In-Kind Donations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  Contribute materials and resources directly to our programs. 
                  We accept books, stationery, clothes, medical supplies, and more.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                  <li>• Educational materials</li>
                  <li>• Medical equipment</li>
                  <li>• Computer/IT equipment</li>
                  <li>• Sports equipment</li>
                </ul>
                <Button asChild variant="outline">
                  <Link to="/contact">Donate Materials</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Impact of Donations */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">
              Your Impact
            </h2>
            <div className="grid md:grid-cols-4 gap-8 text-center">
              {[
                { number: "₹500", impact: "Provides books and stationery for 5 children" },
                { number: "₹1,000", impact: "Funds one health awareness session" },
                { number: "₹5,000", impact: "Supports vocational training for one woman" },
                { number: "₹10,000", impact: "Plants and maintains 200 saplings" },
              ].map((item, index) => (
                <div key={index} className="p-6 bg-muted/30 rounded-xl">
                  <div className="text-2xl font-bold text-primary mb-3">
                    {item.number}
                  </div>
                  <p className="text-sm text-muted-foreground">{item.impact}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tax Benefits */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Tax Benefits
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              All donations to YUVANEXT Foundation are eligible for tax exemption 
              under Section 80G of the Income Tax Act.
            </p>
            <p className="text-muted-foreground mb-8">
              We will provide you with an official receipt for your contribution 
              that can be used for tax filing purposes.
            </p>
            <Button asChild variant="outline" size="lg">
              <Link to="/transparency">
                View Our Certifications
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-foreground text-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Questions About Donating?
            </h2>
            <p className="text-xl text-background/70 mb-8">
              Our team is here to help you find the best way to contribute.
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

export default Donate;
