import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Plane, Clock, DollarSign, Map } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-8">
        <nav className="flex justify-between items-center mb-16">
          <div className="flex items-center gap-2">
            <Plane className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">AeroGo</span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="#features"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </Link>
            <Link
              href="#about"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </Link>
            <Link href="/dashboard">
              <Button variant="outline" className="mr-2">
                Log in
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button>Get Started</Button>
            </Link>
          </div>
        </nav>

        <div className="flex flex-col md:flex-row items-center gap-12 py-12">
          <div className="flex-1 space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Find Your <span className="text-primary">Perfect</span> Flight
              Route
            </h1>
            <p className="text-xl text-muted-foreground max-w-md">
              Optimize your travel with our advanced pathfinding algorithm.
              Discover the most efficient routes between cities.
            </p>
            <div className="flex gap-4 pt-4">
              <Link href="/dashboard">
                <Button size="lg" className="gap-2">
                  Plan Your Trip
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="#features">
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex-1 relative h-[400px] w-full rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg z-10"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src="/globe.svg"
                alt="World map with flight routes"
                width={400}
                height={400}
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our flight route optimization system provides everything you need
              for efficient travel planning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg shadow-sm border">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Map className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Optimized Pathfinding
              </h3>
              <p className="text-muted-foreground">
                Utilize advanced algorithms like Dijkstra's or A* to compute the
                most efficient flight routes.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-sm border">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Custom Weighting</h3>
              <p className="text-muted-foreground">
                Prioritize factors such as cost, duration, or number of layovers
                based on your preferences.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-sm border">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Layover Optimization
              </h3>
              <p className="text-muted-foreground">
                Analyze airline schedules to ensure the most time-efficient
                connections between flights.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-4">About AeroGo</h2>
              <p className="text-muted-foreground mb-4">
                AeroGo is a cutting-edge flight route optimization system
                designed to help travelers find the most efficient paths between
                cities.
              </p>
              <p className="text-muted-foreground mb-4">
                Our platform leverages advanced pathfinding algorithms to
                analyze complex flight networks and identify optimal routes
                based on your preferences.
              </p>
              <p className="text-muted-foreground">
                Whether you're looking to minimize travel time, reduce costs, or
                find the perfect balance between both, AeroGo provides
                intelligent recommendations tailored to your needs.
              </p>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="relative h-[300px] w-[300px] rounded-full bg-primary/10 flex items-center justify-center">
                <Plane className="h-24 w-24 text-primary" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Optimize Your Travel?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Start planning your next trip with our intelligent flight route
            optimization system.
          </p>
          <Link href="/dashboard">
            <Button size="lg" className="gap-2">
              Get Started Now
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-background border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Plane className="h-5 w-5 text-primary" />
              <span className="text-lg font-bold">AeroGo</span>
            </div>
            <div className="flex gap-6">
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
          <div className="text-center mt-8 text-sm text-muted-foreground">
            © {new Date().getFullYear()} AeroGo. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
