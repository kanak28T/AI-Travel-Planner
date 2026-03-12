import React, { useMemo, useState } from 'react';
import { sampleLocations } from '@/lib/sample-data';
import LocationCard from '@/components/locations/LocationCard';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function ExploreLocations() {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    const term = search.toLowerCase();
    return sampleLocations.filter((loc) =>
      loc.name.toLowerCase().includes(term) ||
      loc.state.toLowerCase().includes(term) ||
      (loc.destination || '').toLowerCase().includes(term)
    );
  }, [search]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Explore India</h1>
        <p className="text-muted-foreground">Browse curated locations and travel insights from across the country.</p>
      </div>

      <div className="flex items-center gap-3">
        <input
          type="search"
          className="flex-1 border border-border rounded-lg px-3 py-2"
          placeholder="Search locations..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.length ? filtered.map((loc, i) => <LocationCard key={loc.id} location={loc} index={i} />) : (
          <Card className="col-span-full">
            <CardContent className="text-center text-muted-foreground py-8">No locations found for "{search}".</CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
