import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";
import Link from "next/link";
import { icons } from "@/lib/data";
import { getCurrentUser, getPermitTypes } from "@/lib/dal";

export default async function ApplyPage() {
  // get the various services offered (permitTypes the county has)
  const services = await getPermitTypes();
  const user = await getCurrentUser();

  return (
    <div className="min-h-screen bg-background">
      {/* The dashboard header */}
      {user ? (
        <DashboardHeader user={user} />
      ) : (
        <div className="p-4 bg-muted">Loading user information...</div>
      )}

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Apply for Permits & Licenses
          </h1>
          <p className="text-muted-foreground">
            Choose the type of permit or license you need to apply for
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    {(() => {
                      const icon = icons.find(
                        (icon) => icon.iconType === service.name
                      );
                      const IconComponent = icon ? icon.iconName : FileText;
                      return <IconComponent className="w-5 h-5 text-primary" />;
                    })()}
                  </div>
                  {!service.isActive && (
                    <Badge variant="secondary">Coming Soon</Badge>
                  )}
                </div>
                <CardTitle className="text-lg">{service.name}</CardTitle>
                <CardDescription className="text-pretty">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Application Fee:</span>
                    <span className="text-primary font-semibold">
                      KES {service.fee}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Processing Time:</span>
                    <span>5-7 days</span>
                  </div>

                  {service.isActive ? (
                    <Button className="w-full" asChild>
                      <Link href={`/apply/business-license/${service.id}`}>
                        Apply Now
                      </Link>
                    </Button>
                  ) : (
                    <Button className="w-full" disabled>
                      Coming Soon
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 p-6 bg-muted/30 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">
            Application Requirements
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-2">General Requirements</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Valid National ID or Passport</li>
                <li>• Completed application form</li>
                <li>• Application fee payment</li>
                <li>• Supporting documents as specified</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2">Processing Information</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Applications reviewed within stated timeframes</li>
                <li>• Email notifications for status updates</li>
                <li>• Additional documents may be requested</li>
                <li>• Appeals process available for rejections</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
