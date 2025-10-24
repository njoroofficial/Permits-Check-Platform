export default function PaymentPage({
  applicationId,
}: {
  applicationId: string;
}) {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Payment Page</h1>
      <p>
        Proceed to payment for your application ID:{" "}
        <span className="font-mono">{applicationId}</span>
      </p>
      {/* Payment processing components would go here */}
    </div>
  );
}
