import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, ArrowRight, Users } from "lucide-react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";

const statusColors = {
  planning: "bg-chart-3/15 text-chart-3 border-chart-3/20",
  upcoming: "bg-chart-4/15 text-chart-4 border-chart-4/20",
  ongoing: "bg-accent/15 text-accent border-accent/20",
  completed: "bg-muted text-muted-foreground border-border",
};

export default function RecentTrips({ trips, isLoading }) {
  if (isLoading) {
    return (
      <Card className="border-0 shadow-sm">
        <CardHeader><CardTitle className="text-lg font-semibold">Recent Trips</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-20 bg-muted rounded-xl animate-pulse" />
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Recent Trips</CardTitle>
        <Link to={createPageUrl("MyTrips")}>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            View all <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        {trips.length === 0 ? (
          <div className="text-center py-8">
            <MapPin className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">No trips yet. Start planning!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {trips.slice(0, 5).map((trip, i) => (
              <motion.div
                key={trip.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  to={createPageUrl("TripDetail") + `?id=${trip.id}`}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors group"
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-foreground truncate group-hover:text-primary transition-colors">
                      {trip.title}
                    </p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {trip.destination}
                      </span>
                      {trip.start_date && (
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {format(new Date(trip.start_date), "MMM d")}
                        </span>
                      )}
                    </div>
                  </div>
                  <Badge variant="outline" className={`text-[10px] ${statusColors[trip.status] || statusColors.planning}`}>
                    {trip.status}
                  </Badge>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}