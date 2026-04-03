import { useSearchParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const DonationSuccess = () => {
  const [params] = useSearchParams();
  const txn = params.get("txn") || "N/A";
  const campaignId = params.get("campaign");

  return (
    <Layout>
      <section className="min-h-[60vh] flex items-center justify-center px-4 py-16">
        <Card className="max-w-md w-full text-center">
          <CardContent className="p-8 space-y-6">
            <div className="flex justify-center">
              <CheckCircle className="h-16 w-16 text-accent" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Thank You!</h1>
            <p className="text-muted-foreground">
              Your generous donation has been received successfully. Together we create impact.
            </p>
            <div className="bg-muted rounded-lg p-4">
              <p className="text-sm text-muted-foreground">Transaction ID</p>
              <p className="font-mono font-semibold text-foreground">{txn}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              {campaignId && (
                <Button asChild variant="outline">
                  <Link to="/campaigns">Back to Campaigns</Link>
                </Button>
              )}
              <Button asChild>
                <Link to="/dashboard">Go to Dashboard</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </Layout>
  );
};

export default DonationSuccess;
