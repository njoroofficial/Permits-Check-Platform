import { redirect } from "next/navigation";
import { getCurrentUser, getApplicationsByUserId } from "@/lib/dal";
import { ApplicationsList } from "@/components/application/applications-list";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircleIcon, FileSearchIcon } from "lucide-react";

export default async function ApplicationsPage() {
  // Get current user
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch user's applications with permit type (already serialized in dal.ts)
  let applications;
  let error = null;

  try {
    applications = await getApplicationsByUserId(user.id);
  } catch (err) {
    console.error("Error fetching applications:", err);
    error = "Failed to load applications. Please try again later.";
  }

  // Error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <FileSearchIcon className="size-16 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-semibold mb-2">
            Unable to Load Applications
          </h2>
          <p className="text-muted-foreground mb-6 max-w-md">{error}</p>
          <Button asChild>
            <Link href="/dashboard">Return to Dashboard</Link>
          </Button>
        </div>
      </div>
    );
  }

  // Empty state
  if (!applications || applications.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              My Applications
            </h1>
            <p className="text-muted-foreground mt-2">
              Track and manage your permit applications
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed rounded-lg">
          <FileSearchIcon className="size-16 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-semibold mb-2">No Applications Yet</h2>
          <p className="text-muted-foreground mb-6 max-w-md">
            You haven't submitted any permit applications. Start your first
            application to get started.
          </p>
          <Button asChild size="lg">
            <Link href="/apply">
              <PlusCircleIcon className="mr-2 size-5" />
              Start New Application
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  // Main content with applications
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Applications</h1>
          <p className="text-muted-foreground mt-2">
            You have {applications.length}{" "}
            {applications.length === 1 ? "application" : "applications"}
          </p>
        </div>
        <Button asChild>
          <Link href="/apply">
            <PlusCircleIcon className="mr-2 size-4" />
            New Application
          </Link>
        </Button>
      </div>

      <ApplicationsList applications={applications} />
    </div>
  );
}
