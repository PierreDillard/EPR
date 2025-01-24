'use client';

import { useState } from 'react';
import Image from 'next/image';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Calendar, MapPin, User, Clock } from 'lucide-react';
import { cn } from '@/lib/utils/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Event } from '@/types/event';

function MainEventCard({ event }: { event: Event }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="relative h-[500px] overflow-hidden rounded-2xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-black/20 z-10" /> {/* Overlay sombre permanent */}
      <Image 
        src={event.image}
        alt={event.title}
        fill
        className="object-cover transition-transform duration-700 hover:scale-110"
      />
      <div className={cn(
        "absolute inset-0 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300 z-20",
        isHovered ? "opacity-100" : "opacity-60"
      )}/>
      
      {/* Contenu toujours visible */}
      <div className="absolute bottom-0 left-0 p-6 w-full z-30">
        <Badge className="mb-3 bg-gray-900 text-gray-100" variant="outline">
          {event.type}
        </Badge>
        <h3 className="text-2xl font-bold text-white mb-2">
          {event.title}
        </h3>
        <div className="flex items-center gap-2 text-white/80">
          <Clock className="h-4 w-4" />
          {format(new Date(`2000-01-01 ${event.time}`), 'HH:mm')}
        </div>
      </div>

      {/* Contenu qui apparaît au hover */}
      <div className={cn(
        "absolute inset-0 p-6 bg-black/70 flex flex-col justify-center text-white transition-opacity duration-300 z-30",
        isHovered ? "opacity-100" : "opacity-0"
      )}>
        <h3 className="text-2xl font-bold mb-4">{event.title}</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5"/>
            <span>{format(new Date(event.date), 'PPP', { locale: fr })}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5"/>
            <span>{format(new Date(`2000-01-01 ${event.time}`), 'HH:mm')}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5"/>
            <span>{event.location}</span>
          </div>
          {event.speaker && (
            <div className="flex items-center gap-2">
              <User className="h-5 w-5"/>
              <span>{event.speaker}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function UpcomingEventsList({ events, onSelectEvent, selectedEventId }: { 
  events: Event[], 
  onSelectEvent: (event: Event) => void,
  selectedEventId: string
}) {
  return (
    <div className="bg-white rounded-2xl p-4 h-[500px] overflow-hidden">
      <h2 className="text-xl font-bold mb-4">Prochains événements</h2>
      <div className="space-y-4">
        {events.slice(0, 4).map((event) => (
          <div 
            key={event.id} 
            className={cn(
              "flex gap-4 items-center p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors",
              selectedEventId === event.id && "bg-gray-50"
            )}
            onClick={() => onSelectEvent(event)}
          >
            <div className="relative w-16 h-16 flex-shrink-0">
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div>
              <p className="text-sm text-red-500 font-medium ">
                {format(new Date(event.date), 'E dd MMM', { locale: fr }).toUpperCase()}
              </p>
              <p className="font-semibold text-gray-600">{event.title}</p>
     
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default function EventsSection({ events }: { events: Event[] }) {
  const [selectedEvent, setSelectedEvent] = useState(events[0]);

  return (
    <div className="mx-auto container px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <MainEventCard event={selectedEvent} />
        </div>
        <div className="order-first lg:order-none mb-6 lg:mb-0">
          <UpcomingEventsList 
            events={events}
            onSelectEvent={setSelectedEvent}
            selectedEventId={selectedEvent.id}
          />
        </div>
      </div>
    </div>
  );
}