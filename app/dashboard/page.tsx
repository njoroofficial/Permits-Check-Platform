import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { RecentApplications } from "@/components/dashboard/recent-applications";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { getCurrentUser } from "@/lib/dal";
import { Suspense } from "react";

// Mock data - handcoded data
const mockStats = {
  total: 3,
  pending: 1,
  approved: 2,
  rejected: 0,
};
const mockApplications = [
  {
    id: "1",
    type: "Business License",
    status: "approved" as const,
    submittedDate: "2024-01-15",
    fee: "KES 2,500",
  },
  {
    id: "2",
    type: "Building Permit",
    status: "under-review" as const,
    submittedDate: "2024-01-20",
    fee: "KES 5,000",
  },
  {
    id: "3",
    type: "Food Handler's Permit",
    status: "approved" as const,
    submittedDate: "2024-01-10",
    fee: "KES 1,000",
  },
];

export default async function DashboardPage() {
  const user = await getCurrentUser();
  return (
    <div className="min-g-screen bg-background">
      {/* The dashboard header */}
      {user ? (
        <DashboardHeader user={user} />
      ) : (
        <div className="p-4 bg-muted">Loading user information...</div>
      )}

      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {`${user?.firstName} ${user?.lastName} `}!
          </h1>
          <p className="text-muted-foreground">
            Manage your permits and licenses from your personal dashboard
          </p>
        </div>

        {/* Stats Cards */}
        <div className="mb-8">
          <StatsCards stats={mockStats} />
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-8 lg:grid-cols-2">
          <RecentApplications applications={mockApplications} />
          <Suspense fallback={<div>Loading...</div>}>
            <QuickActions />
          </Suspense>
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
    </div>
  );
}
