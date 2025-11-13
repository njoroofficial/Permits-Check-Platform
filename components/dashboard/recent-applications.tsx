import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Eye } from "lucide-react";
import Link from "next/link";
import { ApplicationSummary, statusColors } from "@/types/application";

interface RecentApplicationsProps {
  applications: ApplicationSummary[];
}

export function RecentApplications({ applications }: RecentApplicationsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Recent Applications
        </CardTitle>
        <CardDescription>
          Your latest permit and license applications
        </CardDescription>
      </CardHeader>
      <CardContent>
        {applications.length === 0 ? (
          <div className="text-center py-8">
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">No applications yet</p>
            <Link href="/apply">
              <Button>Start Your First Application</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map((app) => (
              <div
                key={app.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-medium">{app.type}</h4>
                    <Badge
                      className={statusColors[app.status]}
                      variant="secondary"
                    >
                      {app.status.replace("-", " ")}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Submitted: {app.submittedDate} • Fee: {app.fee}
                  </div>
                </div>
                <Link href={`/applications/${app.id}`}>
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    View
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
