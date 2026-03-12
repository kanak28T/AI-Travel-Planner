import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const destinations = [
  { name: "Rajasthan", tag: "Heritage", image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=400&h=300&fit=crop", color: "bg-primary" },
  { name: "Kerala", tag: "Nature", image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400&h=300&fit=crop", color: "bg-accent" },
  { name: "Goa", tag: "Beach", image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400&h=300&fit=crop", color: "bg-chart-4" },
  { name: "Varanasi", tag: "Spiritual", image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=400&h=300&fit=crop", color: "bg-chart-5" },
  { name: "Ladakh", tag: "Adventure", image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=400&h=300&fit=crop", color: "bg-chart-3" },
  { name: "Agra", tag: "Wonder", image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400&h=300&fit=crop", color: "bg-primary" },
];

export default function PopularDestinations({ onSelect }) {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Popular Destinations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {destinations.map((dest, i) => (
            <motion.button
              key={dest.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => onSelect(dest.name)}
              className="group relative rounded-xl overflow-hidden aspect-[4/3] text-left"
            >
              <img
                src={dest.image}
                alt={dest.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <Badge variant="secondary" className="text-[10px] mb-1 bg-white/20 backdrop-blur-sm text-white border-0">
                  {dest.tag}
                </Badge>
                <p className="text-white font-semibold text-sm">{dest.name}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}