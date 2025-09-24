"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useActionState } from "react";
import toast from "react-hot-toast";
import { signIn, ActionResponse, signUp } from "@/app/actions/auth";
import { Alert, AlertDescription } from "../ui/alert";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

// default form state
const initialState: ActionResponse = {
  success: false,
  message: "",
  error: undefined,
};

export default function LoginForm() {
  // navigating routes programmatically using the next/naviagation
  const router = useRouter();

  // Use useActionState hook for the form submission action
  const [state, formAction, isPending] = useActionState<
    ActionResponse,
    FormData
  >(async (prevState: ActionResponse, formData: FormData) => {
    try {
      const result = await signIn(formData);

      // Handle successful submission
      if (result.success) {
        toast.success("Signed in successfully");
        router.push("/dashboard");
        router.refresh();
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

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Sign In</CardTitle>
        <CardDescription>
          Access your Murang'a County permits account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          {/* displaying an error */}
          {state?.message && !state.success && (
            <Alert variant="destructive">
              <AlertDescription>{state.message}</AlertDescription>
            </Alert>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="your.email@example.com"
              required
              disabled={isPending}
              aria-describedby="email-error"
              className={state?.errors?.email ? "border-red-500" : ""}
            />
            {/* display error */}
            {state?.errors?.email && (
              <p id="email-error" className="text-sm text-red-500">
                {state.errors.email[0]}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              required
              disabled={isPending}
              aria-describedby="password-error"
              className={state?.errors?.password ? "border-red-500" : ""}
            />
            {/* display an error */}
            {state?.errors?.password && (
              <p id="password-error" className="text-sm text-red-500">
                {state.errors.password[0]}
              </p>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>
        <div className="mt-6 text-center text-sm">
          <p className="text-muted-foreground">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="text-primary hover:underline font-medium"
            >
              Sign up here
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
