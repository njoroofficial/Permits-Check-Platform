import { getCurrentUser } from "@/lib/dal";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { connection } from "next/server";
import { Suspense } from "react";

// Authentication check is handled by middleware (proxy.ts)

async function Header() {
  await connection();
  const user = await getCurrentUser();
  return user ? <DashboardHeader user={user} /> : null;
}

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={<div className="h-16 border-b bg-background" />}>
        <Header />
      </Suspense>
      {children}
    </div>
  );
}
