import { RecentApplications } from "@/components/dashboard/recent-applications";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { getCurrentUser, getDashboardData } from "@/lib/dal";
import { connection } from "next/server";
import { Suspense } from "react";
import { redirect } from "next/navigation";

async function WelcomeSection() {
  await connection();
  const user = await getCurrentUser();

  // Guard: Redirect if no user found
  if (!user) {
    redirect("/login");
  }

  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold mb-2">
        Welcome back, {user.firstName} {user.lastName}!
      </h1>
      <p className="text-muted-foreground">
        Manage your permits and licenses from your personal dashboard
      </p>
    </div>
  );
}

export default async function DashboardPage() {
  // Fetch authenticated user
  const user = await getCurrentUser();

  // Guard: Redirect if no user
  if (!user) {
    redirect("/login");
  }

  // Fetch real dashboard data from database
  const dashboardData = await getDashboardData(user.id);

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Welcome Section */}
      <Suspense
        fallback={
          <div className="mb-8">
            <div className="h-10 w-64 bg-muted animate-pulse rounded mb-2" />
            <div className="h-5 w-96 bg-muted animate-pulse rounded" />
          </div>
        }
      >
        <WelcomeSection />
      </Suspense>

      {/* Stats Cards - Using real data */}
      <div className="mb-8">
        <StatsCards stats={dashboardData.stats} />
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Recent Applications - Using real data */}
        <RecentApplications applications={dashboardData.recent} />
        <QuickActions />
      </div>

      {/* Additional Information */}
      <div className="mt-8 p-6 bg-primary/5 rounded-lg border">
        <h3 className="font-semibold mb-2">Need Help?</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Our support team is available Monday to Friday, 8AM to 5PM to assist
          with your applications.
        </p>
        <div className="flex gap-4 text-sm">
          <span>📞 +254 704 125 004</span>
          <span>✉️ permits@muranga.go.ke</span>
        </div>
      </div>
    </main>
  );
}
