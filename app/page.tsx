import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Shield } from "lucide-react";

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
              <a
                href="#services"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Services
              </a>
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
    </div>
  );
}
