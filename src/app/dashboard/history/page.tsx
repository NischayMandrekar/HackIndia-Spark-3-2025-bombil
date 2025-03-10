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
import {
  Plane,
  Clock,
  Calendar,
  Search,
  ArrowRight,
  Home,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";

export default function HistoryPage() {
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
              className="flex items-center gap-3 rounded-md bg-accent px-3 py-2 text-accent-foreground transition-colors"
            >
              <Clock className="h-4 w-4" />
              <span>History</span>
            </Link>
            <Link
              href="/dashboard/analytics"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
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
            <h1 className="text-lg font-semibold">Search History</h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search history..."
                className="w-full bg-background pl-8 md:w-[200px] lg:w-[320px]"
              />
            </div>
          </div>
        </header>

        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-8">
          <Card>
            <CardHeader>
              <CardTitle>Recent Searches</CardTitle>
              <CardDescription>
                Your recent flight route searches
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* History Item 1 */}
                <div className="rounded-lg border bg-card p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold">
                        New York to London
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>Searched on June 10, 2024</span>
                      </div>
                    </div>
                    <Link href="/dashboard/route/1">
                      <Button variant="outline" size="sm" className="gap-1">
                        View
                        <ArrowRight className="h-3 w-3" />
                      </Button>
                    </Link>
                  </div>
                  <Separator className="my-2" />
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Algorithm</span>
                      <p className="font-medium">Dijkstra's</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Travel Time</span>
                      <p className="font-medium">7h 30m</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Cost</span>
                      <p className="font-medium">$750</p>
                    </div>
                  </div>
                </div>

                {/* History Item 2 */}
                <div className="rounded-lg border bg-card p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold">
                        Los Angeles to Tokyo
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>Searched on June 8, 2024</span>
                      </div>
                    </div>
                    <Link href="/dashboard/route/2">
                      <Button variant="outline" size="sm" className="gap-1">
                        View
                        <ArrowRight className="h-3 w-3" />
                      </Button>
                    </Link>
                  </div>
                  <Separator className="my-2" />
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Algorithm</span>
                      <p className="font-medium">A*</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Travel Time</span>
                      <p className="font-medium">11h 45m</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Cost</span>
                      <p className="font-medium">$1,250</p>
                    </div>
                  </div>
                </div>

                {/* History Item 3 */}
                <div className="rounded-lg border bg-card p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold">Paris to Dubai</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>Searched on June 5, 2024</span>
                      </div>
                    </div>
                    <Link href="/dashboard/route/3">
                      <Button variant="outline" size="sm" className="gap-1">
                        View
                        <ArrowRight className="h-3 w-3" />
                      </Button>
                    </Link>
                  </div>
                  <Separator className="my-2" />
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Algorithm</span>
                      <p className="font-medium">Bellman-Ford</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Travel Time</span>
                      <p className="font-medium">6h 15m</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Cost</span>
                      <p className="font-medium">$820</p>
                    </div>
                  </div>
                </div>

                {/* History Item 4 */}
                <div className="rounded-lg border bg-card p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold">
                        Sydney to Singapore
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>Searched on June 1, 2024</span>
                      </div>
                    </div>
                    <Link href="/dashboard/route/4">
                      <Button variant="outline" size="sm" className="gap-1">
                        View
                        <ArrowRight className="h-3 w-3" />
                      </Button>
                    </Link>
                  </div>
                  <Separator className="my-2" />
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Algorithm</span>
                      <p className="font-medium">Dijkstra's</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Travel Time</span>
                      <p className="font-medium">8h 20m</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Cost</span>
                      <p className="font-medium">$680</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
