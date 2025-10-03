"use client";

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
import { useEffect, useState } from "react";
import { getPermitTypes } from "@/app/actions/permits";
import { PermitType } from "@/app/actions/permits";
import { icons } from "@/lib/data";

export default function ApplyPage() {
  const [services, setServices] = useState<PermitType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // get permits types
  useEffect(() => {
    const fetchPermits = async () => {
      try {
        const permitData = await getPermitTypes();
        setServices(permitData);
      } catch (error) {
        console.error("Failed to fetch permits data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPermits();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

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
                      <Link href="/dashboard">Apply Now</Link>
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
