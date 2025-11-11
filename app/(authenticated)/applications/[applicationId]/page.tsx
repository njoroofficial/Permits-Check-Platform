import { redirect, notFound } from "next/navigation";
import { getCurrentUser, getApplicationByNumber } from "@/lib/dal";
import { ApplicationDetails } from "@/components/application/application-details";
import { ApplicationDocuments } from "@/components/application/application-documents";
import { ApplicationTimeline } from "@/components/application/application-timeline";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, AlertCircle } from "lucide-react";
import Link from "next/link";

interface ApplicationPageProps {
  params: Promise<{
    applicationId: string;
  }>;
}

export default async function ApplicationPage({
  params,
}: ApplicationPageProps) {
  // Get current user
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  // Await params (Next.js 15+)
  const { applicationId } = await params;

  // Fetch application data
  const application = await getApplicationByNumber(applicationId);

  // Handle not found
  if (!application) {
    notFound();
  }

  // Verify user owns this application
  if (application.userId !== user.id) {
    return (
      <main className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            You don't have permission to view this application.
          </AlertDescription>
        </Alert>
        <div className="mt-4">
          <Button asChild>
            <Link href="/applications">Back to My Applications</Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center gap-4">
        <Button variant="outline" size="sm" asChild className="gap-2">
          <Link href="/applications">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Application Details</h1>
          <p className="text-muted-foreground">
            View and manage your permit application
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Application Header Card */}
        <ApplicationDetails application={application} user={user} />

        {/* Timeline and Documents Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ApplicationTimeline timeline={application.statusHistory} />
          </div>
          <div>
            <ApplicationDocuments documents={application.documents} />
          </div>
        </div>

        {/* Officer Assignment */}
        {application.assignedOfficer && (
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="text-lg">Assigned Officer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <p className="font-medium">
                  {application.assignedOfficer.firstName}{" "}
                  {application.assignedOfficer.lastName}
                </p>
                <p className="text-sm text-muted-foreground">
                  {application.assignedOfficer.email}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4 flex-wrap">
          {application.status === "APPROVED" && (
            <Button className="gap-2">Download Permit</Button>
          )}
          {application.status === "PAYMENT_PENDING" && (
            <Button asChild>
              <Link href={`/payment/${application.applicationNumber}`}>
                Proceed to Payment
              </Link>
            </Button>
          )}
          {(application.status === "DRAFT" ||
            application.status === "SUBMITTED") && (
            <Button variant="outline" className="gap-2 bg-transparent">
              Update Application
            </Button>
          )}
          <Button variant="outline" asChild>
            <Link href="/dashboard">Back to Dashboard</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
