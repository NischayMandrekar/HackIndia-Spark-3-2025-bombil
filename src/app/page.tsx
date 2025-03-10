"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Plane, Clock, DollarSign, Map } from "lucide-react";
import dynamic from "next/dynamic";

// Dynamically import the SimpleGlobe component with no SSR
// This is necessary because Three.js requires the window object which is not available during SSR
const SimpleGlobe = dynamic(() => import("@/components/SimpleGlobe"), {
  ssr: false,
});

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <header className="relative h-screen w-full overflow-hidden">
        {/* Globe Background */}
        <div className="absolute inset-0 z-0">
          <SimpleGlobe width="100%" height="95%" />
        </div>

        {/* Overlay gradient for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-background/30 via-background/70 to-background/90 z-10"></div>

        {/* Content */}
        <div className="relative z-20 container mx-auto px-4 py-8 h-full flex flex-col">
          <nav className="flex justify-between items-center backdrop-blur-md bg-background/20 p-4 rounded-lg border border-primary/20 shadow-lg shadow-primary/5">
            <div className="flex items-center gap-2">
              <Plane className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                AeroGo
              </span>
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
                <Button
                  variant="outline"
                  className="mr-2 backdrop-blur-md bg-background/30 border-primary/20 hover:bg-background/50 transition-all"
                >
                  Log in
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button className="backdrop-blur-md bg-gradient-to-r from-primary/90 to-primary/70 hover:from-primary hover:to-primary/80 border-0 transition-all">
                  Get Started
                </Button>
              </Link>
            </div>
          </nav>

          <div className="flex-1 flex items-center">
            <div className="max-w-2xl space-y-6 backdrop-blur-md bg-background/20 p-8 rounded-lg border border-primary/20 shadow-lg shadow-primary/5">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Find Your{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                  Perfect
                </span>{" "}
                Flight Route
              </h1>
              <p className="text-xl text-foreground/80 max-w-md">
                Optimize your travel with our advanced pathfinding algorithm.
                Discover the most efficient routes between cities.
              </p>
              <div className="flex gap-4 pt-4">
                <Link href="/dashboard">
                  <Button
                    size="lg"
                    className="gap-2 backdrop-blur-md bg-gradient-to-r from-primary/90 to-primary/70 hover:from-primary hover:to-primary/80 border-0 transition-all shadow-md shadow-primary/10"
                  >
                    Plan Your Trip
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#features">
                  <Button
                    size="lg"
                    variant="outline"
                    className="backdrop-blur-md bg-background/30 border-primary/20 hover:bg-background/50 transition-all shadow-md shadow-primary/5"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section
        id="features"
        className="py-24 bg-gradient-to-b from-background via-muted/30 to-background"
      >
        <div className="container  bg-gradient-to-br from-background/30 via-background/70 to-background/90 z-10 mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              Powerful Features
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our flight route optimization system provides everything you need
              for efficient travel planning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="backdrop-blur-md bg-card/60 p-6 rounded-lg shadow-lg shadow-primary/5 border border-primary/10 hover:border-primary/30 transition-all hover:shadow-xl hover:shadow-primary/10 group">
              <div className="h-12 w-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:from-primary/30 group-hover:to-primary/20 transition-all">
                <Map className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                Optimized Pathfinding
              </h3>
              <p className="text-muted-foreground">
                Utilize advanced algorithms like Dijkstra's or A* to compute the
                most efficient flight routes.
              </p>
            </div>

            <div className="backdrop-blur-md bg-card/60 p-6 rounded-lg shadow-lg shadow-primary/5 border border-primary/10 hover:border-primary/30 transition-all hover:shadow-xl hover:shadow-primary/10 group">
              <div className="h-12 w-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:from-primary/30 group-hover:to-primary/20 transition-all">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                Custom Weighting
              </h3>
              <p className="text-muted-foreground">
                Prioritize factors such as cost, duration, or number of layovers
                based on your preferences.
              </p>
            </div>

            <div className="backdrop-blur-md bg-card/60 p-6 rounded-lg shadow-lg shadow-primary/5 border border-primary/10 hover:border-primary/30 transition-all hover:shadow-xl hover:shadow-primary/10 group">
              <div className="h-12 w-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:from-primary/30 group-hover:to-primary/20 transition-all">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
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
      <section
        id="about"
        className="py-24 bg-gradient-to-b from-background via-muted/20 to-background"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 backdrop-blur-md bg-card/50 p-8 rounded-lg border border-primary/10 shadow-lg shadow-primary/5">
              <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                About AeroGo
              </h2>
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
              <div className="relative h-[300px] w-[300px] rounded-full bg-gradient-to-br from-primary/20 to-primary/5 backdrop-blur-md flex items-center justify-center border border-primary/20 shadow-lg shadow-primary/10">
                <div className="absolute inset-0 rounded-full  bg-gradient-to-br from-background/30 via-background/70 to-background/90 z-10 backdrop-blur-md animate-pulse"></div>
                <Plane className="h-24 w-24 text-primary" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary/10 via-background/80 to-primary/10">
        <div className="container mx-auto px-4 text-center">
          <div className="backdrop-blur-md bg-background/20 p-8 rounded-lg border border-primary/20 max-w-3xl mx-auto shadow-lg shadow-primary/5">
            <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              Ready to Optimize Your Travel?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Start planning your next trip with our intelligent flight route
              optimization system.
            </p>
            <Link href="/dashboard">
              <Button
                size="lg"
                className="gap-2 backdrop-blur-md bg-gradient-to-r from-primary/90 to-primary/70 hover:from-primary hover:to-primary/80 border-0 transition-all shadow-md shadow-primary/10"
              >
                Get Started Now
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gradient-to-t from-background to-background/90 backdrop-blur-md border-t border-primary/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Plane className="h-5 w-5 text-primary" />
              <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                AeroGo
              </span>
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
