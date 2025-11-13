import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  User,
  Mail,
  Phone,
  FileText,
  DollarSign,
} from "lucide-react";
import { ApplicationStatus } from "@/lib/generated/prisma";

interface ApplicationDetailsProps {
  application: {
    id: string;
    applicationNumber: string;
    status: ApplicationStatus;
    businessName: string | null;
    businessType: string | null;
    businessAddress: string | null;
    submittedAt: Date | null;
    createdAt: Date;
    permitType: {
      name: string;
      fee: string; // Serialized Decimal as string
    };
  };
  user: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string | null;
  };
}

const statusConfig: Record<
  ApplicationStatus,
  {
    variant: "default" | "secondary" | "destructive" | "outline";
    label: string;
    color: string;
  }
> = {
  DRAFT: {
    variant: "outline",
    label: "Draft",
    color: "bg-gray-100 text-gray-800",
  },
  SUBMITTED: {
    variant: "secondary",
    label: "Submitted",
    color: "bg-blue-100 text-blue-800",
  },
  UNDER_REVIEW: {
    variant: "default",
    label: "Under Review",
    color: "bg-yellow-100 text-yellow-800",
  },
  APPROVED: {
    variant: "default",
    label: "Approved",
    color: "bg-green-100 text-green-800",
  },
  REJECTED: {
    variant: "destructive",
    label: "Rejected",
    color: "bg-red-100 text-red-800",
  },
  PAYMENT_PENDING: {
    variant: "secondary",
    label: "Payment Pending",
    color: "bg-orange-100 text-orange-800",
  },
  COMPLETED: {
    variant: "default",
    label: "Completed",
    color: "bg-emerald-100 text-emerald-800",
  },
};

export function ApplicationDetails({
  application,
  user,
}: ApplicationDetailsProps) {
  const statusInfo = statusConfig[application.status];
  const submittedDate = application.submittedAt
    ? new Date(application.submittedAt).toLocaleDateString("en-KE", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Not submitted yet";

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle className="text-2xl">
              {application.permitType.name}
            </CardTitle>
            <CardDescription>
              Application #: {application.applicationNumber}
            </CardDescription>
          </div>
          <Badge className={statusInfo.color}>{statusInfo.label}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Description */}
        {(application.businessName || application.businessType) && (
          <div>
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" />
              Business Information
            </h3>
            <div className="space-y-1 text-muted-foreground">
              {application.businessName && (
                <p>
                  <span className="font-medium text-foreground">Name:</span>{" "}
                  {application.businessName}
                </p>
              )}
              {application.businessType && (
                <p>
                  <span className="font-medium text-foreground">Type:</span>{" "}
                  {application.businessType}
                </p>
              )}
              {application.businessAddress && (
                <p>
                  <span className="font-medium text-foreground">Address:</span>{" "}
                  {application.businessAddress}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Applicant Information */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-3">Applicant Information</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <User className="w-4 h-4 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">
                    {user.firstName} {user.lastName}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{user.email}</p>
                </div>
              </div>
              {user.phoneNumber && (
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">{user.phoneNumber}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Application Details */}
          <div>
            <h3 className="font-semibold mb-3">Application Details</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">
                    Submitted Date
                  </p>
                  <p className="font-medium">{submittedDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <DollarSign className="w-4 h-4 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">
                    Application Fee
                  </p>
                  <p className="font-medium text-lg text-primary">
                    KES{" "}
                    {parseFloat(application.permitType.fee).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
