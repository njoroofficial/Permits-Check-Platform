"use client";

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
import { Building, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ApplicationStepper } from "./application-stepper";
import { DocumentUpload } from "./document-upload";
import { FormState, submitBusinessLicense } from "@/app/actions/application";

// Defining permit types
interface PermitType {
  fee: string;
  name: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  description: string | null;
}
interface BusinessLicenseFormProps {
  permit: PermitType;
}

// Application steps
const steps = [
  { title: "Business Info", description: "Basic details" },
  { title: "Documents", description: "Upload files" },
  { title: "Review", description: "Confirm & submit" },
];

// Required application documents
const requiredDocuments = [
  "National ID Copy",
  "Business Registration Certificate",
  "Tax Compliance Certificate",
  "Location Map/GPS Coordinates",
];

// Initial state for the form
const initialFormState: FormState = {
  success: false,
  message: "",
  errors: {},
  applicationId: null,
  formData: {},
  documents: [],
};

export function BusinessLicenseForm({ permit }: BusinessLicenseFormProps) {
  const router = useRouter();
  // hook to handle form next state
  const [currentStep, setCurrentStep] = useState(0);
  // hook to set documents
  const [documents, setDocuments] = useState<any[]>([]);

  // Using useActionState for form handling
  const [state, formAction, isPending] = useActionState<FormState, FormData>(
    submitBusinessLicense,
    initialFormState
  );

  // Local form data state for multi-step navigation
  const [formData, setFormData] = useState({
    businessName: "",
    businessType: "",
    idNumber: "",
    phoneNumber: "",
    physicalAddress: "",
  });

  // Redirect to payment page on successful submission
  useEffect(() => {
    if (state.success && state.applicationId) {
      router.push(`/payment/${state.applicationId}`);
    }
  }, [state.success, state.applicationId, router]);

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

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return (
          formData.businessName &&
          formData.businessType &&
          formData.phoneNumber &&
          formData.idNumber &&
          formData.physicalAddress
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

      {/* Display global error message */}

      {state.error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
          {state.error}
        </div>
      )}

      {/* Display success message */}

      {state.success && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-600">
          {state.message}
        </div>
      )}

      <form action={formAction}>
        {/* Hidden field to pass documents */}
        <input
          type="hidden"
          name="documents"
          value={JSON.stringify(documents)}
        />
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
                    name="businessName"
                    value={formData.businessName}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        businessName: e.target.value,
                      }))
                    }
                    placeholder="Enter business name"
                  />
                  {state.errors?.businessName && (
                    <p className="text-sm text-red-500">
                      {state.errors.businessName[0]}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="businessType">Business Type *</Label>
                  <Select
                    name="businessType"
                    value={formData.businessType}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, businessType: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Retail">Retail</SelectItem>
                      <SelectItem value="Restaurant/Food Service">
                        Restaurant/Food Service
                      </SelectItem>
                      <SelectItem value="Manufacturing">
                        Manufacturing
                      </SelectItem>
                      <SelectItem value="Professional Services">
                        Professional Services
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {state.errors?.businessType && (
                    <p className="text-sm text-red-500">
                      {state.errors.businessType[0]}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number *</Label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        phoneNumber: e.target.value,
                      }))
                    }
                    placeholder="+254 700 000 000"
                  />
                  {state.errors?.phoneNumber && (
                    <p className="text-sm text-red-500">
                      {state.errors.phoneNumber[0]}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="idNumber">National ID Number *</Label>
                  <Input
                    id="idNumber"
                    name="idNumber"
                    value={formData.idNumber}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        idNumber: e.target.value,
                      }))
                    }
                    placeholder="Enter ID number"
                  />
                  {state.errors?.nationalID && (
                    <p className="text-sm text-red-500">
                      {state.errors.nationalID[0]}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="physicalAddress">
                  Business Physical Address *
                </Label>
                <Textarea
                  id="physicalAddress"
                  name="physicalAddress"
                  value={formData.physicalAddress}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      physicalAddress: e.target.value,
                    }))
                  }
                  placeholder="Enter complete physical address"
                />
                {state.errors?.businessAddress && (
                  <p className="text-sm text-red-500">
                    {state.errors.businessAddress[0]}
                  </p>
                )}
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
                    <div
                      key={index}
                      className="flex items-center gap-2 text-sm"
                    >
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      {doc.name}
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-primary/5 rounded-lg border">
                <h3 className="font-semibold mb-2">Application Fee</h3>
                <p className="text-2xl font-bold text-primary">{permit.fee}</p>
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
            type="button"
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0 || isPending}
          >
            Previous
          </Button>

          {currentStep === steps.length - 1 ? (
            <Button type="submit" disabled={!isStepValid() || isPending}>
              {isPending ? "Processing..." : "Proceed to Payment"}
            </Button>
          ) : (
            <Button
              type="button"
              onClick={handleNext}
              disabled={!isStepValid()}
            >
              Next
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
