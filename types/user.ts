// Shared user-related types
import { UserRole } from "@/lib/generated/prisma";

export type { UserRole };

// User interface matching the database schema with necessary fields for components
// Note: createdAt and updatedAt are ISO string timestamps for server→client serialization
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string | null;
  idNumber: string | null;
  role: UserRole;
  isActive: boolean;
  createdAt: string; // ISO timestamp string
  updatedAt: string; // ISO timestamp string
}

// Props interface for components that need current user
export interface CurrentUserProps {
  user: User;
}
