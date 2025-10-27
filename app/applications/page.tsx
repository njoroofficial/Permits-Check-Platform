import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { getCurrentUser } from "@/lib/dal";

export default async function ApplicationsPage() {
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
        <div>
          <h1 className="text-3xl font-bold">My Application</h1>
          <p className="text-muted-foreground">
            View and manage your permit application
          </p>
        </div>
      </main>
    </div>
  );
}
