import { BusinessLicenseForm } from "@/components/application/business-license-form";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { getCurrentUser } from "@/lib/dal";
import { useRouter } from "next/router";

export default async function BusinessLicenseApplicationPage() {
  const router = useRouter();
  // Fetch the current user data when component mounts
  const user = await getCurrentUser();

  const handleSubmit = (applicationData: any) => {
    // Mock submission - replace with real API call
    console.log("Submitting application:", applicationData);

    // Simulate API call
    setTimeout(() => {
      alert(
        "Application submitted successfully! You will receive a confirmation email shortly."
      );
      router.push("/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* The dashboard header */}
      {user ? (
        <DashboardHeader user={user} />
      ) : (
        <div className="p-4 bg-muted">Loading user information...</div>
      )}
      <main className="container mx-auto px-4 py-8">
        <BusinessLicenseForm onSubmit={handleSubmit} />
      </main>
    </div>
  );
}
