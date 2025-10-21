"use server";

import { getCurrentUser } from "@/lib/dal";
import { prisma } from "@/lib/db";
// The form validation will be through zod
import { z } from "zod";
import { fa } from "zod/v4/locales";

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
  nationalID: z.number().min(1, "National ID Number is required"),
  businessAddress: z.string().min(1, "Business Address is required"),
});

// use the schema types
export type applicationFormSchema = z.infer<typeof applicationFormSchema>;

// defining and exporting response type
export type ActionResponse = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
  error?: string;
};

// Initialize a business license application
export async function createApplication(
  data: applicationFormSchema
): Promise<ActionResponse> {
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

    // validate with zod
    const validationResult = applicationFormSchema.safeParse(data);
    if (!validationResult.success) {
      return {
        success: false,
        message: "Validation failed",
        errors: validationResult.error.flatten().fieldErrors,
      };
    }

    // create a business license application
    const validationData = validationResult.data;
    await prisma.application.create({
      data: validationData,
    });

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
