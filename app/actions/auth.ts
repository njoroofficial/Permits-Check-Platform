"use server";

// The form validation will be through zod
import z, { email } from "zod";

//define zod schema for signin validation
const signInScheme = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

// Define Zod schema for signup validation
const SignUpSchema = z
  .object({
    fullName: z.string().min(1, "Full name is required"),
    email: z.string().min(1, "Email is required").email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

// using the schema types
export type signInData = z.infer<typeof signInScheme>;
export type signUpData = z.infer<typeof SignUpSchema>;

export type ActionResponse = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
  error?: string;
};

// signin server action
export async function signIn(formData: FormData): Promise<ActionResponse> {
  try {
    // extract data from form
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
    };
    // validate data with zod
    const validationResult = signInScheme.safeParse(data);
    // check if validation passed
    if (!validationResult.success) {
      return {
        success: false,
        message: "Validation failed",
        errors: validationResult.error.flatten().fieldErrors,
      };
    }
    return {
      success: true,
      message: "Signed in successfully",
    };
  } catch (e) {
    console.log("Sign in error", e);
    return {
      success: false,
      message: "An error occurred during sign in",
      error: "Failed to sign in user",
    };
  }
}

// signup server action
export async function signUp(formData: FormData): Promise<ActionResponse> {
  try {
    // extract data from form
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
    };

    // validate data with zod
    const validationResult = SignUpSchema.safeParse(data);

    // check if validation passed
    if (!validationResult.success) {
      return {
        success: false,
        message: "Validation failed",
        errors: validationResult.error.flatten().fieldErrors,
      };
    }
    return {
      success: true,
      message: "Account created successfully",
    };
  } catch (error) {
    console.log("Sign up error", error);
    return {
      success: false,
      message: "An error occurred during sign up",
      error: "Failed to sign up user",
    };
  }
}
