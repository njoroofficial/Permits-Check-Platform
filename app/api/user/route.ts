import { getCurrentUser } from "@/lib/dal";
import { NextResponse } from "next/server";

// This API route fetches the current user data
export async function GET() {
  try {
    const user = await getCurrentUser();
    return NextResponse.json({ user });
  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}
