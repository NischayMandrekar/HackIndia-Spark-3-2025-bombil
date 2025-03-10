"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Plane,
  ArrowRight,
  Clock,
  DollarSign,
  Map,
  BarChart3,
  Settings,
  Home,
  LogOut,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import dynamic from "next/dynamic";

// Dynamically import the SimpleGlobe component with no SSR
const SimpleGlobe = dynamic(() => import("@/components/SimpleGlobe"), {
  ssr: false,
});

export default function DashboardPage() {
  const [departureCity, setDepartureCity] = useState("");
  const [destinationCity, setDestinationCity] = useState("");
  const [algorithm, setAlgorithm] = useState("dijkstra");
  const [costWeight, setCostWeight] = useState(33);
  const [timeWeight, setTimeWeight] = useState(33);
  const [layoverWeight, setLayoverWeight] = useState(34);
  const [optimizeLayovers, setOptimizeLayovers] = useState(true);

  // Sample route data for visualization
  const [selectedRoute, setSelectedRoute] = useState({
    startLat: 40.7128,
    startLng: -74.006,
    endLat: 51.5074,
    endLng: -0.1278,
    color: "#ff4d4d",
  });

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Sidebar */}
      <div className="hidden md:flex w-64 flex-col fixed inset-y-0 z-50 bg-card/70 backdrop-blur-md border-r border-primary/10 shadow-lg shadow-primary/5">
        <div className="flex h-14 items-center border-b border-primary/10 px-4">
          <Link href="/" className="flex items-center gap-2">
            <Plane className="h-5 w-5 text-primary" />
            <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              AeroGo
            </span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid gap-1 px-2">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 rounded-md bg-gradient-to-r from-primary/20 to-primary/10 backdrop-blur-sm px-3 py-2 text-accent-foreground transition-colors"
            >
              <Home className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/dashboard/history"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-all"
            >
              <Clock className="h-4 w-4" />
              <span>History</span>
            </Link>
            <Link
              href="/dashboard/analytics"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-all"
            >
              <BarChart3 className="h-4 w-4" />
              <span>Analytics</span>
            </Link>
            <Link
              href="/dashboard/settings"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-all"
            >
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </Link>
          </nav>
        </div>
        <div className="border-t border-primary/10 p-4">
          <Link href="/">
            <Button
              variant="outline"
              className="w-full justify-start gap-2 backdrop-blur-sm bg-background/40 border-primary/20 hover:bg-background/60 transition-all"
            >
              <LogOut className="h-4 w-4" />
              <span>Log out</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 md:ml-64">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b border-primary/10 bg-background/80 backdrop-blur-md px-4 sm:px-6 shadow-sm shadow-primary/5">
          <div className="flex-1">
            <h1 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              Flight Route Optimizer
            </h1>
          </div>
        </header>

        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-8">
          <Tabs defaultValue="search" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-muted/50 backdrop-blur-sm">
              <TabsTrigger
                value="search"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/20 data-[state=active]:to-primary/10 data-[state=active]:backdrop-blur-md"
              >
                Search Routes
              </TabsTrigger>
              <TabsTrigger
                value="results"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/20 data-[state=active]:to-primary/10 data-[state=active]:backdrop-blur-md"
              >
                Results
              </TabsTrigger>
            </TabsList>
            <TabsContent value="search" className="space-y-4 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-card/70 backdrop-blur-md border-primary/10 shadow-md shadow-primary/5">
                  <CardHeader>
                    <CardTitle className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                      Route Information
                    </CardTitle>
                    <CardDescription>
                      Enter your departure and destination cities
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="departure">Departure City</Label>
                      <Input
                        id="departure"
                        placeholder="Enter departure city"
                        value={departureCity}
                        onChange={(e) => setDepartureCity(e.target.value)}
                        className="bg-background/50 backdrop-blur-sm border-primary/20 focus:border-primary/50 focus:ring-primary/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="destination">Destination City</Label>
                      <Input
                        id="destination"
                        placeholder="Enter destination city"
                        value={destinationCity}
                        onChange={(e) => setDestinationCity(e.target.value)}
                        className="bg-background/50 backdrop-blur-sm border-primary/20 focus:border-primary/50 focus:ring-primary/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="date">Travel Date</Label>
                      <Input
                        id="date"
                        type="date"
                        className="bg-background/50 backdrop-blur-sm border-primary/20 focus:border-primary/50 focus:ring-primary/30"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card/70 backdrop-blur-md border-primary/10 shadow-md shadow-primary/5">
                  <CardHeader>
                    <CardTitle className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                      Algorithm Settings
                    </CardTitle>
                    <CardDescription>
                      Customize the pathfinding algorithm
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="algorithm">Pathfinding Algorithm</Label>
                      <Select value={algorithm} onValueChange={setAlgorithm}>
                        <SelectTrigger
                          id="algorithm"
                          className="bg-background/50 backdrop-blur-sm border-primary/20 focus:border-primary/50 focus:ring-primary/30"
                        >
                          <SelectValue placeholder="Select algorithm" />
                        </SelectTrigger>
                        <SelectContent className="bg-background/90 backdrop-blur-md border-primary/20">
                          <SelectItem value="dijkstra">
                            Dijkstra's Algorithm
                          </SelectItem>
                          <SelectItem value="astar">A* Algorithm</SelectItem>
                          <SelectItem value="bellman-ford">
                            Bellman-Ford Algorithm
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="optimize-layovers">
                          Optimize Layovers
                        </Label>
                        <Switch
                          id="optimize-layovers"
                          checked={optimizeLayovers}
                          onCheckedChange={setOptimizeLayovers}
                          className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-primary data-[state=checked]:to-primary/80"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-card/70 backdrop-blur-md border-primary/10 shadow-md shadow-primary/5">
                <CardHeader>
                  <CardTitle className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                    Preference Weighting
                  </CardTitle>
                  <CardDescription>
                    Adjust the importance of different factors
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label
                        htmlFor="cost-weight"
                        className="flex items-center gap-2"
                      >
                        <DollarSign className="h-4 w-4 text-primary" />
                        Cost
                      </Label>
                      <span className="text-sm text-muted-foreground">
                        {costWeight}%
                      </span>
                    </div>
                    <Slider
                      id="cost-weight"
                      min={0}
                      max={100}
                      step={1}
                      value={[costWeight]}
                      onValueChange={(value) => {
                        const newCost = value[0];
                        const remaining = 100 - newCost;
                        setCostWeight(newCost);
                        setTimeWeight(Math.floor(remaining / 2));
                        setLayoverWeight(Math.ceil(remaining / 2));
                      }}
                      className="[&>[role=slider]]:bg-gradient-to-r [&>[role=slider]]:from-primary [&>[role=slider]]:to-primary/80 [&>[role=slider]]:border-primary/50 [&>.range]:bg-primary/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label
                        htmlFor="time-weight"
                        className="flex items-center gap-2"
                      >
                        <Clock className="h-4 w-4 text-primary" />
                        Travel Time
                      </Label>
                      <span className="text-sm text-muted-foreground">
                        {timeWeight}%
                      </span>
                    </div>
                    <Slider
                      id="time-weight"
                      min={0}
                      max={100}
                      step={1}
                      value={[timeWeight]}
                      onValueChange={(value) => {
                        const newTime = value[0];
                        const remaining = 100 - newTime;
                        setTimeWeight(newTime);
                        setCostWeight(Math.floor(remaining / 2));
                        setLayoverWeight(Math.ceil(remaining / 2));
                      }}
                      className="[&>[role=slider]]:bg-gradient-to-r [&>[role=slider]]:from-primary [&>[role=slider]]:to-primary/80 [&>[role=slider]]:border-primary/50 [&>.range]:bg-primary/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label
                        htmlFor="layover-weight"
                        className="flex items-center gap-2"
                      >
                        <Map className="h-4 w-4 text-primary" />
                        Layovers
                      </Label>
                      <span className="text-sm text-muted-foreground">
                        {layoverWeight}%
                      </span>
                    </div>
                    <Slider
                      id="layover-weight"
                      min={0}
                      max={100}
                      step={1}
                      value={[layoverWeight]}
                      onValueChange={(value) => {
                        const newLayover = value[0];
                        const remaining = 100 - newLayover;
                        setLayoverWeight(newLayover);
                        setCostWeight(Math.floor(remaining / 2));
                        setTimeWeight(Math.ceil(remaining / 2));
                      }}
                      className="[&>[role=slider]]:bg-gradient-to-r [&>[role=slider]]:from-primary [&>[role=slider]]:to-primary/80 [&>[role=slider]]:border-primary/50 [&>.range]:bg-primary/30"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full gap-2 backdrop-blur-md bg-gradient-to-r from-primary/90 to-primary/70 hover:from-primary hover:to-primary/80 border-0 transition-all shadow-md shadow-primary/10">
                    Find Optimal Routes
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="results" className="space-y-4 pt-4">
              <Card className="bg-card/70 backdrop-blur-md border-primary/10 shadow-md shadow-primary/5">
                <CardHeader>
                  <CardTitle className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                    Optimal Flight Routes
                  </CardTitle>
                  <CardDescription>
                    Based on your preferences and selected algorithm
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg border border-primary/10 bg-card/60 backdrop-blur-md text-card-foreground shadow-sm hover:shadow-md hover:shadow-primary/5 transition-all">
                    <div className="p-6 flex flex-col space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold">
                            New York to London
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Dijkstra's Algorithm
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                            $750
                          </p>
                          <p className="text-sm text-muted-foreground">
                            7h 30m
                          </p>
                        </div>
                      </div>
                      <Separator className="bg-primary/10" />
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm font-medium">Departure</p>
                          <p className="text-sm text-muted-foreground">
                            JFK 08:30 AM
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-medium">Flight</p>
                          <p className="text-sm text-muted-foreground">
                            Direct
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">Arrival</p>
                          <p className="text-sm text-muted-foreground">
                            LHR 08:00 PM
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        className="w-full backdrop-blur-sm bg-background/40 border-primary/20 hover:bg-background/60 transition-all"
                        onClick={() =>
                          setSelectedRoute({
                            startLat: 40.7128,
                            startLng: -74.006,
                            endLat: 51.5074,
                            endLng: -0.1278,
                            color: "#ff4d4d",
                          })
                        }
                      >
                        View Details
                      </Button>
                    </div>
                  </div>

                  <div className="mt-4 rounded-lg border border-primary/10 bg-card/60 backdrop-blur-md text-card-foreground shadow-sm hover:shadow-md hover:shadow-primary/5 transition-all">
                    <div className="p-6 flex flex-col space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold">
                            New York to London
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            A* Algorithm
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                            $620
                          </p>
                          <p className="text-sm text-muted-foreground">
                            9h 15m
                          </p>
                        </div>
                      </div>
                      <Separator className="bg-primary/10" />
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm font-medium">Departure</p>
                          <p className="text-sm text-muted-foreground">
                            JFK 10:45 AM
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-medium">Layover</p>
                          <p className="text-sm text-muted-foreground">
                            1h 30m in BOS
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">Arrival</p>
                          <p className="text-sm text-muted-foreground">
                            LHR 11:00 PM
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        className="w-full backdrop-blur-sm bg-background/40 border-primary/20 hover:bg-background/60 transition-all"
                        onClick={() =>
                          setSelectedRoute({
                            startLat: 40.7128,
                            startLng: -74.006,
                            endLat: 51.5074,
                            endLng: -0.1278,
                            color: "#4da6ff",
                          })
                        }
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/70 backdrop-blur-md border-primary/10 shadow-md shadow-primary/5">
                <CardHeader>
                  <CardTitle className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                    Route Visualization
                  </CardTitle>
                  <CardDescription>
                    Visual representation of the optimal route
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video rounded-lg bg-transparent overflow-hidden border border-primary/20 shadow-inner shadow-primary/10">
                    <SimpleGlobe
                      width="100%"
                      height="100%"
                      routes={[selectedRoute]}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
