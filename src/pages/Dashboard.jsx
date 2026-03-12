import React, { useMemo, useState } from 'react';
import QuickPlanCard from '@/components/dashboard/QuickPlanCard';
import StatsCard from '@/components/dashboard/StatsCard';
import LocationsPreview from '@/components/dashboard/LocationsPreview';
import PopularDestinations from '@/components/dashboard/PopularDestinations';
import RecentTrips from '@/components/dashboard/RecentTrips';
import SpendingChart from '@/components/dashboard/SpendingChart';
import LocationsStatsBar from '@/components/locations/LocationStatsBar';
import StateDistributionChart from '@/components/locations/StateDistributionChart';
import { MapPin, Globe, Sparkles } from 'lucide-react';

const sampleTrips = [
  { id: '1', title: 'Golden Triangle Getaway', destination: 'Delhi, Agra, Jaipur', start_date: '2025-12-01', estimated_cost: 17500, status: 'upcoming' },
  { id: '2', title: 'Kerala Backwaters Retreat', destination: 'Alleppey', start_date: '2025-11-10', estimated_cost: 9800, status: 'planning' },
  { id: '3', title: 'Himalayan Adventure', destination: 'Leh-Ladakh', start_date: '2026-01-20', estimated_cost: 26000, status: 'planning' },
  { id: '4', title: 'Spiritual Varanasi', destination: 'Varanasi', start_date: '2025-10-15', estimated_cost: 7200, status: 'completed' },
  { id: '5', title: 'Goa Beach Chill', destination: 'Goa', start_date: '2025-12-20', estimated_cost: 6400, status: 'upcoming' },
];

const sampleLocations = [
  { id: 'loc1', name: 'Jaipur Fort', state: 'Rajasthan', unsplash_images: JSON.stringify(['https://images.unsplash.com/photo-1536250748011-6a52dc1ed9c6?w=400&h=300&fit=crop']), airbnb_listings: JSON.stringify([1,2,3]), latitude: 26.9124 },
  { id: 'loc2', name: 'Munnar Hills', state: 'Kerala', unsplash_images: JSON.stringify(['https://images.unsplash.com/photo-1542795085-ff22c8ea80b5?w=400&h=300&fit=crop']), airbnb_listings: JSON.stringify([1,2]), latitude: 10.0889 },
  { id: 'loc3', name: 'Baga Beach', state: 'Goa', unsplash_images: JSON.stringify(['https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop']), airbnb_listings: JSON.stringify([1]), latitude: 15.5608 },
  { id: 'loc4', name: 'Kudos (No Image)', state: 'Tamil Nadu', unsplash_images: JSON.stringify([]), airbnb_listings: JSON.stringify([1,2,3,4]), latitude: 13.0827 },
  { id: 'loc5', name: 'Ladakh Glacier', state: 'Ladakh', unsplash_images: JSON.stringify(['https://images.unsplash.com/photo-1542762799-5f719e19a0ea?w=400&h=300&fit=crop']), airbnb_listings: JSON.stringify([1]), latitude: 34.1526 },
];

export default function Dashboard() {
  const [selectedState, setSelectedState] = useState('');

  const filteredLocations = useMemo(() => {
    if (!selectedState) return sampleLocations;
    return sampleLocations.filter((loc) => loc.state === selectedState);
  }, [selectedState]);

  const totalLocations = filteredLocations.length;
  const totalTrips = sampleTrips.length;
  const activeTrips = sampleTrips.filter((trip) => trip.status === 'upcoming' || trip.status === 'planning').length;
  const totalBudget = sampleTrips.reduce((acc, trip) => acc + (trip.estimated_cost || 0), 0);

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="text-sm text-muted-foreground">Welcome back! Here's an overview of your India travel planning progress.</p>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-4">
        <QuickPlanCard />
        <StatsCard title="Total Locations" value={totalLocations} subtitle="Monitored places" icon={MapPin} gradient="bg-gradient-to-br from-primary/20 to-accent/20" />
        <StatsCard title="Total Trips" value={totalTrips} subtitle="Trips created" icon={Globe} gradient="bg-gradient-to-br from-chart-2/20 to-chart-5/20" />
        <StatsCard title="Planned Budget" value={`₹${totalBudget.toLocaleString()}`} subtitle="Projected spend" icon={Sparkles} gradient="bg-gradient-to-br from-primary/20 to-primary-foreground/10" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <LocationsStatsBar locations={filteredLocations} />
        <StateDistributionChart locations={filteredLocations} />
        <PopularDestinations onSelect={setSelectedState} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <LocationsPreview locations={filteredLocations} isLoading={false} />
        <SpendingChart trips={sampleTrips} />
      </div>

      <RecentTrips trips={sampleTrips} isLoading={false} />
    </div>
  );
}
