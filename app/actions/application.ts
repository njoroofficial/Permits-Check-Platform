"use server";

import { getCurrentUser } from "@/lib/dal";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

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
  permitTypeId: z.string().min(1, "Permit type is required"),
});

export type applicationFormSchema = z.infer<typeof applicationFormSchema>;

export interface FormState {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
  error?: string;
  applicationId?: string | null;
}

function generateApplicationNumber(): string {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");
  return `APP-${timestamp}-${random}`;
}

export async function submitBusinessLicense(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    // Security check
    const user = await getCurrentUser();
    if (!user) {
      return {
        success: false,
        message: "Unauthorized access",
        error: "You must be logged in to submit an application",
      };
    }

    // Extract and parse form data
    const rawFormData = {
      businessName: formData.get("businessName") as string,
      businessType: formData.get("businessType") as string,
      phoneNumber: formData.get("phoneNumber") as string,
      nationalID: formData.get("idNumber") as string,
      businessAddress: formData.get("physicalAddress") as string,
      permitTypeId: formData.get("permitTypeId") as string,
    };

    console.log("Raw form data:", rawFormData); // DEBUG

    // Validate with zod
    const validationResult = applicationFormSchema.safeParse(rawFormData);

    if (!validationResult.success) {
      console.log("Validation errors:", validationResult.error); // DEBUG
      return {
        success: false,
        message: "Validation failed. Please check the form fields",
        errors: validationResult.error.flatten().fieldErrors,
      };
    }

    const validatedData = validationResult.data;

    // Parse documents
    const documentsJson = formData.get("documents") as string;
    let documents: any[] = [];

    try {
      documents = documentsJson ? JSON.parse(documentsJson) : [];
      console.log("Parsed documents:", documents); // DEBUG
    } catch (e) {
      console.error("Document parsing error:", e); // DEBUG
      return {
        success: false,
        message: "Invalid document data",
        error: "Failed to parse documents",
      };
    }

    // Validate documents exist and have URLs
    if (documents.length === 0) {
      return {
        success: false,
        message: "Please upload all required documents",
        errors: {
          documents: ["At least one document is required"],
        },
      };
    }

    // Check if all documents have valid URLs
    const invalidDocuments = documents.filter(
      (doc) => !doc.url && !doc.preview && !doc.fileUrl
    );
    if (invalidDocuments.length > 0) {
      console.error("Documents without URLs:", invalidDocuments);
      return {
        success: false,
        message: "Some documents are not properly uploaded",
        error:
          "Please ensure all documents are uploaded successfully before submitting",
      };
    }

    // Generate application ID
    const applicationId = generateApplicationNumber();

    console.log("Creating application with data:", {
      applicationNumber: applicationId,
      userId: user.id,
      permitTypeId: validatedData.permitTypeId,
      businessName: validatedData.businessName,
    }); // DEBUG

    // Verify permitType exists
    const permitTypeExists = await prisma.permitType.findUnique({
      where: { id: validatedData.permitTypeId },
    });

    if (!permitTypeExists) {
      return {
        success: false,
        message: "Invalid permit type selected",
        error: "The selected permit type does not exist",
      };
    }

    // Create application in database
    const application = await prisma.$transaction(async (tx) => {
      return await tx.application.create({
        data: {
          applicationNumber: applicationId,
          status: "DRAFT",
          user: {
            connect: { id: user.id },
          },
          permitType: {
            connect: { id: validatedData.permitTypeId },
          },
          businessName: validatedData.businessName,
          businessType: validatedData.businessType,
          businessAddress: validatedData.businessAddress,
          documents: {
            create: documents.map((doc: any) => {
              const fileUrl = doc.fileUrl || doc.url || doc.preview || "";
              const documentType = doc.documentType || "OTHER";

              return {
                fileName: doc.fileName || doc.name,
                originalName: doc.fileName || doc.name,
                fileSize: doc.size || 0,
                mimeType:
                  doc.mimeType || doc.type || "application/octet-stream",
                documentType: documentType,
                fileUrl: fileUrl,
              };
            }),
          },
          submittedAt: new Date(),
        },
        include: {
          documents: true,
          permitType: true,
        },
      });
    });

    console.log("Application created successfully:", application.id); // DEBUG

    // Revalidate relevant paths
    revalidatePath("/dashboard");
    revalidatePath("/apply");

    return {
      success: true,
      message: "Application submitted successfully",
      applicationId: application.id,
    };
  } catch (error) {
    // Enhanced error logging
    console.error("Full error object:", error);
    console.error("Error creating business application:", error);

    // Log Prisma-specific errors
    if (error && typeof error === "object") {
      const prismaError = error as any;
      console.error("Error code:", prismaError.code);
      console.error("Error meta:", prismaError.meta);
      console.error("Error message:", prismaError.message);
    }

    // More specific error handling
    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
        error: `Failed to create application: ${error.message}`,
      };
    }

    return {
      success: false,
      message: "An unexpected error occurred",
      error: "Failed to create business application",
    };
  }
}
