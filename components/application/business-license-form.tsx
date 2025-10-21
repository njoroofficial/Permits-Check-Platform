"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ApplicationStepper } from "./application-stepper";
import { DocumentUpload } from "./document-upload";
import { Building } from "lucide-react";
import { useRouter } from "next/navigation";

interface BusinessLicenseFormProps {
  onSubmit: (data: any) => void;
}

const steps = [
  { title: "Business Info", description: "Basic details" },
  { title: "Documents", description: "Upload files" },
  { title: "Review", description: "Confirm & submit" },
];

const requiredDocuments = [
  "National ID Copy",
  "Business Registration Certificate",
  "Tax Compliance Certificate",
  "Location Map/GPS Coordinates",
];

export function BusinessLicenseForm({ onSubmit }: BusinessLicenseFormProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    businessName: "",
    businessType: "",
    idNumber: "",
    phoneNumber: "",
    physicalAddress: "",
  });
  const [documents, setDocuments] = useState<any[]>([]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    const applicationData = {
      ...formData,
      documents,
      applicationType: "Business License",
      fee: "KES 2,500",
    };

    // Generate application ID
    const applicationId = `APP-${Date.now()}`;

    // Mock submission - replace with real API call
    console.log("Submitting application:", applicationData);

    // Redirect to payment page
    router.push(`/payment/${applicationId}`);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return (
          formData.businessName && formData.businessType && formData.idNumber
        );
      case 1:
        return documents.length === requiredDocuments.length;
      default:
        return true;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <Building className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Business License Application</h1>
            <p className="text-muted-foreground">
              Apply for a business operating license
            </p>
          </div>
        </div>
        <ApplicationStepper steps={steps} currentStep={currentStep} />
      </div>

      {currentStep === 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Business Information</CardTitle>
            <CardDescription>
              Provide details about your business
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name *</Label>
                <Input
                  id="businessName"
                  value={formData.businessName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      businessName: e.target.value,
                    }))
                  }
                  placeholder="Enter business name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessType">Business Type *</Label>
                <Select
                  value={formData.businessType}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, businessType: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select business type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="restaurant">
                      Restaurant/Food Service
                    </SelectItem>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="services">
                      Professional Services
                    </SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      phoneNumber: e.target.value,
                    }))
                  }
                  placeholder="+254 700 000 000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="idNumber">National ID Number *</Label>
                <Input
                  id="idNumber"
                  value={formData.idNumber}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      idNumber: e.target.value,
                    }))
                  }
                  placeholder="Enter ID number"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="physicalAddress">Business Physical Address</Label>
              <Textarea
                id="physicalAddress"
                value={formData.physicalAddress}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    physicalAddress: e.target.value,
                  }))
                }
                placeholder="Enter complete physical address"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {currentStep === 1 && (
        <DocumentUpload
          requiredDocuments={requiredDocuments}
          onDocumentsChange={setDocuments}
        />
      )}

      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Review Application</CardTitle>
            <CardDescription>
              Please review your information before proceeding to payment
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold mb-3">Business Information</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Business Name:</strong> {formData.businessName}
                </div>
                <div>
                  <strong>Business Type:</strong> {formData.businessType}
                </div>

                <div>
                  <strong>ID Number:</strong> {formData.idNumber}
                </div>
                <div>
                  <strong>Phone:</strong> {formData.phoneNumber}
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Documents Uploaded</h3>
              <div className="space-y-2">
                {documents.map((doc, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    {doc.name}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-primary/5 rounded-lg border">
              <h3 className="font-semibold mb-2">Application Fee</h3>
              <p className="text-2xl font-bold text-primary">KES 2,500</p>
              <p className="text-sm text-muted-foreground">
                Processing time: 5-7 business days
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                You will be redirected to payment after submitting this
                application
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 0}
        >
          Previous
        </Button>

        {currentStep === steps.length - 1 ? (
          <Button onClick={handleSubmit} disabled={!isStepValid()}>
            Proceed to Payment
          </Button>
        ) : (
          <Button onClick={handleNext} disabled={!isStepValid()}>
            Next
          </Button>
        )}
      </div>
    </div>
  );
}
