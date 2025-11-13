import { redirect, notFound } from "next/navigation";
import { getCurrentUser, getPermitTypeById } from "@/lib/dal";
import { prisma } from "@/lib/db";
import { PaymentPageClient } from "@/components/payment/payment-page-client";
import { Suspense } from "react";

interface PaymentPageProps {
  params: Promise<{ applicationId: string }>;
}

async function PaymentContent({
  paramsPromise,
}: {
  paramsPromise: Promise<{ applicationId: string }>;
}) {
  const { applicationId } = await paramsPromise;

  // Get current user (already validated in layout, but needed for ownership check)
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch application details
  let applicationDetails;
  try {
    applicationDetails = await prisma.application.findUnique({
      where: { applicationNumber: applicationId },
      include: {
        permitType: true,
      },
    });
  } catch (error) {
    console.error("Error fetching application details:", error);
    throw new Error(
      "Failed to load application details. Please try again later."
    );
  }

  if (!applicationDetails) {
    notFound();
  }

  // Verify user owns this application
  if (applicationDetails.userId !== user.id) {
    redirect("/dashboard");
  }

  // Fetch permit type
  let permit;
  try {
    permit = await getPermitTypeById(applicationDetails.permitTypeId);
  } catch (error) {
    console.error("Error fetching permit type:", error);
    throw new Error("Failed to load permit details. Please try again later.");
  }

  if (!permit) {
    notFound();
  }

  // Format permit fee for display
  const formattedPermit = {
    id: permit.id,
    name: permit.name,
    description: permit.description,
    fee: `KES ${parseFloat(permit.fee.toString()).toLocaleString()}`,
  };

  // Serialize application details for client component
  const serializedApplicationDetails = {
    id: applicationDetails.id,
    applicationNumber: applicationDetails.applicationNumber,
    businessName: applicationDetails.businessName,
    businessType: applicationDetails.businessType,
    businessAddress: applicationDetails.businessAddress,
    status: applicationDetails.status,
    permitType: {
      name: applicationDetails.permitType.name,
      fee: applicationDetails.permitType.fee.toString(),
    },
  };

  return (
    <PaymentPageClient
      applicationDetails={serializedApplicationDetails}
      permit={formattedPermit}
      applicationId={applicationId}
    />
  );
}

export default function PaymentPage({ params }: PaymentPageProps) {
  return (
    <Suspense
      fallback={
        <main className="container mx-auto px-4 py-8">
          <div className="mb-8 text-center">
            <div className="h-10 w-64 bg-muted animate-pulse rounded mx-auto mb-2" />
            <div className="h-5 w-96 bg-muted animate-pulse rounded mx-auto" />
          </div>
          <div className="max-w-2xl mx-auto">
            <div className="h-96 bg-muted animate-pulse rounded" />
          </div>
        </main>
      }
    >
      <PaymentContent paramsPromise={params} />
    </Suspense>
  );
}
