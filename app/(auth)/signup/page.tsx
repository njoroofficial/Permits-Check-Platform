import SignupForm from "@/components/auth/signup-form";
import { Shield } from "lucide-react";
import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <Shield className="w-7 h-7 text-primary-foreground" />
            </div>
            <div className="text-left">
              <h1 className="font-bold text-xl text-balance">
                Murang'a County
              </h1>
              <p className="text-sm text-muted-foreground">
                Permits & Licensing
              </p>
            </div>
          </Link>
        </div>
        <SignupForm />
      </div>
    </div>
  );
}
