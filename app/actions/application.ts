"use server";

import { getCurrentUser } from "@/lib/dal";
import { prisma } from "@/lib/db";
import Link from "next/link";
// The form validation will be through zod
import { z } from "zod";

//define zod schema for application form validation

const businessTypes = [
  "Retail",
  "Restaurant",
  "WholeSale",
  "Manufacturing",
  "Professional Services",
  "Bar/Club",
  "Environment",
  "Construction",
  "Transport",
  "Food Services",
] as const;

const applicationFormSchema = z.object({
  businessName: z.string().min(1, "Business Name is required"),
  businessType: z.enum(businessTypes, {
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

// helper function to generate a unique application ID
function generateApplicationNumber(): string {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");
  return `APP-${timestamp}-${random}`;
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
        | "Restaurant"
        | "WholeSale"
        | "Manufacturing"
        | "Professional Services"
        | "Bar/Club"
        | "Environment"
        | "Construction"
        | "Transport"
        | "Food Services",
      phoneNumber: formData.get("phoneNumber") as string,
      nationalID: formData.get("idNumber") as string,
      businessAddress: formData.get("physicalAddress") as string,
    };

    // validate with zod
    const validationResult = applicationFormSchema.safeParse(rawFormData);

    if (!validationResult.success) {
      console.log(rawFormData);

      console.log("Validation failed");

      return {
        success: false,
        message: "Validation failed. Please check the form fields",
        errors: validationResult.error.flatten().fieldErrors,
      };
    }

    // Get documents from previous state or form data
    const documentsJson = formData.get("documents") as string;
    const documents = documentsJson
      ? JSON.parse(documentsJson)
      : prevState.documents || [];

    // If validation passes, create the application
    const validatedData = validationResult.data;

    // Generate application ID
    const applicationId = generateApplicationNumber();

    // get current permit type id
    const currentPermitId = formData.get("permitTypeId") as string;

    // Create application with nested documents using a single transaction
    const application = await prisma.application.create({
      data: {
        applicationNumber: applicationId,
        status: "DRAFT",

        // Connect to user
        user: {
          connect: { id: user.id },
        },

        // connect to permit type
        permitType: {
          connect: { id: currentPermitId },
        },

        // Business details
        businessName: validatedData.businessName,
        businessType: validatedData.businessType,
        businessAddress: validatedData.businessAddress,

        // Create nested documents in the same transaction
        documents: {
          create: documents.map((doc: any) => ({
            fileName: doc.name,
            originalName: doc.name,
            fileSize: doc.size,
            mimeType: doc.mimeType || "application/octet-stream",
            documentType: doc.type || "OTHER",
            fileUrl: doc.url,
          })),
        },

        // Set submission timestamp
        submittedAt: new Date(),
      },
      include: {
        documents: true,
        permitType: true,
      },
    });

    return {
      success: true,
      message: "Business Application created successfully",
      applicationId: application.id,
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
