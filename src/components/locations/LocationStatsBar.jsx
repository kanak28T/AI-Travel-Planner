import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Building2, Image, Globe } from "lucide-react";

export default function LocationsStatsBar({ locations }) {
  const totalLocations = locations.length;
  const uniqueStates = new Set(locations.map(l => l.state).filter(Boolean)).size;

  const totalAirbnb = locations.reduce((sum, loc) => {
    try {
      const arr = JSON.parse(loc.airbnb_listings || "[]");
      return sum + (Array.isArray(arr) ? arr.length : 0);
    } catch { return sum; }
  }, 0);

  const withImages = locations.filter(loc => {
    try {
      const arr = JSON.parse(loc.unsplash_images || "[]");
      return Array.isArray(arr) && arr.length > 0;
    } catch { return false; }
  }).length;

  const stats = [
    { label: "Locations", value: totalLocations.toLocaleString(), icon: MapPin, color: "text-primary" },
    { label: "States", value: uniqueStates, icon: Globe, color: "text-accent" },
    { label: "Airbnb Listings", value: totalAirbnb.toLocaleString(), icon: Building2, color: "text-chart-4" },
    { label: "With Photos", value: withImages.toLocaleString(), icon: Image, color: "text-chart-5" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {stats.map(stat => (
        <Card key={stat.label} className="border-0 shadow-sm">
          <CardContent className="p-4 flex items-center gap-3">
            <stat.icon className={`w-5 h-5 ${stat.color} flex-shrink-0`} />
            <div>
              <p className="text-xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}