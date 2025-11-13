// Shared user-related types
import { UserRole } from "@/lib/generated/prisma";

export type { UserRole };

// User interface matching the database schema with necessary fields for components
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string | null;
  idNumber: string | null;
  role: UserRole;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Props interface for components that need current user
export interface CurrentUserProps {
  user: User;
}
