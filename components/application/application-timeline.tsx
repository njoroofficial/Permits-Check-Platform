import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  DollarSign,
} from "lucide-react";
import { ApplicationStatus } from "@/lib/generated/prisma";

interface TimelineEvent {
  id: string;
  status: ApplicationStatus;
  comment: string | null;
  createdAt: Date;
  updatedBy: {
    firstName: string;
    lastName: string;
  };
}

interface ApplicationTimelineProps {
  timeline: TimelineEvent[];
}

const statusConfig: Record<
  ApplicationStatus,
  { icon: React.ReactNode; color: string; label: string }
> = {
  DRAFT: {
    icon: <FileText className="w-5 h-5 text-gray-600" />,
    color: "text-gray-600",
    label: "Draft Created",
  },
  SUBMITTED: {
    icon: <CheckCircle2 className="w-5 h-5 text-blue-600" />,
    color: "text-blue-600",
    label: "Application Submitted",
  },
  UNDER_REVIEW: {
    icon: <Clock className="w-5 h-5 text-yellow-600" />,
    color: "text-yellow-600",
    label: "Under Review",
  },
  APPROVED: {
    icon: <CheckCircle2 className="w-5 h-5 text-green-600" />,
    color: "text-green-600",
    label: "Application Approved",
  },
  REJECTED: {
    icon: <AlertCircle className="w-5 h-5 text-red-600" />,
    color: "text-red-600",
    label: "Application Rejected",
  },
  PAYMENT_PENDING: {
    icon: <DollarSign className="w-5 h-5 text-orange-600" />,
    color: "text-orange-600",
    label: "Payment Pending",
  },
  COMPLETED: {
    icon: <CheckCircle2 className="w-5 h-5 text-emerald-600" />,
    color: "text-emerald-600",
    label: "Completed",
  },
};

export function ApplicationTimeline({ timeline }: ApplicationTimelineProps) {
  if (timeline.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Application Timeline</CardTitle>
          <CardDescription>
            Track the progress of your application
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-4">
            No status updates yet.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Application Timeline</CardTitle>
        <CardDescription>
          Track the progress of your application
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {timeline.map((event, index) => {
            const config = statusConfig[event.status];
            const formattedDate = new Date(event.createdAt).toLocaleDateString(
              "en-KE",
              {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              }
            );

            return (
              <div key={event.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center">
                    {config.icon}
                  </div>
                  {index < timeline.length - 1 && (
                    <div className="w-0.5 h-12 bg-border mt-2" />
                  )}
                </div>
                <div className="pb-6 flex-1">
                  <h4 className={`font-semibold ${config.color}`}>
                    {config.label}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {formattedDate}
                  </p>
                  {event.comment && (
                    <p className="text-sm mt-1">{event.comment}</p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    By: {event.updatedBy.firstName} {event.updatedBy.lastName}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
