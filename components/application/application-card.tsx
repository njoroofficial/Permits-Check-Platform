import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ApplicationStatus } from "@/lib/generated/prisma";
import { getRelativeTime } from "@/lib/utils";
import { FileTextIcon, ClockIcon, ArrowRightIcon } from "lucide-react";

interface ApplicationCardProps {
  id: string;
  applicationNumber: string;
  status: ApplicationStatus;
  businessName: string | null;
  createdAt: Date;
  permitType?: {
    name: string;
  };
}

const statusConfig: Record<
  ApplicationStatus,
  {
    variant: "default" | "secondary" | "destructive" | "outline";
    label: string;
  }
> = {
  DRAFT: { variant: "outline", label: "Draft" },
  SUBMITTED: { variant: "secondary", label: "Submitted" },
  UNDER_REVIEW: { variant: "default", label: "Under Review" },
  APPROVED: { variant: "default", label: "Approved" },
  REJECTED: { variant: "destructive", label: "Rejected" },
  PAYMENT_PENDING: { variant: "secondary", label: "Payment Pending" },
  COMPLETED: { variant: "default", label: "Completed" },
};

export function ApplicationCard({
  id,
  applicationNumber,
  status,
  businessName,
  createdAt,
  permitType,
}: ApplicationCardProps) {
  const statusInfo = statusConfig[status];

  return (
    <Link
      href={`/applications/${applicationNumber}`}
      className="group block transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-xl"
    >
      <Card className="h-full transition-all group-hover:shadow-md group-hover:border-primary/50 cursor-pointer">
        <CardHeader>
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <CardTitle className="text-lg flex items-center gap-2 group-hover:text-primary transition-colors">
                <FileTextIcon className="size-5 flex-shrink-0" />
                <span className="truncate">
                  {businessName || "Untitled Application"}
                </span>
              </CardTitle>
              <CardDescription className="mt-2 flex items-center gap-1.5">
                <span className="font-mono text-xs">{applicationNumber}</span>
              </CardDescription>
            </div>
            <Badge variant={statusInfo.variant} className="shrink-0">
              {statusInfo.label}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-3">
          {permitType && (
            <div className="text-sm">
              <span className="text-muted-foreground">Permit Type: </span>
              <span className="font-medium">{permitType.name}</span>
            </div>
          )}

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <ClockIcon className="size-4" />
              <span>{getRelativeTime(createdAt)}</span>
            </div>

            <div className="flex items-center gap-1 text-primary font-medium group-hover:gap-2 transition-all">
              <span>View details</span>
              <ArrowRightIcon className="size-4" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
