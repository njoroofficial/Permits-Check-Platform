"use server";

// The form validation will be through zod
import { z } from "zod";

//define zod schema for application form validation

const applicationFormSchema = z.object({
  businessName: z.string().min(1, "Business Name is required"),
  businessType: z.enum(
    [
      "Retail",
      "Restaurant/Food Service",
      "Manufacturing",
      "Professional Services",
    ],
    {
      errorMap: () => ({ message: "Please select a valid business type" }),
    }
  ),
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
