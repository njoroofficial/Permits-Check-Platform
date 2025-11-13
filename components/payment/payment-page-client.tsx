"use client";

import { useState, useEffect } from "react";
import { PaymentMethodSelector } from "@/components/payment/payment-method-selector";
import { PaymentSuccess } from "@/components/payment/payment-success";

// Payment data interface
export interface PaymentData {
  method: string;
  amount: string;
  applicationId: string;
  transactionId: string;
  status: string;
  timestamp: string;
  phoneNumber?: string;
  cardLast4?: string;
}

// Application details interface
interface ApplicationDetails {
  id: string;
  applicationNumber: string;
  businessName: string | null;
  businessType: string | null;
  businessAddress: string | null;
  status: string;
  permitType: {
    name: string;
    fee: string;
  };
}

// Permit type interface
interface Permit {
  id: string;
  name: string;
  description: string | null;
  fee: string;
}

interface PaymentPageClientProps {
  applicationDetails: ApplicationDetails;
  permit: Permit;
  applicationId: string;
}

export function PaymentPageClient({
  applicationDetails,
  permit,
  applicationId,
}: PaymentPageClientProps) {
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
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

  const handlePaymentComplete = (data: PaymentData) => {
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

      {paymentCompleted && paymentData ? (
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
