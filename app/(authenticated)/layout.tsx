import type React from "react";
import { Suspense } from "react";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { getCurrentUser } from "@/lib/dal";
import { redirect } from "next/navigation";

async function AuthenticatedContent({
  children,
}: {
  children: React.ReactNode;
}) {
  // Get current user for header
  const user = await getCurrentUser();

  // Redirect to login if no user
  if (!user) {
    redirect("/login");
  }

  return (
    <>
      <DashboardHeader user={user} />
      {children}
    </>
  );
}

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground">Loading...</p>
            </div>
          </div>
        }
      >
        <AuthenticatedContent>{children}</AuthenticatedContent>
      </Suspense>
    </div>
  );
}
