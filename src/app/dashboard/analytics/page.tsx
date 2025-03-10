"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plane,
  Clock,
  BarChart3,
  Settings,
  Home,
  LogOut,
  DollarSign,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

export default function AnalyticsPage() {
  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* Sidebar */}
      <div className="hidden md:flex w-64 flex-col fixed inset-y-0 z-50 bg-card border-r">
        <div className="flex h-14 items-center border-b px-4">
          <Link href="/" className="flex items-center gap-2">
            <Plane className="h-5 w-5 text-primary" />
            <span className="font-bold">AeroGo</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid gap-1 px-2">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
            >
              <Home className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/dashboard/history"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
            >
              <Clock className="h-4 w-4" />
              <span>History</span>
            </Link>
            <Link
              href="/dashboard/analytics"
              className="flex items-center gap-3 rounded-md bg-accent px-3 py-2 text-accent-foreground transition-colors"
            >
              <BarChart3 className="h-4 w-4" />
              <span>Analytics</span>
            </Link>
            <Link
              href="/dashboard/settings"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
            >
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </Link>
          </nav>
        </div>
        <div className="border-t p-4">
          <Link href="/">
            <Button variant="outline" className="w-full justify-start gap-2">
              <LogOut className="h-4 w-4" />
              <span>Log out</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 md:ml-64">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
          <div className="flex-1">
            <h1 className="text-lg font-semibold">Analytics Dashboard</h1>
          </div>
        </header>

        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-8">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Searches
                </CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">128</div>
                <p className="text-xs text-muted-foreground">
                  +14% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Average Cost Savings
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$245</div>
                <p className="text-xs text-muted-foreground">
                  +5.2% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Time Saved
                </CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42h</div>
                <p className="text-xs text-muted-foreground">
                  +12% from last month
                </p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="algorithms" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="algorithms">
                Algorithm Performance
              </TabsTrigger>
              <TabsTrigger value="routes">Popular Routes</TabsTrigger>
              <TabsTrigger value="savings">Cost Analysis</TabsTrigger>
            </TabsList>

            <TabsContent value="algorithms" className="space-y-4 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Algorithm Performance Comparison</CardTitle>
                  <CardDescription>
                    Comparing efficiency of different pathfinding algorithms
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Dijkstra's Algorithm */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 rounded-full bg-primary"></div>
                          <span className="font-medium">
                            Dijkstra's Algorithm
                          </span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          42% usage
                        </span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div
                          className="h-2 rounded-full bg-primary"
                          style={{ width: "42%" }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <TrendingDown className="h-3 w-3 text-green-500" />
                          <span>Avg. Cost: $680</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <TrendingDown className="h-3 w-3 text-green-500" />
                          <span>Avg. Time: 8h 15m</span>
                        </div>
                      </div>
                    </div>

                    {/* A* Algorithm */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 rounded-full bg-blue-500"></div>
                          <span className="font-medium">A* Algorithm</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          35% usage
                        </span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div
                          className="h-2 rounded-full bg-blue-500"
                          style={{ width: "35%" }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <TrendingUp className="h-3 w-3 text-red-500" />
                          <span>Avg. Cost: $720</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <TrendingDown className="h-3 w-3 text-green-500" />
                          <span>Avg. Time: 7h 45m</span>
                        </div>
                      </div>
                    </div>

                    {/* Bellman-Ford Algorithm */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 rounded-full bg-purple-500"></div>
                          <span className="font-medium">
                            Bellman-Ford Algorithm
                          </span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          23% usage
                        </span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div
                          className="h-2 rounded-full bg-purple-500"
                          style={{ width: "23%" }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <TrendingDown className="h-3 w-3 text-green-500" />
                          <span>Avg. Cost: $650</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="h-3 w-3 text-red-500" />
                          <span>Avg. Time: 9h 20m</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="routes" className="space-y-4 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Most Popular Routes</CardTitle>
                  <CardDescription>
                    Frequently searched flight routes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 font-medium text-sm border-b pb-2">
                      <div>Route</div>
                      <div>Searches</div>
                      <div>Avg. Cost</div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="font-medium">New York to London</div>
                      <div>42</div>
                      <div>$750</div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="font-medium">Los Angeles to Tokyo</div>
                      <div>38</div>
                      <div>$1,250</div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="font-medium">Paris to Dubai</div>
                      <div>27</div>
                      <div>$820</div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="font-medium">Sydney to Singapore</div>
                      <div>21</div>
                      <div>$680</div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="font-medium">Chicago to Miami</div>
                      <div>18</div>
                      <div>$320</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="savings" className="space-y-4 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Cost Savings Analysis</CardTitle>
                  <CardDescription>
                    Comparison of costs with and without optimization
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">
                          Total Estimated Savings
                        </p>
                        <p className="text-3xl font-bold text-green-500">
                          $31,360
                        </p>
                      </div>
                      <div className="h-16 w-16 rounded-full bg-green-500/10 flex items-center justify-center">
                        <DollarSign className="h-8 w-8 text-green-500" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">
                          Average Cost Without Optimization
                        </span>
                        <span>$925</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div
                          className="h-2 rounded-full bg-red-500"
                          style={{ width: "100%" }}
                        ></div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">
                          Average Cost With Optimization
                        </span>
                        <span>$680</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div
                          className="h-2 rounded-full bg-green-500"
                          style={{ width: "73.5%" }}
                        ></div>
                      </div>
                    </div>

                    <div className="rounded-lg bg-muted p-4">
                      <h4 className="text-sm font-medium mb-2">
                        Savings Breakdown by Algorithm
                      </h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span>Dijkstra's Algorithm</span>
                          <span className="text-green-500">
                            $245 avg. savings
                          </span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span>A* Algorithm</span>
                          <span className="text-green-500">
                            $205 avg. savings
                          </span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span>Bellman-Ford Algorithm</span>
                          <span className="text-green-500">
                            $275 avg. savings
                          </span>
                        </div>
                      </div>
                    </div>
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
