"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/db";

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
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
    };

    // Validation with zod
    const validationResult = SignUpSchema.safeParse(data);

    if (!validationResult.success) {
      return {
        success: false,
        message: "Validation failed",
        errors: validationResult.error.flatten().fieldErrors,
      };
    }

    const supabase = await createClient();
    const [firstName, ...lastNameParts] = data.fullName.split(" ");
    const lastName = lastNameParts.join(" ");

    // Sign up with Supabase
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      },
    });

    if (authError) {
      return {
        success: false,
        message: authError.message,
      };
    }

    if (!authData.user) {
      return {
        success: false,
        message: "Failed to create user",
      };
    }

    // Create user in your database
    await prisma.user.create({
      data: {
        id: authData.user.id, // Use Supabase user ID
        email: data.email,
        firstName,
        lastName,
        role: "CITIZEN",
      },
    });

    return {
      success: true,
      message: "Account created successfully",
    };
  } catch (error: any) {
    console.error("Signup error:", error);
    return {
      success: false,
      message: error.message || "An error occurred during signup",
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

    // Validate with zod
    const validationResult = signInScheme.safeParse(data);

    if (!validationResult.success) {
      return {
        success: false,
        message: "Validation failed",
        errors: validationResult.error.flatten().fieldErrors,
      };
    }

    const supabase = await createClient();

    // Sign in with Supabase
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      return {
        success: false,
        message: "Invalid email or password",
        errors: {
          email: ["Invalid email or password"],
        },
      };
    }

    return {
      success: true,
      message: "Signed in successfully",
    };
  } catch (error: any) {
    console.error("Signin error:", error);
    return {
      success: false,
      message: error.message || "An error occurred during signin",
    };
  }
}

// sign out server action
export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
