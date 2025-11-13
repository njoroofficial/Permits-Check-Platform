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
import { Suspense } from "react";

interface ApplicationPageProps {
  params: Promise<{
    applicationId: string;
  }>;
}

async function ApplicationContent({
  paramsPromise,
}: {
  paramsPromise: Promise<{ applicationId: string }>;
}) {
  const { applicationId } = await paramsPromise;

  // Get current user
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch application data
  const application = await getApplicationByNumber(applicationId);

  // Handle not found
  if (!application) {
    notFound();
  }

  // Check if permitType exists (required for ApplicationDetails component)
  if (!application.permitType) {
    return (
      <main className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            This application is missing permit type information. Please contact
            support.
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
        <ApplicationDetails
          application={{
            ...application,
            permitType: {
              name: application.permitType.name,
              fee: application.permitType.fee.toString(),
            },
          }}
          user={user}
        />

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

export default function ApplicationPage({ params }: ApplicationPageProps) {
  return (
    <Suspense
      fallback={
        <main className="container mx-auto px-4 py-8">
          <div className="space-y-8">
            {/* Header Skeleton */}
            <div className="flex items-center gap-4">
              <div className="h-10 w-20 bg-muted animate-pulse rounded" />
              <div>
                <div className="h-9 w-64 bg-muted animate-pulse rounded mb-2" />
                <div className="h-5 w-80 bg-muted animate-pulse rounded" />
              </div>
            </div>
            {/* Content Skeleton */}
            <div className="h-96 bg-muted animate-pulse rounded" />
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2 h-64 bg-muted animate-pulse rounded" />
              <div className="h-64 bg-muted animate-pulse rounded" />
            </div>
          </div>
        </main>
      }
    >
      <ApplicationContent paramsPromise={params} />
    </Suspense>
  );
}
