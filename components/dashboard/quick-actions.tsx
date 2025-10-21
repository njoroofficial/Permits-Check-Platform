import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { icons } from "@/lib/data";
import { FileText } from "lucide-react";
import { getPermitTypes } from "@/lib/dal";

export async function QuickActions() {
  // get the various services offered (permitTypes the county has)
  const services = await getPermitTypes();

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
                    KES {service.fee}
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
