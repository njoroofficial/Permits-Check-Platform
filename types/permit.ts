// Shared permit-related types

// PermitType from database with fee as string (for client components after serialization)
export interface PermitType {
  id: string;
  name: string;
  description: string | null;
  fee: string; // Serialized from Decimal
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Simplified permit info for display
export interface PermitInfo {
  id: string;
  name: string;
  description: string | null;
  fee: string;
}
