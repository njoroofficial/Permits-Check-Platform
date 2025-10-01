import { getSession } from "./auth";
import { prisma } from "./db";

// get current user
export const getCurrentUser = async () => {
  const session = await getSession();

  if (!session) return null;

  try {
    // Get user from database using the session
    const result = await prisma.supabaseAuth.findFirst({
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
