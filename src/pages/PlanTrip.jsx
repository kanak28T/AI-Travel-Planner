import React, { useState } from 'react';
import TripForm from '@/components/plan/TripForm';
import { sampleTrips } from '@/lib/sample-data';
import { generateAIItinerary } from '@/lib/ai-planner';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function PlanTrip() {
  const [form, setForm] = useState({
    title: '',
    destination: '',
    start_date: '',
    end_date: '',
    num_travelers: 1,
    budget: 'moderate',
    travel_style: 'cultural',
    interests: '',
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedTrips, setGeneratedTrips] = useState(sampleTrips);

  const onSubmit = async () => {
    if (!form.title || !form.destination) return;
    setIsGenerating(true);

    try {
      const itinerary = await generateAIItinerary(form);

      const newTrip = {
        id: Date.now().toString(),
        title: form.title,
        destination: form.destination,
        start_date: form.start_date || '2025-12-01',
        end_date: form.end_date || '2025-12-05',
        estimated_cost: 9000,
        status: 'planning',
        details: itinerary,
      };

      setGeneratedTrips((prev) => [newTrip, ...prev]);

      setForm({
        title: '',
        destination: '',
        start_date: '',
        end_date: '',
        num_travelers: 1,
        budget: 'moderate',
        travel_style: 'cultural',
        interests: '',
      });
    } catch (error) {
      console.error('Failed to generate itinerary:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold">Plan a Trip</h1>
          <p className="text-muted-foreground">Use AI to generate itineraries quickly and store your plans.</p>
        </div>
      </div>

      <TripForm form={form} setForm={setForm} onSubmit={onSubmit} isGenerating={isGenerating} />

      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Your Planned Trips</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {generatedTrips.length === 0 ? (
            <p className="text-sm text-muted-foreground">No planned trips yet.</p>
          ) : (
            generatedTrips.map((trip) => (
              <div key={trip.id} className="p-3 border border-border rounded-xl">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-foreground">{trip.title}</h3>
                  <Badge variant="secondary" className="uppercase text-[10px]">{trip.status}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{trip.destination} • {trip.start_date} - {trip.end_date}</p>
                <p className="text-sm mt-1">{trip.details}</p>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
