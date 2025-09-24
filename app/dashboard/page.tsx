"use client";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { useAuth } from "@/lib/auth-context";

export default function DashboardPage() {
  const { user } = useAuth();
  return (
    <div className="min-h-screen bg-background">
      {/* dashboard header component */}
      <DashboardHeader />

      <main className="container mx-auto, px-4, py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-muted-foreground">
            Manage your permits and licenses from your personal dashboard
          </p>
        </div>
      </main>
    </div>
  );
}
