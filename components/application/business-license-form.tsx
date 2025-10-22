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
import { useActionState, useState } from "react";
import {
  type ActionResponse,
  createApplication,
} from "@/app/actions/application";
import { Button } from "../ui/button";
import { ApplicationStepper } from "./application-stepper";
import { DocumentUpload } from "./document-upload";

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

const initialState: ActionResponse = {
  success: false,
  message: "",
  errors: undefined,
};

export function BusinessLicenseForm() {
  const router = useRouter();
  // hook to handle form next state
  const [currentStep, setCurrentStep] = useState(0);
  // hook to set documents
  const [documents, setDocuments] = useState<any[]>([]);

  // Generate application ID
  const applicationId = `APP-${Date.now()}`;

  // Use useActionState hook for the form submission action

  const [state, formAction, isPending] = useActionState<
    ActionResponse,
    FormData
  >(async (prevState: ActionResponse, formData: FormData) => {
    // Extract data from the form

    const applicationData = {
      businessName: formData.get("businessName") as string,
      businessType: formData.get("businessType") as
        | "Retail"
        | "Restaurant/Food Service"
        | "Manufacturing"
        | "Professional Services",
      phoneNumber: formData.get("phoneNumber") as string,
      nationalID: Number(formData.get("idNumber")),
      businessAddress: formData.get("physicalAddress") as string,
    };

    try {
      // call the server action to initiate the application process
      const result = await createApplication(applicationData);

      // Handle successful submission

      if (result.success) {
        router.push(`/payment/${applicationId}`);
      }

      return result;
    } catch (err) {
      return {
        success: false,
        message: (err as Error).message || "An error occurred",
        errors: undefined,
      };
    }
  }, initialState);

  // function to handle next step
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  // function to handle previous step
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // function to check whether step is valid to move on
  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return "proceed to upload documents";
      case 1:
        return "Proceed to confirmation page";
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
          <CardContent>
            {/* Application form */}

            <form action={formAction} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="businessName">Business Name *</Label>
                  <Input
                    id="businessName"
                    name="businessName"
                    type="text"
                    placeholder="Enter business name"
                    required
                    disabled={isPending}
                    aria-describedby="businessName-error"
                    className={
                      state?.errors?.businessName ? "border-red-500" : ""
                    }
                  />

                  {/* display business name error */}

                  {state?.errors?.businessName && (
                    <p id="businessName-error" className="text-sm text-red-500">
                      {state.errors.businessName[0]}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="businessType">Business Type *</Label>
                  <Select
                    name="businessType"
                    disabled={isPending}
                    aria-describedby="businessType-error"
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="restaurant">
                        Restaurant/Food Service
                      </SelectItem>
                      <SelectItem value="manufacturing">
                        Manufacturing
                      </SelectItem>
                      <SelectItem value="services">
                        Professional Services
                      </SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>

                    {/* display business type error */}

                    {state?.errors?.businessType && (
                      <p
                        id="businessType-error"
                        className="text-sm text-red-500"
                      >
                        {state.errors.businessType[0]}
                      </p>
                    )}
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="text"
                    placeholder="+254 700 000 000"
                    required
                    disabled={isPending}
                    aria-describedby="phoneNumber-error"
                    className={
                      state?.errors?.phoneNumber ? "border-red-500" : ""
                    }
                  />

                  {/* display phone number error */}

                  {state?.errors?.phoneNumber && (
                    <p id="phoneNumber-error" className="text-sm text-red-500">
                      {state.errors.phoneNumber[0]}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="idNumber">National ID Number *</Label>
                  <Input
                    id="idNumber"
                    name="idNumber"
                    type="number"
                    placeholder="Enter ID number"
                    required
                    disabled={isPending}
                    aria-describedby="idNumber-error"
                    className={state?.errors?.idNumber ? "border-red-500" : ""}
                  />

                  {/* display id number error */}

                  {state?.errors?.idNumber && (
                    <p id="idNumber-error" className="text-sm text-red-500">
                      {state.errors.idNumber[0]}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="physicalAddress">
                  Business Physical Address
                </Label>
                <Textarea
                  id="physicalAddress"
                  name="physicalAddress"
                  placeholder="Enter complete physical address"
                  required
                  aria-describedby="physicalAddress-error"
                  className={
                    state?.errors?.physicalAddress ? "border-red-500" : ""
                  }
                />

                {/* display physical address error */}

                {state?.errors?.physicalAddress && (
                  <p
                    id="physicalAddress-error"
                    className="text-sm text-red-500"
                  >
                    {state.errors.physicalAddress[0]}
                  </p>
                )}
              </div>
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  "Test Button"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {/* document upload */}
      {currentStep === 1 && (
        <DocumentUpload
          requiredDocuments={requiredDocuments}
          onDocumentsChange={setDocuments}
        />
      )}

      {/* Review Application */}
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
                  <strong>Business Name:</strong>
                  {}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
