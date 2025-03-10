"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Plane,
  Clock,
  DollarSign,
  Map,
  Calendar,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";

// Dynamically import the SimpleGlobe component with no SSR
const SimpleGlobe = dynamic(() => import("@/components/SimpleGlobe"), {
  ssr: false,
});

export default function RoutePage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the route data based on the ID
  const routeId = params.id;

  // Sample route data based on ID
  const routeData = {
    "1": {
      from: "New York",
      to: "London",
      fromCode: "JFK",
      toCode: "LHR",
      fromLat: 40.7128,
      fromLng: -74.006,
      toLat: 51.5074,
      toLng: -0.1278,
      algorithm: "Dijkstra's",
      cost: 750,
      time: "7h 30m",
      layovers: 0,
      departureTime: "08:30",
      arrivalTime: "20:00",
      date: "June 15, 2024",
      airline: "British Airways",
      flightNumber: "BA 178",
      aircraft: "Boeing 777-300ER",
      distance: "3,459 miles",
      color: "#ff4d4d",
    },
    "2": {
      from: "Los Angeles",
      to: "Tokyo",
      fromCode: "LAX",
      toCode: "HND",
      fromLat: 34.0522,
      fromLng: -118.2437,
      toLat: 35.6762,
      toLng: 139.6503,
      algorithm: "A*",
      cost: 1250,
      time: "11h 45m",
      layovers: 0,
      departureTime: "10:15",
      arrivalTime: "14:00",
      date: "June 20, 2024",
      airline: "Japan Airlines",
      flightNumber: "JL 62",
      aircraft: "Boeing 787-9",
      distance: "5,478 miles",
      color: "#4da6ff",
    },
    "3": {
      from: "Paris",
      to: "Dubai",
      fromCode: "CDG",
      toCode: "DXB",
      fromLat: 48.8566,
      fromLng: 2.3522,
      toLat: 25.2048,
      toLng: 55.2708,
      algorithm: "Bellman-Ford",
      cost: 820,
      time: "6h 15m",
      layovers: 0,
      departureTime: "14:30",
      arrivalTime: "23:45",
      date: "July 5, 2024",
      airline: "Emirates",
      flightNumber: "EK 76",
      aircraft: "Airbus A380",
      distance: "4,172 miles",
      color: "#ffaa00",
    },
    "4": {
      from: "Sydney",
      to: "Singapore",
      fromCode: "SYD",
      toCode: "SIN",
      fromLat: -33.8688,
      fromLng: 151.2093,
      toLat: 1.3521,
      toLng: 103.8198,
      algorithm: "Dijkstra's",
      cost: 680,
      time: "8h 20m",
      layovers: 0,
      departureTime: "09:20",
      arrivalTime: "14:40",
      date: "July 12, 2024",
      airline: "Singapore Airlines",
      flightNumber: "SQ 212",
      aircraft: "Airbus A350-900",
      distance: "3,915 miles",
      color: "#00cc88",
    },
  }[routeId] || {
    from: "New York",
    to: "London",
    fromCode: "JFK",
    toCode: "LHR",
    fromLat: 40.7128,
    fromLng: -74.006,
    toLat: 51.5074,
    toLng: -0.1278,
    algorithm: "Dijkstra's",
    cost: 750,
    time: "7h 30m",
    layovers: 0,
    departureTime: "08:30",
    arrivalTime: "20:00",
    date: "June 15, 2024",
    airline: "British Airways",
    flightNumber: "BA 178",
    aircraft: "Boeing 777-300ER",
    distance: "3,459 miles",
    color: "#ff4d4d",
  };

  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* Main content */}
      <div className="flex-1">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-lg font-semibold">Flight Route Details</h1>
          </div>
        </header>

        <main className="container mx-auto py-8 px-4">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">
                      {routeData.from} to {routeData.to}
                    </CardTitle>
                    <CardDescription>Route ID: {routeId}</CardDescription>
                  </div>
                  <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">
                    {routeData.algorithm} Algorithm
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex flex-col items-center p-4 bg-muted/50 rounded-lg">
                    <DollarSign className="h-8 w-8 text-primary mb-2" />
                    <span className="text-sm text-muted-foreground">
                      Total Cost
                    </span>
                    <span className="text-2xl font-bold">
                      ${routeData.cost}
                    </span>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-muted/50 rounded-lg">
                    <Clock className="h-8 w-8 text-primary mb-2" />
                    <span className="text-sm text-muted-foreground">
                      Travel Time
                    </span>
                    <span className="text-2xl font-bold">{routeData.time}</span>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-muted/50 rounded-lg">
                    <Plane className="h-8 w-8 text-primary mb-2" />
                    <span className="text-sm text-muted-foreground">
                      Layovers
                    </span>
                    <span className="text-2xl font-bold">
                      {routeData.layovers}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Flight Details</TabsTrigger>
                <TabsTrigger value="map">Route Map</TabsTrigger>
                <TabsTrigger value="alternatives">Alternatives</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-4 pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Flight Information</CardTitle>
                    <CardDescription>
                      Detailed information about your flight
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex items-start">
                        <div className="min-w-[100px] flex flex-col items-center">
                          <div className="text-lg font-bold">
                            {routeData.departureTime}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {routeData.fromCode}
                          </div>
                        </div>
                        <div className="flex-1 px-4">
                          <div className="relative flex flex-col items-center">
                            <div className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-border"></div>
                            <Plane className="z-10 h-6 w-6 rotate-90 bg-background p-1 text-primary" />
                            <div className="mt-2 text-center text-sm text-muted-foreground">
                              {routeData.time}
                            </div>
                          </div>
                        </div>
                        <div className="min-w-[100px] flex flex-col items-center">
                          <div className="text-lg font-bold">
                            {routeData.arrivalTime}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {routeData.toCode}
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h3 className="text-sm font-medium mb-1">
                            Departure
                          </h3>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{routeData.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">
                                {routeData.departureTime} (Local Time)
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Map className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">
                                {routeData.fromCode} Airport
                              </span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium mb-1">Arrival</h3>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{routeData.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">
                                {routeData.arrivalTime} (Local Time)
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Map className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">
                                {routeData.toCode} Airport
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="text-sm font-medium mb-2">
                          Flight Details
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div>
                            <span className="text-xs text-muted-foreground">
                              Airline
                            </span>
                            <p className="text-sm font-medium">
                              {routeData.airline}
                            </p>
                          </div>
                          <div>
                            <span className="text-xs text-muted-foreground">
                              Flight Number
                            </span>
                            <p className="text-sm font-medium">
                              {routeData.flightNumber}
                            </p>
                          </div>
                          <div>
                            <span className="text-xs text-muted-foreground">
                              Aircraft
                            </span>
                            <p className="text-sm font-medium">
                              {routeData.aircraft}
                            </p>
                          </div>
                          <div>
                            <span className="text-xs text-muted-foreground">
                              Distance
                            </span>
                            <p className="text-sm font-medium">
                              {routeData.distance}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="map" className="space-y-4 pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Route Visualization</CardTitle>
                    <CardDescription>
                      Visual representation of your flight path
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video rounded-lg overflow-hidden border">
                      <SimpleGlobe
                        width="100%"
                        height="100%"
                        routes={[
                          {
                            startLat: routeData.fromLat,
                            startLng: routeData.fromLng,
                            endLat: routeData.toLat,
                            endLng: routeData.toLng,
                            color: routeData.color,
                          },
                        ]}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="alternatives" className="space-y-4 pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Alternative Routes</CardTitle>
                    <CardDescription>
                      Other possible routes based on different algorithms
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="rounded-lg border bg-card p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">A* Algorithm</Badge>
                            <span className="text-sm font-medium">
                              {routeData.from} to {routeData.to}
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-sm font-medium">
                              ${Math.round(routeData.cost * 0.85)}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          <Clock className="h-4 w-4" />
                          <span>{routeData.time.replace("7h", "9h")}</span>
                          <span className="mx-2">•</span>
                          <span>1 Layover</span>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full mt-2"
                        >
                          View Details
                        </Button>
                      </div>

                      <div className="rounded-lg border bg-card p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">
                              Bellman-Ford Algorithm
                            </Badge>
                            <span className="text-sm font-medium">
                              {routeData.from} to {routeData.to}
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-sm font-medium">
                              ${Math.round(routeData.cost * 0.75)}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          <Clock className="h-4 w-4" />
                          <span>{routeData.time.replace("7h", "11h")}</span>
                          <span className="mx-2">•</span>
                          <span>2 Layovers</span>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full mt-2"
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="flex justify-between">
              <Link href="/dashboard">
                <Button variant="outline" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Dashboard
                </Button>
              </Link>
              <Button className="gap-2">
                Book This Flight
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
