"use server";

import { getPermitTypes as getPermit } from "@/lib/dal";

export type PermitType = {
  id: string;
  name: string;
  description: string | null;
  fee: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

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
