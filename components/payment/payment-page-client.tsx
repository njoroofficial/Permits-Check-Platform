"use client";

import { useState } from "react";
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

  const handlePaymentComplete = (data: any) => {
    setPaymentData(data);
    setPaymentCompleted(true);
  };

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
  );
}
