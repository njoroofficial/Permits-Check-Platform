import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  TrendingUp,
  Users,
} from "lucide-react";

interface OfficerStatsProps {
  stats: {
    totalApplications: number;
    pendingReview: number;
    approvedToday: number;
    rejectedToday: number;
    averageProcessingTime: number;
    activeApplicants: number;
  };
}

export function OfficerStats({ stats }: OfficerStatsProps) {
  const cards = [
    {
      title: "Total Applications",
      value: stats.totalApplications,
      icon: FileText,
      description: "All applications in system",
      color: "text-blue-600",
    },
    {
      title: "Pending Review",
      value: stats.pendingReview,
      icon: Clock,
      description: "Awaiting officer action",
      color: "text-yellow-600",
    },
    {
      title: "Approved Today",
      value: stats.approvedToday,
      icon: CheckCircle,
      description: "Applications approved",
      color: "text-green-600",
    },
    {
      title: "Rejected Today",
      value: stats.rejectedToday,
      icon: XCircle,
      description: "Applications rejected",
      color: "text-red-600",
    },
    {
      title: "Avg. Processing",
      value: `${stats.averageProcessingTime}d`,
      icon: TrendingUp,
      description: "Average processing time",
      color: "text-purple-600",
    },
    {
      title: "Active Applicants",
      value: stats.activeApplicants,
      icon: Users,
      description: "Unique applicants",
      color: "text-indigo-600",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {cards.map((card, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            <card.icon className={`h-4 w-4 ${card.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.value}</div>
            <p className="text-xs text-muted-foreground">{card.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
