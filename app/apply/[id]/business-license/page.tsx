import { BusinessLicenseForm } from "@/components/application/business-license-form";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { getCurrentUser, getPermitTypeById, getPermitTypes } from "@/lib/dal";
import { notFound } from "next/navigation";

export default async function BusinessLicenseApplicationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getCurrentUser();
  const permit = await getPermitTypeById(id);

  if (!permit) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      {/* The dashboard header */}
      {user ? (
        <DashboardHeader user={user} />
      ) : (
        <div className="p-4 bg-muted">Loading current user information...</div>
      )}
      <main className="container mx-auto px-4 py-8">
        <BusinessLicenseForm permit={permit} />
      </main>
    </div>
  );
}
