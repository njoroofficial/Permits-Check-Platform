import { BusinessLicenseForm } from "@/components/application/business-license-form";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { getCurrentUser, getPermitTypes } from "@/lib/dal";

export default async function BusinessLicenseApplicationPage() {
  const user = await getCurrentUser();
  const permits = await getPermitTypes();

  return (
    <div className="min-h-screen bg-background">
      {/* The dashboard header */}
      {user ? (
        <DashboardHeader user={user} />
      ) : (
        <div className="p-4 bg-muted">Loading user information...</div>
      )}
      <main className="container mx-auto px-4 py-8">
        {permits ? (
          <BusinessLicenseForm permits={permits} />
        ) : (
          <div className="p-4 bg-muted">Loading permit information...</div>
        )}
      </main>
    </div>
  );
}
