import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Clock, CheckCircle, XCircle } from "lucide-react";
import { DashboardStats } from "@/types/dashboard";

interface StatsCardsProps {
  stats: DashboardStats;
}

export function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      title: "Total Applications",
      value: stats.total,
      icon: FileText,
      description: "All submitted applications",
    },
    {
      title: "Pending Review",
      value: stats.pending,
      icon: Clock,
      description: "Awaiting officer review",
    },
    {
      title: "Approved",
      value: stats.approved,
      icon: CheckCircle,
      description: "Successfully approved",
    },
    {
      title: "Rejected",
      value: stats.rejected,
      icon: XCircle,
      description: "Requires attention",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            <card.icon className="h-4 w-4 text-muted-foreground" />
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
