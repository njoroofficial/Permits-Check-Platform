"use client";

import { useState, useEffect } from "react";
import { PaymentMethodSelector } from "@/components/payment/payment-method-selector";
import { PaymentSuccess } from "@/components/payment/payment-success";

interface PaymentPageClientProps {
  applicationDetails: any;
  permit: any;
  applicationId: string;
}

export function PaymentPageClient({
  applicationDetails,
  permit,
  applicationId,
}: PaymentPageClientProps) {
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [paymentData, setPaymentData] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    console.log("PaymentPageClient Mounted!");
    console.log("PaymentPageClient Props:", {
      applicationId,
      permitFee: permit?.fee,
      businessType: applicationDetails?.businessType,
      hasPermit: !!permit,
      hasApplicationDetails: !!applicationDetails,
    });
  }, [applicationId, permit, applicationDetails]);

  const handlePaymentComplete = (data: any) => {
    setPaymentData(data);
    setPaymentCompleted(true);
  };

  if (!mounted) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="text-center">Loading payment page...</div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">
          {paymentCompleted ? "Payment Confirmation" : "Complete Payment"}
        </h1>
        <p className="text-muted-foreground">
          {paymentCompleted
            ? "Your payment has been processed successfully"
            : `Pay the application fee for ${
                applicationDetails?.businessType || "your application"
              }`}
        </p>
      </div>

      {/* Debug Info - Remove after testing */}
      {!paymentCompleted && (
        <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded text-sm">
          <p>
            <strong>Debug Info:</strong>
          </p>
          <p>Permit Fee: {permit?.fee || "Not loaded"}</p>
          <p>Application ID: {applicationId || "Not loaded"}</p>
          <p>
            Business Type: {applicationDetails?.businessType || "Not loaded"}
          </p>
          <p>Component Mounted: {mounted ? "Yes" : "No"}</p>
        </div>
      )}

      {paymentCompleted ? (
        <PaymentSuccess paymentData={paymentData} />
      ) : (
        <PaymentMethodSelector
          amount={permit?.fee || "KES 0"}
          applicationId={applicationId}
          onPaymentComplete={handlePaymentComplete}
        />
      )}
    </main>
  );
}
