import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle2, Clock, AlertCircle } from "lucide-react";

interface TimelineEvent {
  id: string;
  status: string;
  date: string;
  description: string;
}

interface ApplicationTimelineProps {
  timeline: TimelineEvent[];
}

export function ApplicationTimeline({ timeline }: ApplicationTimelineProps) {
  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case "rejected":
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Clock className="w-5 h-5 text-blue-600" />;
    }
  };

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
          {timeline.map((event, index) => (
            <div key={event.id} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center">
                  {getStatusIcon(event.status)}
                </div>
                {index < timeline.length - 1 && (
                  <div className="w-0.5 h-12 bg-border mt-2" />
                )}
              </div>
              <div className="pb-6">
                <h4 className="font-semibold">{event.status}</h4>
                <p className="text-sm text-muted-foreground">{event.date}</p>
                <p className="text-sm mt-1">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
