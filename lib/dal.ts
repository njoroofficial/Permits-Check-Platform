import { prisma } from "./db";
import { cacheTag } from "next/cache";
import { createClient } from "./supabase/server";
import { ApplicationStatus } from "./generated/prisma";

// TypeScript interfaces for dashboard data
export interface ApplicationSummary {
  id: string;
  type: string;
  status:
    | "pending"
    | "approved"
    | "rejected"
    | "under-review"
    | "draft"
    | "payment-pending"
    | "completed";
  submittedDate: string;
  fee: string;
}

export interface DashboardStats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
}

export interface DashboardData {
  stats: DashboardStats;
  recent: ApplicationSummary[];
}

// Get current user
export async function getCurrentUser() {
  try {
    const supabase = await createClient();

    const {
      data: { user: authUser },
      error,
    } = await supabase.auth.getUser();

    if (error || !authUser) {
      return null;
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { id: authUser.id },
    });

    return user;
  } catch (error) {
    console.error("Error fetching current user:", error);
    return null;
  }
}

// Get user by email
export const getUserByEmail = async (email: string) => {
  if (!email) {
    console.error("Email is required");
    return null;
  }

  try {
    const result = await prisma.user.findUnique({
      where: { email },
    });

    if (!result) {
      console.log(`No user found with email: ${email}`);
    }

    return result;
  } catch (error) {
    console.error("Error fetching user by email:", error);
    return null;
  }
};

// get permits types
export const getPermitTypes = async () => {
  "use cache";
  cacheTag("permitType");
  try {
    const results = await prisma.permitType.findMany({
      where: {
        isActive: true,
      },
    });

    // Serialize Decimal to string before returning
    return results.map((result) => ({
      ...result,
      fee: result.fee.toString(), // Convert Decimal to string
    }));
  } catch (error) {
    console.log("Error fetching Permit Types");
    throw new Error("Failed to fetch permit Types");
  }
};

// when user clicks on a permit type, get the permit type details
// get permit type by id
export const getPermitTypeById = async (id: string) => {
  try {
    const result = await prisma.permitType.findUnique({
      where: { id },
    });

    if (!result) {
      console.log(`No permit type found with id: ${id}`);
      return null;
    }

    // Serialize Decimal to string before returning
    return {
      ...result,
      fee: result.fee.toString(), // Convert Decimal to string
    };
  } catch (error) {
    console.error("Error fetching permit type by ID:", error);
    return null;
  }
};

// fetch application details
export const getApplicationDetails = async (applicationId: string) => {
  try {
    const results = await prisma.application.findUnique({
      where: { applicationNumber: applicationId },
    });

    if (!results) {
      console.log(`No application made for: ${applicationId}`);
    }

    return results;
  } catch (error) {
    console.error("Error fetching application details:", error);
    return null;
  }
};

// fetch an applications done by a specific user
export const getApplicationsByUserId = async (userId: string) => {
  "use cache";
  cacheTag("applications");
  if (!userId) {
    console.error("User ID is required");
    return [];
  }

  try {
    const results = await prisma.application.findMany({
      where: { userId },
      include: {
        permitType: true,
      },
      orderBy: { createdAt: "desc" },
    });

    // Serialize Decimal to string before returning
    return results.map((result) => ({
      ...result,
      permitType: result.permitType
        ? {
            ...result.permitType,
            fee: result.permitType.fee.toString(), // Convert Decimal to string
          }
        : null,
    }));
  } catch (error) {
    console.error("Error fetching applications by user ID:", error);
    return [];
  }
};

// fetch a single application by application number with all relations
export const getApplicationByNumber = async (applicationNumber: string) => {
  if (!applicationNumber) {
    console.error("Application number is required");
    return null;
  }

  try {
    const result = await prisma.application.findUnique({
      where: { applicationNumber },
      include: {
        permitType: true,
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            phoneNumber: true,
          },
        },
        documents: {
          orderBy: { createdAt: "desc" },
        },
        statusHistory: {
          orderBy: { createdAt: "asc" },
          include: {
            updatedBy: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
        assignedOfficer: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    if (!result) {
      return null;
    }

    // Serialize Decimal to string for permitType.fee
    return {
      ...result,
      permitType: result.permitType
        ? {
            ...result.permitType,
            fee: result.permitType.fee.toString(),
          }
        : null,
    };
  } catch (error) {
    console.error("Error fetching application by number:", error);
    return null;
  }
};

// Helper to map ApplicationStatus to dashboard status
function mapStatus(status: ApplicationStatus): ApplicationSummary["status"] {
  const statusMap: Record<ApplicationStatus, ApplicationSummary["status"]> = {
    DRAFT: "draft",
    SUBMITTED: "pending",
    UNDER_REVIEW: "under-review",
    APPROVED: "approved",
    REJECTED: "rejected",
    PAYMENT_PENDING: "payment-pending",
    COMPLETED: "completed",
  };
  return statusMap[status];
}

// Get dashboard data for a specific user
export async function getDashboardData(userId: string): Promise<DashboardData> {
  "use cache";
  cacheTag("dashboard-data", `user-${userId}`);

  if (!userId) {
    throw new Error("User ID is required");
  }

  try {
    // Fetch all applications for the user with permit type info
    const applications = await prisma.application.findMany({
      where: { userId },
      include: {
        permitType: true,
      },
      orderBy: { createdAt: "desc" },
    });

    // Calculate stats aggregates
    const stats: DashboardStats = {
      total: applications.length,
      pending: applications.filter(
        (app) =>
          app.status === ApplicationStatus.SUBMITTED ||
          app.status === ApplicationStatus.UNDER_REVIEW
      ).length,
      approved: applications.filter(
        (app) =>
          app.status === ApplicationStatus.APPROVED ||
          app.status === ApplicationStatus.COMPLETED
      ).length,
      rejected: applications.filter(
        (app) => app.status === ApplicationStatus.REJECTED
      ).length,
    };

    // Map to ApplicationSummary format (recent 5)
    const recent: ApplicationSummary[] = applications
      .slice(0, 5)
      .map((app) => ({
        id: app.applicationNumber,
        type: app.permitType.name,
        status: mapStatus(app.status),
        submittedDate: app.submittedAt
          ? new Date(app.submittedAt).toISOString().split("T")[0]
          : new Date(app.createdAt).toISOString().split("T")[0],
        fee: `KES ${parseFloat(
          app.permitType.fee.toString()
        ).toLocaleString()}`,
      }));

    return { stats, recent };
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    // Return empty data on error
    return {
      stats: { total: 0, pending: 0, approved: 0, rejected: 0 },
      recent: [],
    };
  }
}
