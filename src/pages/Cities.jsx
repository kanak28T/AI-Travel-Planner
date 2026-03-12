import React from 'react';
import { Link } from 'react-router-dom';
import { sampleCities } from '@/lib/sample-data';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function Cities() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Cities</h1>
        <p className="text-muted-foreground">City-level insights and recommended local experiences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {sampleCities.map((city) => (
          <Link key={city.id} to={`/CityDetail?name=${encodeURIComponent(city.name)}`} className="block hover:shadow-lg transition">
            <Card className="overflow-hidden border-0 shadow-sm hover:shadow-md transition">
              <div className="h-44 overflow-hidden">
                <img
                  src={city.image}
                  alt={city.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <CardContent>
                <h2 className="text-xl font-bold text-foreground">{city.name}</h2>
                <p className="text-sm text-muted-foreground">{city.state}</p>
                <p className="text-sm mt-2">{city.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
