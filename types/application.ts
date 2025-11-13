// Shared application-related types
import { ApplicationStatus } from "@/lib/generated/prisma";

export type { ApplicationStatus };

// Application status type used in components
export type ApplicationStatusType =
  | "pending"
  | "approved"
  | "rejected"
  | "under-review"
  | "draft"
  | "payment-pending"
  | "completed";

// Status badge color mapping - shared across components
export const statusColors: Record<ApplicationStatusType, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  "under-review": "bg-blue-100 text-blue-800",
  approved: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
  draft: "bg-gray-100 text-gray-800",
  "payment-pending": "bg-orange-100 text-orange-800",
  completed: "bg-green-100 text-green-800",
};

// Application summary used in dashboard and lists
export interface ApplicationSummary {
  id: string;
  type: string;
  status: ApplicationStatusType;
  submittedDate: string;
  fee: string;
}

// Officer application review interface
export interface OfficerApplication {
  id: string;
  applicantName: string;
  applicationType: string;
  status: "pending" | "under-review" | "approved" | "rejected";
  submittedDate: string;
  fee: string;
  priority: "high" | "medium" | "low";
  daysRemaining: number;
}

// Timeline event for application history
export interface TimelineEvent {
  id: string;
  status: string;
  timestamp: string;
  actor: string;
  description: string;
  isCompleted: boolean;
  isCurrent: boolean;
}

// Document interface
export interface Document {
  id: string;
  fileName: string;
  fileSize: number;
  uploadedAt: string;
  documentType: string;
  fileUrl: string;
}

// Step interface for application stepper
export interface Step {
  title: string;
  description: string;
}
