"use client";

import { BusinessLicenseForm } from "@/components/application/business-license-form";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

// Define User type
interface User {
  id: string;
  role: any; // Replace 'any' with proper import of $Enums.UserRole
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  firstName: string;
  lastName: string;
  phoneNumber: string | null;
  idNumber: string | null;
  isActive: boolean;
}

export default function BusinessLicenseApplicationPage() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch the current user data when component mounts
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Call the API endpoint instead of directly using getCurrentUser
        const response = await fetch("/api/user");
        const data = await response.json();
        setUser(data.user);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleSubmit = (applicationData: any) => {
    // Mock submission - replace with real API call (route.ts)
    console.log("Submitting application:", applicationData);

    // Simulate API call
    setTimeout(() => {
      alert(
        "Application submitted successfully! You will receive a confirmation email shortly."
      );
      router.push("/dashboard");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* The dashboard header */}
      {user ? (
        <DashboardHeader user={user} />
      ) : (
        <div className="p-4 bg-muted">Loading user information...</div>
      )}
      <main className="container mx-auto px-4 py-8">
        <BusinessLicenseForm onSubmit={handleSubmit} />
      </main>
    </div>
  );
}
