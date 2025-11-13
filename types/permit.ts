// Shared permit-related types

// PermitType from database with fee as string (for client components after serialization)
// Note: createdAt and updatedAt are ISO string timestamps for server→client serialization
export interface PermitType {
  id: string;
  name: string;
  description: string | null;
  fee: string; // Serialized from Decimal
  isActive: boolean;
  createdAt: string; // ISO timestamp string
  updatedAt: string; // ISO timestamp string
}

// Simplified permit info for display
export interface PermitInfo {
  id: string;
  name: string;
  description: string | null;
  fee: string;
}
