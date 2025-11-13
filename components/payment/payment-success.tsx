import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Download, ArrowRight } from "lucide-react";
import Link from "next/link";

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

interface PaymentSuccessProps {
  paymentData: PaymentData;
}

export function PaymentSuccess({ paymentData }: PaymentSuccessProps) {
  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString("en-KE", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getPaymentMethodName = (method: string) => {
    switch (method) {
      case "mpesa":
        return "M-Pesa";
      case "card":
        return "Credit/Debit Card";
      case "bank":
        return "Bank Transfer";
      default:
        return method;
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl text-green-600">
            Payment Successful!
          </CardTitle>
          <CardDescription>
            Your application has been submitted and payment confirmed
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="font-semibold text-green-800 mb-3">
              Payment Details
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-green-600 font-medium">Amount Paid:</span>
                <p className="font-semibold">{paymentData.amount}</p>
              </div>
              <div>
                <span className="text-green-600 font-medium">
                  Payment Method:
                </span>
                <p className="font-semibold">
                  {getPaymentMethodName(paymentData.method)}
                </p>
              </div>
              <div>
                <span className="text-green-600 font-medium">
                  Transaction ID:
                </span>
                <p className="font-semibold">{paymentData.transactionId}</p>
              </div>
              <div>
                <span className="text-green-600 font-medium">
                  Application ID:
                </span>
                <p className="font-semibold">{paymentData.applicationId}</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-green-200">
              <span className="text-green-600 font-medium">Payment Date:</span>
              <p className="font-semibold">
                {formatDate(paymentData.timestamp)}
              </p>
            </div>
          </div>

          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">
              What happens next?
            </h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Your application is now in the review queue</li>
              <li>• You will receive email updates on the progress</li>
              <li>• Processing typically takes 5-7 business days</li>
              <li>• You can track status from your dashboard</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="outline" className="flex-1 bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              Download Receipt
            </Button>
            <Button className="flex-1" asChild>
              <Link href="/dashboard">
                Go to Dashboard
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            <p>
              Need help? Contact us at{" "}
              <a
                href="mailto:permits@muranga.go.ke"
                className="text-primary hover:underline"
              >
                permits@muranga.go.ke
              </a>{" "}
              or call +254 700 123 456
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
