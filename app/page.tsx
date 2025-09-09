import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, CheckCircle, FileText, Shield, Users } from "lucide-react";
import Link from "next/link";

// services data
const services = [
  {
    title: "Business License",
    description:
      "Register your business and obtain necessary operating licenses",
    icon: FileText,
    fee: "KES 2,500",
    duration: "5-7 days",
  },
  {
    title: "Building Permit",
    description: "Get approval for construction and renovation projects",
    icon: Shield,
    fee: "KES 5,000",
    duration: "10-14 days",
  },
  {
    title: "Food Handler's Permit",
    description: "Certification for food service establishments",
    icon: CheckCircle,
    fee: "KES 1,000",
    duration: "3-5 days",
  },
  {
    title: "Liquor License",
    description: "License for selling alcoholic beverages",
    icon: FileText,
    fee: "KES 10,000",
    duration: "14-21 days",
  },
  {
    title: "Transport License",
    description: "Commercial vehicle and transport service permits",
    icon: Users,
    fee: "KES 3,000",
    duration: "7-10 days",
  },
  {
    title: "Environmental Permit",
    description: "Environmental impact assessment and compliance",
    icon: Shield,
    fee: "KES 7,500",
    duration: "21-30 days",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <header className="border-b shadow-lg bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* county logo div */}
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary-foreground" />
              </div>
              {/* county name and system name */}
              <div>
                <h1 className="font-bold text-lg text-balance">
                  Murang`a County
                </h1>
                <p className="text-sm text-muted-foreground">
                  Permits & Licensing
                </p>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="#services"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Services
              </Link>
              <a
                href="#about"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                About
              </a>
              <a
                href="#contact"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Contact
              </a>
              <Button variant="outline" size="sm" asChild>
                <a href="/login">Sign In</a>
              </Button>
              <Button size="sm" asChild>
                <a href="/signup">Apply Now</a>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 text-center">
          {/* Info Badge */}
          <Badge variant="secondary" className="mb-4">
            Official Government Platform
          </Badge>
          {/* main platform title */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
            Digital Permits &<br />
            <span className="text-primary">Licensing Platform</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            Apply for business licenses, building permits, and other county
            services online. Fast, secure, and transparent processing for all
            Murang'a County residents.
          </p>
          {/* Application buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8">
              Start Application
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 bg-transparent"
            >
              Track Application
            </Button>
          </div>
        </div>
      </section>

      {/* Services section */}
      <section id="services" className="py-20">
        <div className="container mx-auto px-4">
          {/* Services welcome text */}
          <div className="text-center mb-16">
            <h2 className="font-bold text-3xl md:text-4xl mb-4 text-balance">
              Available Services
            </h2>
            <p className="text-lg text-pretty max-w-2xl mx-auto text-muted-foreground">
              Apply for various permits and licenses through our streamlined
              digital platform
            </p>
          </div>
          {/* Services card */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* mapp each service data to a card component */}

            {services.map((service, index) => {
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <service.icon className="w-5 h-5 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{service.title}</CardTitle>
                    </div>
                    <CardDescription className="text-pretty">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center mb-4">
                      <div className="text-sm">
                        <span className="font-medium">Fee:</span> {service.fee}
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Duration:</span>{" "}
                        {service.duration}
                      </div>
                    </div>
                    <Button className="w-full">Apply Now</Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
