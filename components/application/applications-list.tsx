"use client";

import { useState, useMemo } from "react";
import { ApplicationsFilter } from "@/components/application/applications-filter";
import { ApplicationCard } from "@/components/application/application-card";
import { Application, PermitType } from "@/lib/generated/prisma";

type ApplicationWithPermit = Application & {
  permitType: PermitType;
};

interface ApplicationsListProps {
  applications: ApplicationWithPermit[];
}

export function ApplicationsList({ applications }: ApplicationsListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Get unique statuses from applications
  const availableStatuses = useMemo(() => {
    const statuses = new Set(applications.map((app) => app.status));
    return Array.from(statuses).sort();
  }, [applications]);

  // Filter applications
  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      const matchesSearch =
        searchQuery === "" ||
        app.businessName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.applicationNumber
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        app.permitType.name.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || app.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [applications, searchQuery, statusFilter]);

  return (
    <div className="space-y-6">
      <ApplicationsFilter
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        availableStatuses={availableStatuses}
      />

      {filteredApplications.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            {searchQuery || statusFilter !== "all"
              ? "No applications match your filters."
              : "No applications found."}
          </p>
        </div>
      ) : (
        <div
          className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2"
          role="list"
          aria-label="Applications list"
        >
          {filteredApplications.map((application) => (
            <ApplicationCard
              key={application.id}
              id={application.id}
              applicationNumber={application.applicationNumber}
              status={application.status}
              businessName={application.businessName}
              createdAt={application.createdAt}
              permitType={application.permitType}
            />
          ))}
        </div>
      )}
    </div>
  );
}
