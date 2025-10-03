"use server";

import { getPermitTypes as getPermit } from "@/lib/dal";

// get various permits
export async function getPermitTypes() {
  try {
    const permit = await getPermit();
    return permit;
  } catch (error) {
    console.error("Error fetching permits:", error);
    throw error;
  }
}
