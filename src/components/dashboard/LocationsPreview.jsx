import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, ArrowRight, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";

export default function LocationsPreview({ locations, isLoading }) {
  const uniqueStates = new Set(locations.map(l => l.state).filter(Boolean)).size;

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Globe className="w-5 h-5 text-primary" /> Dataset Locations
        </CardTitle>
        <Link to={createPageUrl("ExploreLocations")}>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            Explore all <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            {[1, 2, 3].map(i => <div key={i} className="h-14 bg-muted animate-pulse rounded-xl" />)}
          </div>
        ) : locations.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-sm text-muted-foreground">No location data yet. Add your CSV data!</p>
            <Link to={createPageUrl("ExploreLocations")}>
              <Button variant="outline" size="sm" className="mt-3">Go to Explore</Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="flex gap-4 mb-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{locations.length}</p>
                <p className="text-xs text-muted-foreground">Locations</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-accent">{uniqueStates}</p>
                <p className="text-xs text-muted-foreground">States</p>
              </div>
            </div>
            <div className="space-y-2">
              {locations.slice(0, 4).map((loc, i) => {
                let img = null;
                try {
                  const arr = JSON.parse(loc.unsplash_images || "[]");
                  img = Array.isArray(arr) && arr[0] && typeof arr[0] === "string" ? arr[0] : null;
                } catch {}
                return (
                  <motion.div
                    key={loc.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-muted/50 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                      {img ? (
                        <img src={img} alt={loc.name} className="w-full h-full object-cover" onError={e => e.target.style.display="none"} />
                      ) : (
                        <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                          <MapPin className="w-4 h-4 text-primary" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{loc.name}</p>
                      <p className="text-xs text-muted-foreground">{loc.state}</p>
                    </div>
                    <Badge variant="outline" className="text-[10px] flex-shrink-0">
                      {loc.latitude?.toFixed(1)}°N
                    </Badge>
                  </motion.div>
                );
              })}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}