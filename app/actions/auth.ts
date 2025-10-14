"use server";

// The form validation will be through zod
import z from "zod";
import {
  createSession,
  verifyPassword,
  createUserWithAuth,
  deleteSession,
} from "@/lib/auth";
import { getUserByEmail } from "@/lib/dal";
import { redirect } from "next/navigation";

//define zod schema for signin validation
const signInScheme = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

// Define Zod schema for signup validation
const SignUpSchema = z
  .object({
    fullName: z.string().min(1, "Full name is required"),
    accountType: z.string().optional(),
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

    // validation with zod
    const validationResult = SignUpSchema.safeParse(data);

    if (!validationResult.success) {
      return {
        success: false,
        message: "Validation failed",
        errors: validationResult.error.flatten().fieldErrors,
      };
    }

    // Check if user already exists
    const existingUser = await getUserByEmail(data.email);
    if (existingUser) {
      return {
        success: false,
        message: "User with this email already exists",
        errors: {
          email: ["User with this email already exists"],
        },
      };
    }

    const [firstName, ...lastNameParts] = data.fullName.split(" ");
    const lastName = lastNameParts.join(" ") || "";
    const role = data.account_type === "officer" ? "OFFICER" : "CITIZEN";

    // Create user in your database
    const result = await createUserWithAuth(
      data.email,
      data.password,
      firstName,
      lastName,
      role
    );

    if (!result) {
      return {
        success: false,
        message: "Failed to create user account",
        error: "Failed to create user account",
      };
    }

    // Create session for our application
    await createSession(result.userId);

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

    // validate with zod
    const validationResult = signInScheme.safeParse(data);

    if (!validationResult.success) {
      return {
        success: false,
        message: "Validation failed",
        errors: validationResult.error.flatten().fieldErrors,
      };
    }

    // find user by email
    const auth = await getUserByEmail(data.email);
    if (!auth) {
      return {
        success: false,
        message: "Invalid email or password",
        errors: {
          email: ["Invalid email or password"],
        },
      };
    }

    // Verify password
    const isPasswordValid = await verifyPassword(data.password, auth.password);
    if (!isPasswordValid) {
      return {
        success: false,
        message: "Invalid email or password",
        errors: {
          password: ["Invalid email or password"],
        },
      };
    }

    // Create session for our application
    await createSession(auth.userId);

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

// sign out server action
export async function signOut(): Promise<void> {
  try {
    await deleteSession();
  } catch (error) {
    console.error("Sign out error:", error);
    throw new Error("Failed to sign out");
  } finally {
    redirect("/login");
  }
}
