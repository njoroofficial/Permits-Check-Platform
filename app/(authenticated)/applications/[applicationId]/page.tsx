"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ApplicationDetails } from "@/components/application/application-details";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, AlertCircle, Loader2 } from "lucide-react";
import { ApplicationDocuments } from "@/components/application/application-documents";
import { ApplicationTimeline } from "@/components/application/application-timeline";

interface Application {
  id: string;
  type: string;
  status: "pending" | "under-review" | "approved" | "rejected";
  submittedDate: string;
  fee: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  description: string;
  documents: Array<{
    id: string;
    name: string;
    uploadedDate: string;
    size: string;
  }>;
  timeline: Array<{
    id: string;
    status: string;
    date: string;
    description: string;
  }>;
  notes?: string;
}

export default function ApplicationsPage() {
  const params = useParams();
  const router = useRouter();

  const applicationId = params.applicationId as string;

  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        setLoading(true);
        setError(null);

        // Mock data - replace with real API call
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Mock application data
        const mockApplications: Record<string, Application> = {
          "1": {
            id: "1",
            type: "Business License",
            status: "approved",
            submittedDate: "2024-01-15",
            fee: "KES 2,500",
            applicantName: "John Citizen",
            applicantEmail: "john@example.com",
            applicantPhone: "+254 700 123 456",
            description: "Application for business license for retail shop",
            documents: [
              {
                id: "doc1",
                name: "National ID Copy",
                uploadedDate: "2024-01-15",
                size: "2.5 MB",
              },
              {
                id: "doc2",
                name: "Business Plan",
                uploadedDate: "2024-01-15",
                size: "1.8 MB",
              },
              {
                id: "doc3",
                name: "Lease Agreement",
                uploadedDate: "2024-01-15",
                size: "3.2 MB",
              },
            ],
            timeline: [
              {
                id: "t1",
                status: "Submitted",
                date: "2024-01-15",
                description: "Application submitted successfully",
              },
              {
                id: "t2",
                status: "Under Review",
                date: "2024-01-16",
                description: "Application is being reviewed by county officer",
              },
              {
                id: "t3",
                status: "Approved",
                date: "2024-01-18",
                description:
                  "Application approved. License is ready for collection.",
              },
            ],
            notes:
              "Please collect your license from the county office during business hours.",
          },
          "2": {
            id: "2",
            type: "Building Permit",
            status: "under-review",
            submittedDate: "2024-01-20",
            fee: "KES 5,000",
            applicantName: "John Citizen",
            applicantEmail: "john@example.com",
            applicantPhone: "+254 700 123 456",
            description:
              "Application for building permit for residential construction",
            documents: [
              {
                id: "doc1",
                name: "Architectural Plans",
                uploadedDate: "2024-01-20",
                size: "5.1 MB",
              },
              {
                id: "doc2",
                name: "Land Title Deed",
                uploadedDate: "2024-01-20",
                size: "2.8 MB",
              },
              {
                id: "doc3",
                name: "Environmental Impact Assessment",
                uploadedDate: "2024-01-20",
                size: "4.5 MB",
              },
            ],
            timeline: [
              {
                id: "t1",
                status: "Submitted",
                date: "2024-01-20",
                description: "Application submitted successfully",
              },
              {
                id: "t2",
                status: "Under Review",
                date: "2024-01-21",
                description: "Application is being reviewed by county officer",
              },
            ],
          },
        };

        const foundApplication = mockApplications[applicationId];

        if (!foundApplication) {
          setError(
            `Application with ID "${applicationId}" not found. Please check the URL and try again.`
          );
          setApplication(null);
        } else {
          setApplication(foundApplication);
        }
      } catch (err) {
        console.error("[v0] Error fetching application:", err);
        setError("Failed to load application details. Please try again later.");
        setApplication(null);
      } finally {
        setLoading(false);
      }
    };

    if (applicationId) {
      fetchApplication();
    }
  }, [applicationId]);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.back()}
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
        <div>
          <h1 className="text-3xl font-bold">My Application</h1>
          <p className="text-muted-foreground">
            View and manage your permit application
          </p>
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">
              Loading application details...
            </p>
          </div>
        </div>
      )}

      {error && !loading && (
        <div className="space-y-4">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>

          <Card>
            <CardHeader>
              <CardTitle>Troubleshooting Guide</CardTitle>
              <CardDescription>
                If you're experiencing issues viewing your application, try
                these steps:
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold">Common Issues & Solutions:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">1.</span>
                    <span>
                      <strong>Application ID not found:</strong> Verify the URL
                      is correct. The application ID should be a number (e.g.,
                      /applications/1)
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">2.</span>
                    <span>
                      <strong>Page not loading:</strong> Clear your browser
                      cache and refresh the page. Check your internet
                      connection.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">3.</span>
                    <span>
                      <strong>Console errors:</strong> Open browser DevTools
                      (F12) and check the Console tab for error messages.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">4.</span>
                    <span>
                      <strong>Access denied:</strong> Ensure you're logged in
                      with the correct account that submitted the application.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">5.</span>
                    <span>
                      <strong>Missing components:</strong> If parts of the page
                      are blank, try refreshing or switching browsers.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="space-y-2 pt-4 border-t">
                <h4 className="font-semibold">Need More Help?</h4>
                <p className="text-sm text-muted-foreground">
                  Contact our support team at permits@muranga.go.ke or call +254
                  700 123 456
                </p>
              </div>
            </CardContent>
          </Card>

          <Button onClick={() => router.push("/dashboard")} className="w-full">
            Return to Dashboard
          </Button>
        </div>
      )}

      {/* applications cards */}
      {!loading && application && (
        <div className="space-y-8">
          {/* Application Header Card */}
          <ApplicationDetails application={application} />

          {/* Timeline and Documents Grid */}
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <ApplicationTimeline timeline={application.timeline} />
            </div>
            <div>
              <ApplicationDocuments documents={application.documents} />
            </div>
          </div>

          {/* Notes Section */}
          {application.notes && (
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="text-lg">Important Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {application.notes}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 flex-wrap">
            {application.status === "approved" && (
              <Button className="gap-2">Download License</Button>
            )}
            {application.status === "pending" ||
            application.status === "under-review" ? (
              <Button variant="outline" className="gap-2 bg-transparent">
                Update Application
              </Button>
            ) : null}
            <Button variant="outline" onClick={() => router.push("/dashboard")}>
              Back to Dashboard
            </Button>
          </div>
        </div>
      )}

      {!loading && !application && !error && (
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground mb-4">
              No application data available
            </p>
            <Button onClick={() => router.push("/dashboard")}>
              Return to Dashboard
            </Button>
          </CardContent>
        </Card>
      )}
    </main>
  );
}
