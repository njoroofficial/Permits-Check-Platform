// Shared dashboard-related types
import { ApplicationSummary } from "./application";

// Re-export for convenience
export type { ApplicationSummary };

// Dashboard statistics
export interface DashboardStats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
}

// Complete dashboard data
export interface DashboardData {
  stats: DashboardStats;
  recent: ApplicationSummary[];
}

// Officer dashboard statistics
export interface OfficerStats {
  totalApplications: number;
  pendingReview: number;
  approvedToday: number;
  rejectedToday: number;
  averageProcessingTime: number;
  activeApplicants: number;
}
