import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, CheckCircle, Building, Truck } from "lucide-react";

const services = [
  {
    title: "Business License",
    description: "Register your business",
    icon: FileText,
    fee: "KES 2,500",
    href: "/apply/business-license",
  },
  {
    title: "Building Permit",
    description: "Construction approval",
    icon: Building,
    fee: "KES 5,000",
    href: "/apply/building-permit",
  },
  {
    title: "Food Handler's Permit",
    description: "Food service certification",
    icon: CheckCircle,
    fee: "KES 1,000",
    href: "/apply/food-handlers",
  },
  {
    title: "Transport License",
    description: "Commercial vehicle permit",
    icon: Truck,
    fee: "KES 3,000",
    href: "/apply/transport-license",
  },
];

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>
          Start a new permit or license application
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          {services.map((service, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <service.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">{service.title}</h4>
                  <p className="text-xs text-muted-foreground">
                    {service.description}
                  </p>
                  <p className="text-xs font-medium text-primary">
                    {service.fee}
                  </p>
                </div>
              </div>
              <Button size="sm">Apply</Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
