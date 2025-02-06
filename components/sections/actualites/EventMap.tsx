import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface EventMapProps {
  address: string;
  className:string
}

export default function EventMap({ address }: EventMapProps) {
  if (!address) return null;

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  return (
    <Card className="w-full h-[200px] md:h-[150px] overflow-hidden">
      <div className="relative h-full">
        <iframe
          src={`https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
          className="w-full h-full"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <div className="absolute top-2 md:top-4 right-2 md:right-4">
          <Button
            variant="secondary"
            size="sm"
            className="bg-white/90 hover:bg-white"
            asChild
          >
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 md:gap-2"
            >
              <span className="hidden md:inline">Ouvrir dans Google Maps</span>
              <span className="md:hidden">Maps</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </Card>
  );
}