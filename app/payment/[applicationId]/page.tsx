"use client";

import { useState, useEffect } from "react";
import { PaymentMethodSelector } from "@/components/payment/payment-method-selector";
import { PaymentSuccess } from "@/components/payment/payment-success";
import {
  getApplicationDetails,
  getCurrentUser,
  getPermitTypeById,
} from "@/lib/dal";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";

export default function PaymentPage({
  params,
}: {
  params: { applicationId: string };
}) {
  const { applicationId } = params;

  const [user, setUser] = useState<any>(null);
  const [applicationDetails, setApplicationDetails] = useState<any>(null);
  const [permit, setPermit] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [paymentData, setPaymentData] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const currentUser = await getCurrentUser();
      setUser(currentUser);

      const appDetails = await getApplicationDetails(applicationId);
      setApplicationDetails(appDetails);

      if (appDetails?.permitTypeId) {
        const permitType = await getPermitTypeById(appDetails.permitTypeId);
        setPermit(permitType);
      }
      setLoading(false);
    }
    fetchData();
  }, [applicationId]);

  const handlePaymentComplete = (data: any) => {
    setPaymentData(data);
    setPaymentCompleted(true);
  };

  if (loading) {
    return <div className="p-4 bg-muted">Loading information...</div>;
  }

  if (!user) {
    return <div className="p-4 bg-muted">User not found.</div>;
  }

  if (!applicationDetails) {
    return <div className="p-4 bg-muted">Application not found.</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader user={user} />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">
            {paymentCompleted ? "Payment Confirmation" : "Complete Payment"}
          </h1>
          <p className="text-muted-foreground">
            {paymentCompleted
              ? "Your payment has been processed successfully"
              : `Pay the application fee for ${applicationDetails?.businessType}`}
          </p>
        </div>

        {paymentCompleted ? (
          <PaymentSuccess paymentData={paymentData} />
        ) : (
          <PaymentMethodSelector
            amount={permit?.fee}
            applicationId={applicationId}
            onPaymentComplete={handlePaymentComplete}
          />
        )}
      </main>
    </div>
  );
}
