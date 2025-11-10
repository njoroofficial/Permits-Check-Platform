import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, Mail, Phone, FileText } from "lucide-react";

interface ApplicationDetailsProps {
  application: {
    id: string;
    type: string;
    status: "pending" | "under-review" | "approved" | "rejected";
    submittedDate: string;
    fee: string;
    applicantName: string;
    applicantEmail: string;
    applicantPhone: string;
    description: string;
  };
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  "under-review": "bg-blue-100 text-blue-800",
  approved: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
};

const statusLabels: Record<string, string> = {
  pending: "Pending",
  "under-review": "Under Review",
  approved: "Approved",
  rejected: "Rejected",
};

export function ApplicationDetails({ application }: ApplicationDetailsProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle className="text-2xl">{application.type}</CardTitle>
            <CardDescription>Application ID: {application.id}</CardDescription>
          </div>
          <Badge className={statusColors[application.status]}>
            {statusLabels[application.status]}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Description */}
        <div>
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            <FileText className="w-4 h-4 text-primary" />
            Application Description
          </h3>
          <p className="text-muted-foreground">{application.description}</p>
        </div>

        {/* Applicant Information */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-3">Applicant Information</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <User className="w-4 h-4 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">{application.applicantName}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{application.applicantEmail}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{application.applicantPhone}</p>
                </div>
              </div>
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
                  <p className="font-medium">{application.submittedDate}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Application Fee</p>
                <p className="font-medium text-lg text-primary">
                  {application.fee}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
