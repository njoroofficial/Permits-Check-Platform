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
import { useActionState } from "react";
import {
  type ActionResponse,
  createApplication,
} from "@/app/actions/application";
import { Button } from "../ui/button";

// const steps = [
//   { title: "Business Info", description: "Basic details" },
//   { title: "Documents", description: "Upload files" },
//   { title: "Review", description: "Confirm & submit" },
// ];

const initialState: ActionResponse = {
  success: false,
  message: "",
  errors: undefined,
};

export function BusinessLicenseForm() {
  const router = useRouter();

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

  // const handleSubmit = () => {
  //   // Redirect to payment page
  //   router.push(`/payment/${applicationId}`);
  // };

  // const isStepValid = () => {};

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
        {/* <ApplicationStepper steps={steps} currentStep={currentStep} /> */}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Business Information</CardTitle>
          <CardDescription>Provide details about your business</CardDescription>
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
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="services">
                      Professional Services
                    </SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>

                  {/* display business type error */}

                  {state?.errors?.businessType && (
                    <p id="businessType-error" className="text-sm text-red-500">
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
                  className={state?.errors?.phoneNumber ? "border-red-500" : ""}
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
              <Label htmlFor="physicalAddress">Business Physical Address</Label>
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
                <p id="physicalAddress-error" className="text-sm text-red-500">
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
    </div>
  );
}
