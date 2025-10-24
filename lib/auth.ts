"use server";

import * as jose from "jose";

// Secret key for JWT signing (in a real app, use an environment variable)
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-secret-key-min-32-chars-long!!!"
);

// Token refresh threshold (refresh if less than this time left)
const REFRESH_THRESHOLD = 24 * 60 * 60; // 24 hours in seconds

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
