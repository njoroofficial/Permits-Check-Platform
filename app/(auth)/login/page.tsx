"use client";

import LoginForm from "@/components/auth/login-form";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <Image
                src="/assets/muranga-logo.png"
                alt="Muranga Logo"
                width={48}
                height={48}
              />
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
        <LoginForm />
      </div>
    </div>
  );
}
