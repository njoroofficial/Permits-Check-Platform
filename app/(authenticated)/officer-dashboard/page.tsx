"use client";

import { ApplicationFilters } from "@/components/officer/application-filters";
import { ApplicationReviewCard } from "@/components/officer/application-review-card";
import { OfficerStats } from "@/components/officer/officer-stats";
import { ApproveModal } from "@/components/officer/approve-modal";
import { RejectModal } from "@/components/officer/reject-modal";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Mock data - replace with real API calls
const mockStats = {
  totalApplications: 156,
  pendingReview: 23,
  approvedToday: 8,
  rejectedToday: 2,
  averageProcessingTime: 4,
  activeApplicants: 89,
};

const mockApplications = [
  {
    id: "APP-001",
    applicantName: "John Kamau",
    applicationType: "Business License",
    status: "pending" as const,
    submittedDate: "2024-01-20",
    fee: "KES 2,500",
    priority: "high" as const,
    daysRemaining: 3,
  },
  {
    id: "APP-002",
    applicantName: "Mary Wanjiku",
    applicationType: "Building Permit",
    status: "under-review" as const,
    submittedDate: "2024-01-18",
    fee: "KES 5,000",
    priority: "medium" as const,
    daysRemaining: 8,
  },
  {
    id: "APP-003",
    applicantName: "Peter Mwangi",
    applicationType: "Food Handler's Permit",
    status: "pending" as const,
    submittedDate: "2024-01-22",
    fee: "KES 1,000",
    priority: "low" as const,
    daysRemaining: 5,
  },
  {
    id: "APP-004",
    applicantName: "Grace Njeri",
    applicationType: "Transport License",
    status: "approved" as const,
    submittedDate: "2024-01-15",
    fee: "KES 3,000",
    priority: "medium" as const,
    daysRemaining: 0,
  },
  {
    id: "APP-005",
    applicantName: "David Kiprotich",
    applicationType: "Business License",
    status: "rejected" as const,
    submittedDate: "2024-01-12",
    fee: "KES 2,500",
    priority: "low" as const,
    daysRemaining: 0,
  },
];

export default function OfficerDashboardPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  // Modal states
  const [approveModalOpen, setApproveModalOpen] = useState(false);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<{
    id: string;
    applicantName: string;
  } | null>(null);

  // Filter applications based on search and filters
  const filteredApplications = mockApplications.filter((app) => {
    const matchesSearch =
      app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.applicationType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    const matchesType =
      typeFilter === "all" ||
      app.applicationType.toLowerCase().replace(/['\s]/g, "-") === typeFilter;
    const matchesPriority =
      priorityFilter === "all" || app.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesType && matchesPriority;
  });

  const activeFiltersCount =
    [statusFilter, typeFilter, priorityFilter].filter(
      (filter) => filter !== "all"
    ).length + (searchTerm ? 1 : 0);

  const handleClearFilters = () => {
    setStatusFilter("all");
    setTypeFilter("all");
    setPriorityFilter("all");
    setSearchTerm("");
  };

  const handleReview = (id: string) => {
    // Navigate to detailed review page
    router.push(`/officer-dashboard/applications/${id}`);
  };

  const handleApprove = (id: string, applicantName: string) => {
    setSelectedApplication({ id, applicantName });
    setApproveModalOpen(true);
  };

  const handleReject = (id: string, applicantName: string) => {
    setSelectedApplication({ id, applicantName });
    setRejectModalOpen(true);
  };

  const handleApproveSuccess = () => {
    toast.success("Application approved successfully!", {
      description: `Application ${selectedApplication?.id} has been approved.`,
    });
    // TODO: Refresh applications list from API
  };

  const handleRejectSuccess = () => {
    toast.success("Application rejected", {
      description: `Application ${selectedApplication?.id} has been rejected.`,
    });
    // TODO: Refresh applications list from API
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Officer Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Manage and review permit applications.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="mb-8">
          <OfficerStats stats={mockStats} />
        </div>

        {/* Filters */}
        <div className="mb-6">
          {/* filter component */}
          <ApplicationFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            typeFilter={typeFilter}
            onTypeFilterChange={setTypeFilter}
            priorityFilter={priorityFilter}
            onPriorityFilterChange={setPriorityFilter}
            onClearFilters={handleClearFilters}
            activeFiltersCount={activeFiltersCount}
          />
        </div>
        {/* Applications List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              Applications ({filteredApplications.length})
            </h2>
          </div>
          {filteredApplications.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-muted-foreground mb-4">
                No applications found matching your criteria
              </div>
              <button
                onClick={handleClearFilters}
                className="text-primary hover:underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredApplications.map((application) => (
                <ApplicationReviewCard
                  key={application.id}
                  application={application}
                  onReview={handleReview}
                  onApprove={handleApprove}
                  onReject={handleReject}
                />
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-12 p-6 bg-muted/30 rounded-lg">
          <h3 className="font-semibold mb-4">Quick Actions</h3>

          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <h4 className="font-medium mb-2">Priority Applications</h4>
              <p className="text-muted-foreground">
                {
                  mockApplications.filter((app) => app.priority === "high")
                    .length
                }{" "}
                high priority applications need immediate attention
              </p>
            </div>

            <div>
              <h4 className="font-medium mb-2">Overdue Reviews</h4>
              <p className="text-muted-foreground">
                {
                  mockApplications.filter(
                    (app) => app.daysRemaining < 2 && app.status === "pending"
                  ).length
                }{" "}
                applications are approaching deadline
              </p>
            </div>

            <div>
              <h4 className="font-medium mb-2">Today's Target</h4>
              <p className="text-muted-foreground">
                Process {mockStats.pendingReview} pending applications to meet
                daily targets
              </p>
            </div>
          </div>
        </div>

        {/* Modals */}
        {selectedApplication && (
          <>
            <ApproveModal
              isOpen={approveModalOpen}
              onClose={() => setApproveModalOpen(false)}
              applicationId={selectedApplication.id}
              applicantName={selectedApplication.applicantName}
              onSuccess={handleApproveSuccess}
            />
            <RejectModal
              isOpen={rejectModalOpen}
              onClose={() => setRejectModalOpen(false)}
              applicationId={selectedApplication.id}
              applicantName={selectedApplication.applicantName}
              onSuccess={handleRejectSuccess}
            />
          </>
        )}
      </main>
    </div>
  );
}
