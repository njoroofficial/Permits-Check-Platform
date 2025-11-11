"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, X } from "lucide-react";

interface ApplicationFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  typeFilter: string;
  onTypeFilterChange: (value: string) => void;
  priorityFilter: string;
  onPriorityFilterChange: (value: string) => void;
  onClearFilters: () => void;
  activeFiltersCount: number;
}

export function ApplicationFilters({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  typeFilter,
  onTypeFilterChange,
  priorityFilter,
  onPriorityFilterChange,
  onClearFilters,
  activeFiltersCount,
}: ApplicationFiltersProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search applications..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={statusFilter} onValueChange={onStatusFilterChange}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="under-review">Under Review</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>

          <Select value={typeFilter} onValueChange={onTypeFilterChange}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Application Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="business-license">Business License</SelectItem>
              <SelectItem value="building-permit">Building Permit</SelectItem>
              <SelectItem value="food-handlers">
                Food Handler's Permit
              </SelectItem>
              <SelectItem value="transport-license">
                Transport License
              </SelectItem>
            </SelectContent>
          </Select>

          <Select value={priorityFilter} onValueChange={onPriorityFilterChange}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>

          {activeFiltersCount > 0 && (
            <Button variant="outline" size="sm" onClick={onClearFilters}>
              <X className="h-4 w-4 mr-2" />
              Clear ({activeFiltersCount})
            </Button>
          )}
        </div>
      </div>

      {activeFiltersCount > 0 && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {statusFilter !== "all" && (
            <Badge variant="secondary">
              Status: {statusFilter}
              <X
                className="h-3 w-3 ml-1 cursor-pointer"
                onClick={() => onStatusFilterChange("all")}
              />
            </Badge>
          )}
          {typeFilter !== "all" && (
            <Badge variant="secondary">
              Type: {typeFilter}
              <X
                className="h-3 w-3 ml-1 cursor-pointer"
                onClick={() => onTypeFilterChange("all")}
              />
            </Badge>
          )}
          {priorityFilter !== "all" && (
            <Badge variant="secondary">
              Priority: {priorityFilter}
              <X
                className="h-3 w-3 ml-1 cursor-pointer"
                onClick={() => onPriorityFilterChange("all")}
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}
