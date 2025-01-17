'use client';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import EventCard from './event-card';
import type { Event } from '@/types/event';

const ITEMS_PER_PAGE = 3;

interface EventsClientProps {
  initialEvents: Event[];
}

export function EventsClient({ initialEvents }: EventsClientProps) {
  const [showAll, setShowAll] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const displayedEvents = showAll 
    ? initialEvents 
    : initialEvents.slice(0, ITEMS_PER_PAGE);

  const hasMoreEvents = initialEvents.length > ITEMS_PER_PAGE;

  if (isLoading) {
    return <EventsSkeleton />;
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayedEvents.map((event, index) => (
          <div 
            key={event.id}
            className="transition-all duration-500 ease-in-out transform"
            style={{
              transitionDelay: `${index * 100}ms`,
              opacity: 1,
              transform: 'translateY(0)'
            }}
          >
            <EventCard {...event} />
          </div>
        ))}
      </div>
      
      {hasMoreEvents && (
        <div className="flex justify-center mt-8">
          <Button
            onClick={() => setShowAll(!showAll)}
            variant="outline"
            size="lg"
            className="bg-gray-100 rounded-3xl text-gray-850 backdrop-blur-sm hover:bg-white/60 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
          >
            {showAll ? "Voir moins" : `Voir plus (${initialEvents.length - ITEMS_PER_PAGE})`}
          </Button>
        </div>
      )}
      
      {initialEvents.length === 0 && (
        <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-3xl transition-all duration-300 ease-in-out">
          <p className="text-gray-500">Aucun événement à venir</p>
        </div>
      )}
    </div>
  );
}

function EventsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[1, 2, 3].map((n) => (
        <div key={n} className="h-96 rounded-3xl overflow-hidden transition-opacity duration-300">
          <Skeleton className="h-full w-full" />
        </div>
      ))}
    </div>
  );
}