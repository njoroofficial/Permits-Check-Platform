"use server";

// The form validation will be through zod
import z, { email } from "zod";
import { createUser, authenticateUser } from "@/lib/auth";

//define zod schema for signin validation
const signInScheme = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

// Define Zod schema for signup validation
const SignUpSchema = z
  .object({
    fullName: z.string().min(1, "Full name is required"),
    accountType: z
      .string()
      .refine((val) => val === "Citizen" || val === "County Officer", {
        message: "Account type must be either 'citizen' or 'officer'",
      }),
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

// signup server action
export async function signUp(formData: FormData): Promise<ActionResponse> {
  try {
    const data = {
      fullName: formData.get("fullName") as string,
      account_type: formData.get("accountType") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
    };

    const validationResult = SignUpSchema.safeParse(data);

    if (!validationResult.success) {
      return {
        success: false,
        message: "Validation failed",
        errors: validationResult.error.flatten().fieldErrors,
      };
    }

    const [firstName, ...lastNameParts] = data.fullName.split(" ");
    const lastName = lastNameParts.join(" ") || "";
    const role = data.account_type === "citizen" ? "CITIZEN" : "OFFICER";

    const user = await createUser(
      data.email,
      data.password,
      firstName,
      lastName,
      role
    );

    if (!user) {
      return {
        success: false,
        message: "Failed to create user account",
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

// signin server action
export async function signIn(formData: FormData): Promise<ActionResponse> {
  try {
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const validationResult = signInScheme.safeParse(data);

    if (!validationResult.success) {
      return {
        success: false,
        message: "Validation failed",
        errors: validationResult.error.flatten().fieldErrors,
      };
    }

    const user = await authenticateUser(data.email, data.password);

    if (!user) {
      return {
        success: false,
        message: "Invalid email or password",
      };
    }

    // Create session
    await createSession(user.id);

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
