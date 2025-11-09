import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { getCurrentUser } from "@/lib/dal";
import { redirect } from "next/navigation";

export default async function ApplicationsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-background">
      {/* The dashboard header */}
      <DashboardHeader user={user} />
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
