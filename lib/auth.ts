import { compare, hash } from "bcryptjs";
import { nanoid } from "nanoid";
import { cookies } from "next/headers";
import * as jose from "jose";
import { cache } from "react";
import { PrismaClient } from "@prisma/client";

// JWT types
interface JWTPayload {
  userId: string;
  [key: string]: string | number | boolean | null | undefined;
}

// Secret key for JWT signing (in a real app, use an environment variable)
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-secret-key-min-32-chars-long!!!"
);

// JWT expiration time
const JWT_EXPIRATION = "7d"; // 7 days

// Token refresh threshold (refresh if less than this time left)
const REFRESH_THRESHOLD = 24 * 60 * 60; // 24 hours in seconds

// Hash a password
export async function hashPassword(password: string) {
  return hash(password, 10);
}

// Verify a password
export async function verifyPassword(password: string, hashedPassword: string) {
  return compare(password, hashedPassword);
}

// Create user in Supabase Auth
export async function SupabaseAuthUser(email: string, password: string) {
  const hashedPassword = await hashPassword(password);

  const id = nanoid();
  const prisma = new PrismaClient();

  try {
    await prisma.supabaseAuth.create({
      data: {
        id,
        email,
        password: hashedPassword,
      },
    });

    return { id, email };
  } catch (error) {
    console.error("Error creating user:", error);
    return null;
  }
}

// Create a new user
export async function createUser(
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  role: "CITIZEN" | "OFFICER"
) {
  const hashedPassword = await hashPassword(password);
  const prisma = new PrismaClient();

  try {
    const user = await prisma.User.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        role,
      },
    });

    return { id: user.id, email: user.email };
  } catch (error) {
    console.error("Error creating user:", error);
    return null;
  }
}

// Authenticate user
export async function authenticateUser(email: string, password: string) {
  const prisma = new PrismaClient();
  try {
    const user = await prisma.supabaseAuth.findUnique({
      where: { email },
    });

    if (!user) return null;

    const isValid = await verifyPassword(password, user.password);
    if (!isValid) return null;

    return {
      id: user.id,
      email: user.email,
      name: `${user.firstName} ${user.lastName}`,
      role: user.role.toLowerCase() as "citizen" | "officer",
    };
  } catch (error) {
    console.error("Authentication error:", error);
    return null;
  }
}

// Generate a JWT token
export async function generateJWT(payload: JWTPayload) {
  return await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRATION)
    .sign(JWT_SECRET);
}

// Verify a JWT token
export async function verifyJWT(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jose.jwtVerify(token, JWT_SECRET);
    return payload as JWTPayload;
  } catch (error) {
    console.error("JWT verification failed:", error);
    return null;
  }
}

// Check if token needs refresh
export async function shouldRefreshToken(token: string): Promise<boolean> {
  try {
    const { payload } = await jose.jwtVerify(token, JWT_SECRET, {
      clockTolerance: 15, // 15 seconds tolerance for clock skew
    });

    // Get expiration time
    const exp = payload.exp as number;
    const now = Math.floor(Date.now() / 1000);

    // If token expires within the threshold, refresh it
    return exp - now < REFRESH_THRESHOLD;
  } catch {
    // If verification fails, token is invalid or expired
    return false;
  }
}

// Create a session using JWT
export async function createSession(userId: string) {
  try {
    // Create JWT with user data
    const token = await generateJWT({ userId });

    // Store JWT in a cookie
    const cookieStore = await cookies();
    cookieStore.set({
      name: "auth_token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
      sameSite: "lax",
    });

    return true;
  } catch (error) {
    console.error("Error creating session:", error);
    return false;
  }
}

// Get current session from JWT
export const getSession = cache(async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) return null;
    const payload = await verifyJWT(token);

    return payload ? { userId: payload.userId } : null;
  } catch (error) {
    // Handle the specific prerendering error
    if (
      error instanceof Error &&
      error.message.includes("During prerendering, `cookies()` rejects")
    ) {
      console.log(
        "Cookies not available during prerendering, returning null session"
      );
      return null;
    }

    console.error("Error getting session:", error);
    return null;
  }
});

// Delete session by clearing the JWT cookie
export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("auth_token");
}
