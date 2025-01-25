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
      className="relative h-[300px] md:h-[500px] overflow-hidden rounded-2xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-black/20 z-10" />
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
      
      <div className="absolute bottom-0 left-0 p-4 md:p-6 w-full z-30">
        <Badge className="mb-2 md:mb-3 bg-gray-900 text-gray-100" variant="outline">
          {event.type}
        </Badge>
        <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
          {event.title}
        </h3>
        <div className="flex items-center gap-2 text-white/80">
          <Clock className="h-4 w-4" />
          {format(new Date(`2000-01-01 ${event.time}`), 'HH:mm')}
        </div>
      </div>

      <div className={cn(
        "absolute inset-0 p-4 md:p-6 bg-black/70 flex flex-col justify-center text-white transition-opacity duration-300 z-30",
        isHovered ? "opacity-100" : "opacity-0"
      )}>
        <h3 className="text-xl md:text-2xl font-bold mb-4">{event.title}</h3>
        <div className="space-y-2 md:space-y-3">
          <EventDetails event={event} />
        </div>
      </div>
    </div>
  );
}

function EventDetails({ event }: { event: Event }) {
  return (
    <>
      <div className="flex items-center gap-2">
        <Calendar className="h-4 md:h-5 w-4 md:w-5"/>
        <span className="text-sm md:text-base">
          {format(new Date(event.date), 'PPP', { locale: fr })}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Clock className="h-4 md:h-5 w-4 md:w-5"/>
        <span className="text-sm md:text-base">
          {format(new Date(`2000-01-01 ${event.time}`), 'HH:mm')}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <MapPin className="h-4 md:h-5 w-4 md:w-5"/>
        <span className="text-sm md:text-base">{event.location}</span>
      </div>
      {event.speaker && (
        <div className="flex items-center gap-2">
          <User className="h-4 md:h-5 w-4 md:w-5"/>
          <span className="text-sm md:text-base">{event.speaker}</span>
        </div>
      )}
    </>
  );
}

function UpcomingEventsList({ events, onSelectEvent, selectedEventId }: { 
  events: Event[], 
  onSelectEvent: (event: Event) => void,
  selectedEventId: string
}) {
  return (
    <div className="bg-white rounded-2xl h-[300px] md:h-[500px] overflow-y-auto p-4">
      <h2 className="text-lg md:text-xl font-bold mb-4">Prochains événements</h2>
      <div className="space-y-3 md:space-y-4">
        {events.slice(0, 4).map((event) => (
          <button 
            key={event.id} 
            className={cn(
              "flex gap-3 md:gap-4 items-center p-2 w-full text-left hover:bg-gray-50 rounded-lg transition-colors",
              selectedEventId === event.id && "bg-gray-50"
            )}
            onClick={() => onSelectEvent(event)}
          >
            <div className="relative w-12 h-12 md:w-16 md:h-16 flex-shrink-0">
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div>
              <p className="text-xs md:text-sm text-red-500 font-medium">
                {format(new Date(event.date), 'E dd MMM', { locale: fr }).toUpperCase()}
              </p>
              <p className="font-semibold text-sm md:text-base text-gray-600">{event.title}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}


export default function EventsSection({ events }: { events: Event[] }) {
  const [selectedEvent, setSelectedEvent] = useState(events[0]);

  if (!events.length) {
    return (
      <div className="container px-4 py-12">
        <div className="bg-white rounded-2xl p-8 text-center max-w-2xl mx-auto">
          <div className="mb-6">
            <Calendar className="h-12 w-12 mx-auto text-[#00AECE] mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Aucun événement à venir
            </h3>
            <p className="text-gray-500">
              Revenez bientôt pour découvrir nos prochains événements.
              En attendant, n'hésitez pas à nous contacter pour plus d'informations.
            </p>
          </div>
          <Button
            variant="outline"
            className="mx-auto hover:bg-[#00AECE] hover:text-white transition-colors"
            onClick={() => window.location.href = '#contact'}
          >
            Nous contacter
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 py-6 md:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="lg:col-span-2 order-first lg:order-none">
          <MainEventCard event={selectedEvent} />
        </div>
        <div className="order-last lg:order-none">
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