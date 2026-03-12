import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  Compass, LayoutDashboard, PlaneTakeoff, Menu, X, MapPin, Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard, page: "Dashboard" },
  { name: "Plan a Trip", icon: PlaneTakeoff, page: "PlanTrip" },
  { name: "My Trips", icon: MapPin, page: "MyTrips" },
  { name: "Explore India", icon: Globe, page: "ExploreLocations" },
  { name: "Cities", icon: MapPin, page: "Cities" },
];

export default function Layout({ children, currentPageName }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-border bg-card fixed h-full z-30">
        <div className="p-6 border-b border-border">
          <Link to={createPageUrl("Dashboard")} className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Compass className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground tracking-tight">India Travel</h1>
              <p className="text-xs text-muted-foreground">AI Trip Planner</p>
            </div>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={createPageUrl(item.page)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                currentPageName === item.page
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-border">
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-4">
            <p className="text-xs font-semibold text-foreground">Explore India</p>
            <p className="text-xs text-muted-foreground mt-1">From the Himalayas to Kerala's backwaters</p>
          </div>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-md border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <Link to={createPageUrl("Dashboard")} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Compass className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-foreground">India Travel</span>
          </Link>
          <Button variant="ghost" size="icon" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
        {mobileOpen && (
          <nav className="px-4 pb-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={createPageUrl(item.page)}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  currentPageName === item.page
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            ))}
          </nav>
        )}
      </div>

      {/* Main content */}
      <main className="flex-1 lg:ml-64 mt-14 lg:mt-0 min-h-screen">
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}