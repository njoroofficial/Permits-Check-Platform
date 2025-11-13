"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Eye, CheckCircle, XCircle, Clock } from "lucide-react";

interface Application {
  id: string;
  applicantName: string;
  applicationType: string;
  status: "pending" | "under-review" | "approved" | "rejected";
  submittedDate: string;
  fee: string;
  priority: "high" | "medium" | "low";
  daysRemaining: number;
}

interface ApplicationReviewCardProps {
  application: Application;
  onReview: (id: string) => void;
  onApprove: (id: string, applicantName: string) => void;
  onReject: (id: string, applicantName: string) => void;
}

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  "under-review": "bg-blue-100 text-blue-800",
  approved: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
};

const priorityColors = {
  high: "bg-red-100 text-red-800",
  medium: "bg-yellow-100 text-yellow-800",
  low: "bg-green-100 text-green-800",
};

export function ApplicationReviewCard({
  application,
  onReview,
  onApprove,
  onReject,
}: ApplicationReviewCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-primary/10 text-primary">
                {application.applicantName.charAt(0).toUpperCase() || "?"}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">
                {application.applicantName}
              </CardTitle>
              <CardDescription>{application.applicationType}</CardDescription>
            </div>
          </div>
          <div className="flex flex-col gap-2 items-end">
            <Badge
              className={statusColors[application.status]}
              variant="secondary"
            >
              {application.status.replace("-", " ")}
            </Badge>
            <Badge
              className={priorityColors[application.priority]}
              variant="secondary"
            >
              {application.priority} priority
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 text-sm mb-4">
          <div>
            <span className="font-medium">Submitted:</span>{" "}
            {application.submittedDate}
          </div>
          <div>
            <span className="font-medium">Fee:</span> {application.fee}
          </div>
          <div>
            <span className="font-medium">Application ID:</span>{" "}
            {application.id}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span className="font-medium">
              {application.daysRemaining} days remaining
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onReview(application.id)}
            className="flex-1"
          >
            <Eye className="w-4 h-4 mr-2" />
            Review
          </Button>
          {application.status === "pending" ||
          application.status === "under-review" ? (
            <>
              <Button
                size="sm"
                onClick={() =>
                  onApprove(application.id, application.applicantName)
                }
                className="bg-green-600 hover:bg-green-700"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Approve
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() =>
                  onReject(application.id, application.applicantName)
                }
                className="bg-red-600 hover:bg-red-700"
              >
                <XCircle className="w-4 h-4 mr-2" />
                Reject
              </Button>
            </>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
