import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Loader2 } from "lucide-react";

const travelStyles = [
  { value: "cultural", label: "🏛️ Cultural" },
  { value: "adventure", label: "⛰️ Adventure" },
  { value: "relaxation", label: "🏖️ Relaxation" },
  { value: "spiritual", label: "🕉️ Spiritual" },
  { value: "wildlife", label: "🐅 Wildlife" },
  { value: "food_tour", label: "🍛 Food Tour" },
  { value: "heritage", label: "🏰 Heritage" },
];

const budgetOptions = [
  { value: "budget", label: "💰 Budget-Friendly" },
  { value: "moderate", label: "💳 Moderate" },
  { value: "luxury", label: "💎 Luxury" },
];

export default function TripForm({ form, setForm, onSubmit, isGenerating }) {
  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-6 space-y-5">
        <div className="grid md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label>Trip Title</Label>
            <Input
              placeholder="e.g. Golden Triangle Adventure"
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Destination</Label>
            <Input
              placeholder="e.g. Rajasthan, Kerala, Goa"
              value={form.destination}
              onChange={(e) => handleChange("destination", e.target.value)}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label>Start Date</Label>
            <Input
              type="date"
              value={form.start_date}
              onChange={(e) => handleChange("start_date", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>End Date</Label>
            <Input
              type="date"
              value={form.end_date}
              onChange={(e) => handleChange("end_date", e.target.value)}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          <div className="space-y-2">
            <Label>Travelers</Label>
            <Input
              type="number"
              min={1}
              value={form.num_travelers}
              onChange={(e) => handleChange("num_travelers", parseInt(e.target.value) || 1)}
            />
          </div>
          <div className="space-y-2">
            <Label>Budget</Label>
            <Select value={form.budget} onValueChange={(v) => handleChange("budget", v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {budgetOptions.map(b => (
                  <SelectItem key={b.value} value={b.value}>{b.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Travel Style</Label>
            <Select value={form.travel_style} onValueChange={(v) => handleChange("travel_style", v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {travelStyles.map(s => (
                  <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Special Interests / Notes</Label>
          <Textarea
            placeholder="e.g. Vegetarian food, historical monuments, local markets, photography spots..."
            value={form.interests}
            onChange={(e) => handleChange("interests", e.target.value)}
            className="min-h-[80px]"
          />
        </div>

        <Button
          onClick={onSubmit}
          disabled={isGenerating || !form.title || !form.destination}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-12"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              AI is crafting your itinerary...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 mr-2" />
              Generate AI Itinerary
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}