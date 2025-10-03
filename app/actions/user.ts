"use server";

import { getCurrentUser as getUser } from "@/lib/dal";

export async function getCurrentUser() {
  try {
    const user = await getUser();
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}
