import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  CheckCircle,
  FileText,
  Mail,
  MapPin,
  Phone,
  Shield,
  Users,
} from "lucide-react";
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

// Application Process
const applicationProcesses = [
  {
    step: "01",
    title: "Create Account",
    description: "Register with your ID number and contact information",
  },
  {
    step: "02",
    title: "Fill Application",
    description: "Complete the online form with required details",
  },
  {
    step: "03",
    title: "Submit Documents",
    description: "Upload necessary supporting documents",
  },
  {
    step: "04",
    title: "Track Progress",
    description: "Monitor your application status in real-time",
  },
];

// contact data
const contactCards = [
  {
    icon: Phone,
    title: "Phone Support",
    description: "Call us during business hours",
    contactMethod: "+254 704 125 004",
    time: "Mon-Fri: 8AM-5PM",
  },
  {
    icon: Mail,
    title: "Email Support",
    description: "Send us your questions",
    contactMethod: "permits@muranga.go.ke",
    time: "Response within 24hrs",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    description: "County Headquarters",
    contactMethod: "Murang'a Town",
    time: "Mon-Fri: 8AM-5PM",
  },
];

// footer data
const footerInfor = [
  {
    title: "Services",
    infoType: [
      "Business Licenses",
      "Building Permits",
      "Food Handler's Permits",
      "Transport Licenses",
    ],
  },
  {
    title: "Support",
    infoType: ["Help Center", "Application Status", "Contact Support", "FAQs"],
  },
  {
    title: "Legal",
    infoType: [
      "Privacy Policy",
      "Terms of Service",
      "Data Protection",
      "Accessibility",
    ],
  },
];

// get current year
const currentYear = new Date().getFullYear();

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
              <Link
                href="#about"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                About
              </Link>
              <Link
                href="#contact"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Contact
              </Link>
              <Button variant="outline" size="sm" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/signup">Apply Now</Link>
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

            {services.map((service, index) => (
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
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          {/* Application Process welcome text */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
              Simple Application Process
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Our streamlined process makes it easy to apply for and track your
              permits
            </p>
          </div>
          {/* Application steps */}
          <div className="grid md:grid-cols-4 gap-8">
            {/* Mapp each application process step */}
            {applicationProcesses.map((applicationProcess, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {applicationProcess.step}
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  {applicationProcess.title}
                </h3>
                <p className="text-muted-foreground text-pretty">
                  {applicationProcess.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About section */}
      <section id="about" className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* About section first grid */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">
                About Murang'a County Digital Services
              </h2>
              <p className="text-lg text-muted-foreground text-pretty mb-6">
                We are committed to providing efficient, transparent, and
                accessible government services to all residents of Murang'a
                County. Our digital platform eliminates bureaucratic delays and
                ensures fair processing of all applications.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span>Fast Processing</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span>Transparent Fees</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span>Real-time Tracking</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span>Secure Platform</span>
                </div>
              </div>
              <Button size="lg">Learn More</Button>
            </div>
            {/* About section statistics grid */}
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    5,000+
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Applications Processed
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    24/7
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Online Access
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    95%
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Satisfaction Rate
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    3 Days
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Average Processing
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact section */}
      <section id="contact" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          {/* contact section welcome text */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
              Contact Us
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
              Need help with your application? Our support team is here to
              assist you
            </p>
          </div>
          {/* contact section cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* mapping contact data to a card */}
            {contactCards.map((contactCard, index) => (
              <Card key={index}>
                <CardHeader className="text-center">
                  <contactCard.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                  <CardTitle>{contactCard.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="mb-2 text-muted-foreground">
                    {contactCard.description}
                  </p>
                  <p className="font-semibold mb-1">
                    {contactCard.contactMethod}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {contactCard.time}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Page footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {/* first footer div */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-primary-foreground/20 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold">Murang'a County</h3>
                  <p className="text-sm opacity-80">Permits & Licensing</p>
                </div>
              </div>
              <p className="text-sm opacity-80 text-pretty">
                Official digital platform for Murang'a County government
                services.
              </p>
            </div>
            {/* second footer div */}
            {/* mappinh footerInfor to eah div element */}
            {footerInfor.map((info, index) => (
              <div key={index}>
                <h4 className="font-semibold mb-4">{info.title}</h4>
                <ul className="space-y-2 text-sm opacity-80">
                  {info.infoType.map((singleInfor, index) => (
                    <li key={index}>{singleInfor}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
            <p className="text-sm opacity-80">
              © {currentYear} Murang'a County Government. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
