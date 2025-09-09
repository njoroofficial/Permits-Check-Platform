import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
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
    </div>
  );
}
