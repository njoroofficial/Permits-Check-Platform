"use client";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";

export default function PaymentPage({
  applicationId,
}: {
  applicationId: string;
}) {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">
            {paymentCompleted ? "Payment Confirmation" : "Complete Payment"}
          </h1>
          <p className="text-muted-foreground">
            {paymentCompleted
              ? "Your payment has been processed successfully"
              : `Pay the application fee for ${mockApplication.type}`}
          </p>
        </div>

        {paymentCompleted ? (
          <PaymentSuccess paymentData={paymentData} />
        ) : (
          <PaymentMethodSelector
            amount={mockApplication.fee}
            applicationId={applicationId}
            onPaymentComplete={handlePaymentComplete}
          />
        )}
      </main>
    </div>
  );
}
