import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { sampleCities } from '@/lib/sample-data';
import { Card, CardContent } from '@/components/ui/card';

export default function CityDetail() {
  const [searchParams] = useSearchParams();
  const cityName = searchParams.get('name');
  const city = sampleCities.find((item) => item.name.toLowerCase() === (cityName || '').toLowerCase());

  if (!city) {
    return (
      <div className="p-6 bg-card border border-border rounded-lg">
        <h1 className="text-xl font-bold">City not found</h1>
        <p className="text-muted-foreground">Please select a city from the Cities page.</p>
      </div>
    );
  }

  return (
    <Card className="border-0 shadow-sm">
      <div className="h-56 overflow-hidden">
        <img
          src={city.image}
          alt={city.name}
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
      </div>
      <CardContent>
        <h1 className="text-3xl font-bold">{city.name}</h1>
        <p className="text-sm text-muted-foreground">{city.state}</p>
        <p className="mt-3">{city.description}</p>
      </CardContent>
    </Card>
  );
}
