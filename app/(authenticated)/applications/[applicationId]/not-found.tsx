import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileSearchIcon } from "lucide-react";
import Link from "next/link";

export default function ApplicationNotFound() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <FileSearchIcon className="size-16 text-muted-foreground mb-4" />
        <h1 className="text-3xl font-bold mb-2">Application Not Found</h1>
        <p className="text-muted-foreground mb-6 max-w-md">
          The application you're looking for doesn't exist or you don't have
          permission to view it.
        </p>

        <Card className="max-w-2xl w-full">
          <CardHeader>
            <CardTitle>Troubleshooting Guide</CardTitle>
            <CardDescription>
              If you're experiencing issues viewing your application, try these
              steps:
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-left">
            <div className="space-y-2">
              <h4 className="font-semibold">Common Issues & Solutions:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2">
                  <span className="text-primary font-bold">1.</span>
                  <span>
                    <strong>Application ID not found:</strong> Verify the URL is
                    correct. The application ID should match the application
                    number (e.g., /applications/APP-12345)
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">2.</span>
                  <span>
                    <strong>Wrong account:</strong> Ensure you're logged in with
                    the correct account that submitted the application.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">3.</span>
                  <span>
                    <strong>Application deleted:</strong> The application may
                    have been removed from the system.
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

        <div className="flex gap-4 mt-6">
          <Button asChild>
            <Link href="/applications">View My Applications</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/dashboard">Back to Dashboard</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
