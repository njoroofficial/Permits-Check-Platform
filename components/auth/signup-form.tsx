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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useActionState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signUp, ActionResponse } from "@/app/actions/auth";
import { Alert, AlertDescription } from "../ui/alert";
import { Loader2 } from "lucide-react";

// default state of the form
const initialState: ActionResponse = {
  success: false,
  message: "",
  error: undefined,
};

export default function SignupForm() {
  // navigating routes programmatically using the next/naviagation
  const router = useRouter();

  // Use useActionState hook for the form submission action
  const [state, formAction, isPending] = useActionState<
    ActionResponse,
    FormData
  >(async (prevState: ActionResponse, formData: FormData) => {
    try {
      const result = await signUp(formData);

      // handle successful submission
      if (result.success) {
        toast.success("Account created successfully");
        router.push("/dashboard");
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
        <CardTitle className="text-2xl">Create Account</CardTitle>
        <CardDescription>
          Register for Murang'a County permits services
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
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="fullName"
              type="text"
              placeholder="John Doe"
              required
              disabled={isPending}
              aria-describedby="name-error"
              className={state?.errors?.fullName ? "border-red-500" : ""}
            />
            {/* display fullName error */}
            {state?.errors?.fullName && (
              <p id="fullName-error" className="text-sm text-red-500">
                {state.errors.fullName[0]}
              </p>
            )}
          </div>
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
            {/* display email error */}
            {state?.errors?.email && (
              <p id="email-error" className="text-sm text-red-500">
                {state.errors.email[0]}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Account Type</Label>

            <Select
              name="accountType"
              disabled={isPending}
              aria-describedby="accountType-error"
            >
              <SelectTrigger>
                <SelectValue placeholder="Select account type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="citizen">Citizen</SelectItem>
                <SelectItem value="officer">County Officer</SelectItem>
              </SelectContent>
            </Select>
            {/* display account type error */}
            {state?.errors?.account_type && (
              <p id="accountType-error" className="text-sm text-red-500">
                {state.errors.account_type[0]}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Create a password"
              required
              disabled={isPending}
              aria-describedby="password-error"
              className={state?.errors?.password ? "border-red-500" : ""}
            />
            {state?.errors?.password && (
              <p id="password-error" className="text-sm text-red-500">
                {state.errors.password[0]}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              required
              disabled={isPending}
              aria-describedby="confirmPassword-error"
              className={state?.errors?.confirmPassword ? "border-red-500" : ""}
            />
            {/* display confirm password error */}
            {state?.errors?.confirmPassword && (
              <p id="confirmPassword-error" className="text-sm text-red-500">
                {state.errors.confirmPassword[0]}
              </p>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Account...
              </>
            ) : (
              "Create Account"
            )}
          </Button>
        </form>
        <div className="mt-6 text-center text-sm">
          <p className="text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-primary hover:underline font-medium"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
