"use server";

import { getPermitTypes as getPermit } from "@/lib/dal";

// get various permits
export async function getPermitTypes() {
  try {
    const permits = await getPermit();
    // Convert Decimal to regular numbers before sending to the client
    return permits.map((permit) => ({
      ...permit,
      fee: Number(permit.fee),
    }));
  } catch (error) {
    console.error("Error fetching permits:", error);
    throw error;
  }
}
