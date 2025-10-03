import { getSession } from "./auth";
import { prisma } from "./db";

// get current user
export const getCurrentUser = async () => {
  const session = await getSession();

  if (!session) return null;

  // Skip database query during prerendering if we don't have a session

  if (
    typeof window === "undefined" &&
    process.env.NEXT_PHASE === "phase-production-build"
  ) {
    return null;
  }

  try {
    // Get user from database using the session
    const result = await prisma.user.findFirst({
      where: { id: session.userId },
    });

    return result;
  } catch (error) {
    console.error("Error fetching current user:", error);
    return null;
  }
};

// get user by email
export const getUserByEmail = async (email: string) => {
  if (!email) {
    console.error("Email is required");
    return null;
  }

  try {
    // Check if the user with provided email exists in the database
    const result = await prisma.supabaseAuth.findFirst({
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
  try {
    const result = await prisma.permitType.findMany();

    return result;
  } catch (error) {
    console.log("Error fetching Permit Types");
    throw new Error("Failed to fetch permit Types");
  }
};
