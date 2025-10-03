"use server";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";

export default async function DashboardPage() {
  return (
    <div className="min-g-screen bg-background">
      {/* the dashboard header */}
      <DashboardHeader />
    </div>
  );
}
