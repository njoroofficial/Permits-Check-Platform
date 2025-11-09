import { prisma } from "./db";
import { cacheTag, unstable_noStore as noStore } from "next/cache";
import { createClient } from "./supabase/server";

// Get current user
export async function getCurrentUser() {
  noStore(); // Prevent static prerender caching
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
      orderBy: { createdAt: "desc" },
    });

    return results;
  } catch (error) {
    console.error("Error fetching applications by user ID:", error);
    return [];
  }
};
