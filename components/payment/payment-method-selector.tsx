"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard, Smartphone, Building } from "lucide-react";

// Import PaymentData from payment-page-client
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

interface PaymentMethodSelectorProps {
  amount: string;
  applicationId: string;
  onPaymentComplete: (paymentData: PaymentData) => void;
}

export function PaymentMethodSelector({
  amount,
  applicationId,
  onPaymentComplete,
}: PaymentMethodSelectorProps) {
  const [selectedMethod, setSelectedMethod] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const paymentMethods = [
    {
      id: "mpesa",
      name: "M-Pesa",
      description: "Pay using your M-Pesa mobile money",
      icon: Smartphone,
      popular: true,
    },
    {
      id: "card",
      name: "Credit/Debit Card",
      description: "Pay using Visa, Mastercard, or local cards",
      icon: CreditCard,
      popular: false,
    },
    {
      id: "bank",
      name: "Bank Transfer",
      description: "Direct bank transfer or mobile banking",
      icon: Building,
      popular: false,
    },
  ];

  const handlePayment = async () => {
    setIsProcessing(true);

    // Mock payment processing
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const paymentData = {
      method: selectedMethod,
      amount,
      applicationId,
      transactionId: `TXN-${Date.now()}`,
      status: "completed",
      timestamp: new Date().toISOString(),
      ...(selectedMethod === "mpesa" && { phoneNumber }),
      ...(selectedMethod === "card" && {
        cardLast4: cardDetails.number.slice(-4),
      }),
    };

    setIsProcessing(false);
    onPaymentComplete(paymentData);
  };

  const isFormValid = () => {
    if (!selectedMethod) return false;
    if (selectedMethod === "mpesa") return phoneNumber.length >= 10;
    if (selectedMethod === "card") {
      return (
        cardDetails.number &&
        cardDetails.expiry &&
        cardDetails.cvv &&
        cardDetails.name
      );
    }
    return true;
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Payment Details
          </CardTitle>
          <CardDescription>
            Complete your payment to submit the application
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 p-4 bg-primary/5 rounded-lg border">
            <div className="flex justify-between items-center">
              <span className="font-medium">Application Fee:</span>
              <span className="text-2xl font-bold text-primary">{amount}</span>
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              Application ID: {applicationId}
            </div>
          </div>

          <div className="space-y-4">
            <Label className="text-base font-medium">
              Select Payment Method
            </Label>
            <RadioGroup
              value={selectedMethod}
              onValueChange={setSelectedMethod}
            >
              {paymentMethods.map((method) => (
                <div key={method.id} className="flex items-center space-x-3">
                  <RadioGroupItem value={method.id} id={method.id} />
                  <Label htmlFor={method.id} className="flex-1 cursor-pointer">
                    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <method.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{method.name}</span>
                            {method.popular && (
                              <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                                Popular
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {method.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* M-Pesa Form */}
          {selectedMethod === "mpesa" && (
            <div className="mt-6 space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-medium text-green-800 mb-2">
                  M-Pesa Payment Instructions
                </h4>
                <ol className="text-sm text-green-700 space-y-1">
                  <li>1. Enter your M-Pesa registered phone number</li>
                  <li>2. You will receive an STK push notification</li>
                  <li>3. Enter your M-Pesa PIN to complete payment</li>
                </ol>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">M-Pesa Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="0700 000 000"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Card Form */}
          {selectedMethod === "card" && (
            <div className="mt-6 space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cardName">Cardholder Name</Label>
                  <Input
                    id="cardName"
                    placeholder="John Doe"
                    value={cardDetails.name}
                    onChange={(e) =>
                      setCardDetails((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={cardDetails.number}
                    onChange={(e) =>
                      setCardDetails((prev) => ({
                        ...prev,
                        number: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input
                      id="expiry"
                      placeholder="MM/YY"
                      value={cardDetails.expiry}
                      onChange={(e) =>
                        setCardDetails((prev) => ({
                          ...prev,
                          expiry: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      placeholder="123"
                      value={cardDetails.cvv}
                      onChange={(e) =>
                        setCardDetails((prev) => ({
                          ...prev,
                          cvv: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bank Transfer */}
          {selectedMethod === "bank" && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">
                Bank Transfer Details
              </h4>
              <div className="text-sm text-blue-700 space-y-1">
                <p>
                  <strong>Account Name:</strong> Murang'a County Government
                </p>
                <p>
                  <strong>Account Number:</strong> 1234567890
                </p>
                <p>
                  <strong>Bank:</strong> Kenya Commercial Bank
                </p>
                <p>
                  <strong>Reference:</strong> {applicationId}
                </p>
              </div>
              <p className="text-xs text-blue-600 mt-2">
                Please use the application ID as your payment reference and
                upload the payment receipt.
              </p>
            </div>
          )}

          <Button
            className="w-full mt-6"
            onClick={handlePayment}
            disabled={!isFormValid() || isProcessing}
            size="lg"
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Processing Payment...
              </>
            ) : (
              <>Pay {amount}</>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
