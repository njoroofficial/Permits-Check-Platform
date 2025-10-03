"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FileText,
  CheckCircle,
  Building,
  Truck,
  BottleWine,
} from "lucide-react";
import { getPermitTypes } from "@/app/actions/permits";
import { useEffect, useState } from "react";

const icons = [
  {
    iconType: "Business License",
    iconName: FileText,
  },
  {
    iconType: "Building Permit",
    iconName: Building,
  },
  {
    iconType: "Food Handler's Permit",
    iconName: CheckCircle,
  },
  { iconType: "Transport License", iconName: Truck },
  { iconType: "Liquor License", iconName: BottleWine },
];

type PermitType = {
  id: string;
  name: string;
  description: string | null;
  fee: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export function QuickActions() {
  const [services, setServices] = useState<PermitType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // get permits types
  useEffect(() => {
    const fetchPermits = async () => {
      try {
        const permitData = await getPermitTypes();
        const normalized = (permitData as any[]).map((p) => ({
          ...p,
          fee: Number(p.fee),
        }));
        setServices(normalized);
      } catch (error) {
        console.error("Failed to fetch permits data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPermits();
  }, []);
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
                  {(() => {
                    const icon = icons.find(
                      (icon) => icon.iconType === service.name
                    );
                    const IconComponent = icon ? icon.iconName : FileText;
                    return <IconComponent className="w-5 h-5 text-primary" />;
                  })()}
                </div>
                <div>
                  <h4 className="font-medium text-sm">{service.name}</h4>
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
