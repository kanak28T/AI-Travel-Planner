import React, { useMemo, useState } from 'react';
import { sampleTrips } from '@/lib/sample-data';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

export default function MyTrips() {
  const [statusFilter, setStatusFilter] = useState('all');

  const trips = useMemo(() => {
    if (statusFilter === 'all') return sampleTrips;
    return sampleTrips.filter((trip) => trip.status === statusFilter);
  }, [statusFilter]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold">My Trips</h1>
          <p className="text-muted-foreground">Track and manage your saved itineraries.</p>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Filter:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-border rounded-lg px-3 py-2"
          >
            <option value="all">All</option>
            <option value="planning">Planning</option>
            <option value="upcoming">Upcoming</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Trips Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {trips.map((trip) => (
              <div key={trip.id} className="border border-border rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <h2 className="text-lg font-bold text-foreground">{trip.title}</h2>
                    <p className="text-sm text-muted-foreground">{trip.destination}</p>
                  </div>
                  <Badge variant="outline" className="text-xs uppercase">{trip.status}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-2">{format(new Date(trip.start_date), 'MMM dd, yyyy')} - {format(new Date(trip.end_date), 'MMM dd, yyyy')}</p>
                <p className="text-sm mt-2">{trip.details}</p>
              </div>
            ))}
            {trips.length === 0 && <p className="text-sm text-muted-foreground">No trips match this filter.</p>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
