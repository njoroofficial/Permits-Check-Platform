"use server";

import { getCurrentUser } from "@/lib/dal";
import { prisma } from "@/lib/db";
// The form validation will be through zod
import { z } from "zod";

//define zod schema for application form validation

const industryTypes = [
  "Retail",
  "Restaurant/Food Service",
  "Manufacturing",
  "Professional Services",
] as const;

const applicationFormSchema = z.object({
  businessName: z.string().min(1, "Business Name is required"),
  businessType: z.enum(industryTypes, {
    message: "Please select a valid business type",
  }),
  phoneNumber: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, { message: "Invalid phone number" }),
  nationalID: z.string().min(1, "National ID Number is required"),
  businessAddress: z.string().min(1, "Business Address is required"),
});

// use the schema types
export type applicationFormSchema = z.infer<typeof applicationFormSchema>;

// Define the state shape for useActionState
export interface FormState {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
  error?: string;
  applicationId?: string | null;
  formData?: Partial<FormData>;
  documents?: any[];
}

// Initialize a business license application
export async function submitBusinessLicense(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    // security check - ensure user is authenticated
    const user = await getCurrentUser();
    if (!user) {
      return {
        success: false,
        message: "Unauthorized access",
        error: "Unauthorized",
      };
    }

    // Extract form data
    const rawFormData = {
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

    // Get documents from previous state or form data
    const documentsJson = formData.get("documents") as string;
    const documents = documentsJson
      ? JSON.parse(documentsJson)
      : prevState.documents || [];

    // validate with zod
    const validationResult = applicationFormSchema.safeParse(rawFormData);

    if (!validationResult.success) {
      return {
        success: false,
        message: "Validation failed. Please check the form fields",
        errors: validationResult.error.flatten().fieldErrors,
      };
    }

    // If validation passes, create the application
    const validatedData = validationResult.data;

    // Generate application ID
    const applicationId = `APP-${Date.now()}`;

    // create a business license application in the database

    // await prisma.application.create({
    //   data: {
    //     applicationNumber: applicationId,
    //     businessName: validatedData.businessName,
    //     businessType: validatedData.businessType,
    //     businessAddress: validatedData.businessAddress,
    //     userId: user.id, // Associate with authenticated user
    //     permitTypeId: "Business License",
    //     documents: documents,
    //   },
    // });

    return {
      success: true,
      message: "Business Application created successfully",
    };
  } catch (error) {
    console.error("Error creating business application:", error);
    return {
      success: false,
      message: "An error occurred while creating a business application",
      error: "Failed to create a business application",
    };
  }
}
