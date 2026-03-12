import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, ExternalLink, Home, Globe, ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "framer-motion";

export default function LocationCard({ location, index }) {
  const [expanded, setExpanded] = useState(false);

  // Parse images
  let images = [];
  try {
    const parsed = JSON.parse(location.unsplash_images || "[]");
    images = Array.isArray(parsed) ? parsed.filter(url => typeof url === "string" && url.startsWith("http")) : [];
  } catch {}

  // Parse airbnb listings
  let airbnbListings = [];
  try {
    const parsed = JSON.parse(location.airbnb_listings || "[]");
    airbnbListings = Array.isArray(parsed) ? parsed.filter(l => l && l.url) : [];
  } catch {}

  const coverImage = images[0] || null;
  const wikiSnippet = location.wikipedia_content
    ? location.wikipedia_content.replace(/\[.*?\]/g, "").trim().slice(0, 200) + "..."
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
    >
      <Card className="border-0 shadow-sm hover:shadow-md transition-all overflow-hidden">
        {/* Cover Image */}
        <div className="relative h-44 bg-muted overflow-hidden">
          {coverImage ? (
            <img
              src={coverImage}
              alt={location.name}
              className="w-full h-full object-cover"
              onError={(e) => { e.target.style.display = "none"; }}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <MapPin className="w-10 h-10 text-primary/40" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-3 left-3 right-3">
            <h3 className="text-white font-bold text-lg leading-tight">{location.name}</h3>
            <Badge className="mt-1 bg-white/20 backdrop-blur-sm text-white border-0 text-xs">
              {location.state}
            </Badge>
          </div>
        </div>

        <CardContent className="p-4 space-y-3">
          {/* Coordinates */}
          {location.latitude && location.longitude && (
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {Number(location.latitude).toFixed(4)}, {Number(location.longitude).toFixed(4)}
            </p>
          )}

          {/* Wiki snippet */}
          {wikiSnippet && (
            <div>
              <p className={`text-xs text-muted-foreground leading-relaxed ${!expanded ? "line-clamp-3" : ""}`}>
                {expanded ? location.wikipedia_content?.replace(/\[.*?\]/g, "").trim() : wikiSnippet}
              </p>
              <button
                onClick={() => setExpanded(!expanded)}
                className="text-xs text-primary flex items-center gap-1 mt-1 hover:underline"
              >
                {expanded ? <><ChevronUp className="w-3 h-3" />Less</> : <><ChevronDown className="w-3 h-3" />More</>}
              </button>
            </div>
          )}

          {/* Photo gallery strip */}
          {images.length > 1 && (
            <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-hide">
              {images.slice(1, 5).map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt=""
                  className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                  onError={(e) => { e.target.style.display = "none"; }}
                />
              ))}
              {images.length > 5 && (
                <div className="w-14 h-14 rounded-lg bg-muted flex-shrink-0 flex items-center justify-center">
                  <span className="text-xs text-muted-foreground font-medium">+{images.length - 5}</span>
                </div>
              )}
            </div>
          )}

          {/* Airbnb count */}
          {airbnbListings.length > 0 && (
            <div className="flex items-center gap-2">
              <Home className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs text-muted-foreground">{airbnbListings.length} Airbnb listings</span>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex gap-2 pt-1">
            {location.google_maps_url && (
              <a href={location.google_maps_url} target="_blank" rel="noopener noreferrer" className="flex-1">
                <Button variant="outline" size="sm" className="w-full text-xs">
                  <MapPin className="w-3.5 h-3.5 mr-1" /> Maps
                </Button>
              </a>
            )}
            {location.wikipedia_url && (
              <a href={location.wikipedia_url} target="_blank" rel="noopener noreferrer" className="flex-1">
                <Button variant="outline" size="sm" className="w-full text-xs">
                  <Globe className="w-3.5 h-3.5 mr-1" /> Wiki
                </Button>
              </a>
            )}
            {location.airbnb_url && (
              <a href={location.airbnb_url} target="_blank" rel="noopener noreferrer" className="flex-1">
                <Button variant="outline" size="sm" className="w-full text-xs">
                  <Home className="w-3.5 h-3.5 mr-1" /> Stay
                </Button>
              </a>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}