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

export default function RoutePage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the route data based on the ID
  const routeId = params.id;

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
                      New York to London
                    </CardTitle>
                    <CardDescription>Route ID: {routeId}</CardDescription>
                  </div>
                  <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">
                    Dijkstra's Algorithm
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
                    <span className="text-2xl font-bold">$750</span>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-muted/50 rounded-lg">
                    <Clock className="h-8 w-8 text-primary mb-2" />
                    <span className="text-sm text-muted-foreground">
                      Travel Time
                    </span>
                    <span className="text-2xl font-bold">7h 30m</span>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-muted/50 rounded-lg">
                    <Plane className="h-8 w-8 text-primary mb-2" />
                    <span className="text-sm text-muted-foreground">
                      Layovers
                    </span>
                    <span className="text-2xl font-bold">0</span>
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
                          <div className="text-lg font-bold">08:30</div>
                          <div className="text-sm text-muted-foreground">
                            JFK
                          </div>
                        </div>
                        <div className="flex-1 px-4">
                          <div className="relative flex flex-col items-center">
                            <div className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-border"></div>
                            <Plane className="z-10 h-6 w-6 rotate-90 bg-background p-1 text-primary" />
                            <div className="mt-2 text-center text-sm text-muted-foreground">
                              7h 30m
                            </div>
                          </div>
                        </div>
                        <div className="min-w-[100px] flex flex-col items-center">
                          <div className="text-lg font-bold">20:00</div>
                          <div className="text-sm text-muted-foreground">
                            LHR
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
                              <span className="text-sm">June 15, 2024</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">
                                08:30 AM (Local Time)
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Map className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">
                                John F. Kennedy International Airport
                              </span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium mb-1">Arrival</h3>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">June 15, 2024</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">
                                08:00 PM (Local Time)
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Map className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">
                                London Heathrow Airport
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
                              British Airways
                            </p>
                          </div>
                          <div>
                            <span className="text-xs text-muted-foreground">
                              Flight Number
                            </span>
                            <p className="text-sm font-medium">BA 178</p>
                          </div>
                          <div>
                            <span className="text-xs text-muted-foreground">
                              Aircraft
                            </span>
                            <p className="text-sm font-medium">
                              Boeing 777-300ER
                            </p>
                          </div>
                          <div>
                            <span className="text-xs text-muted-foreground">
                              Distance
                            </span>
                            <p className="text-sm font-medium">3,459 miles</p>
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
                    <div className="aspect-video rounded-lg bg-muted flex items-center justify-center">
                      <Map className="h-16 w-16 text-muted-foreground/50" />
                      <p className="text-muted-foreground ml-2">
                        Interactive map will be displayed here
                      </p>
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
                              New York to London
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-sm font-medium">$620</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          <Clock className="h-4 w-4" />
                          <span>9h 15m</span>
                          <span className="mx-2">•</span>
                          <span>1 Layover (BOS)</span>
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
                              New York to London
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-sm font-medium">$580</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          <Clock className="h-4 w-4" />
                          <span>11h 45m</span>
                          <span className="mx-2">•</span>
                          <span>2 Layovers (BOS, DUB)</span>
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
