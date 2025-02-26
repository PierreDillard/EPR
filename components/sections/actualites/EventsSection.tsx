import { useState } from 'react';
import Image from 'next/image';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Calendar, MapPin, User, Clock, ChevronRight, Info } from 'lucide-react';
import { cn } from "@/lib/utils/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import OptimizedImage from '@/components/ui/optimized-image';
import { EvenementComplet, Event } from '../../../types/event';
import ClickableText from '../../ui/clikable-text';
import EventMap from './EventMap';


function EventDetails({ event }: { event: EvenementComplet }) {
  const eventInfo = event.infos?.[0];
  return (
    <div className="space-y-6">
      {/* Image en-tête */}
      <div className="relative aspect-video w-full  rounded-lg">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Informations principales */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <div className="text-sm font-medium text-gray-500">Date</div>
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-gray-500" />
            <span>{format(new Date(event.date), 'PPP', { locale: fr })}</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium text-gray-500">Horaire</div>
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-gray-500" />
            <span>{event.time}</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium text-gray-500">Lieu</div>
          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-gray-500" />
            <span>{event.location}</span>
          </div>
        </div>

        {event.speaker && (
          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-500">Intervenant</div>
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-gray-500" />
              <span>{event.speaker}</span>
            </div>
          </div>
        )}
      </div>

      {eventInfo?.description && (
        <div className="space-y-2">
          <div className="text-sm font-medium text-gray-500">Description</div>
          <div className="text-black whitespace-pre-wrap">
            <ClickableText 
              text={eventInfo.description}
              className="leading-relaxed"
            />
          </div>
        </div>
      )}


   {/* Carte Google Maps */}
   <div className="space-y-2">
        <div className="text-sm font-medium text-gray-500">S&lsquo;y rendre</div>
        <EventMap 
          address={event.location} 
          className="w-full h-[400px] overflow-hidden rounded-lg"
        />
      </div>
    </div> 
  );
}
function EventPreview({ event }: { event: EvenementComplet }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <div className="flex flex-col space-y-2">      
        <div className="relative h-[300px] md:h-[500px] w-full overflow-hidden rounded-lg">
          <OptimizedImage
            src={event.image}
            alt={event.title}
            sizes="(max-width: 768px) 100vw, 100vw"
            priority
          />
          
          {/* Overlay noir semi-transparent */}
          <div className="absolute inset-0" />

          {/* Titre uniquement - avec fond noir */}
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 z-10">
            <div className="inline-block">
              <h3 className="text-xl md:text-2xl font-bold text-gray-100 uppercase
                          drop-shadow-lg bg-black/80 px-4 py-2 inline-block">
                {event.title}
              </h3>
            </div>
          </div>
        </div>

        {/* Bouton Plus d'infos */}
        <Button 
          size="lg"
          onClick={() => setShowDetails(true)}
          className="w-full mt-4 bg-black hover:bg-black/90 font-semibold text-lg
                     transition-all duration-300 hover:scale-[1.02]"
        >
          <Info className="h-5 w-5 mr-3"/>
          Plus d&apos;infos
        </Button>
      </div>

      {/* Boîte de dialogue pour les détails */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-3xl w-[90vw] h-[90vh] overflow-y-auto p-6">
          <DialogHeader className="flex flex-row justify-between items-center">
            <DialogTitle className="text-xl md:text-2xl uppercase">
              {event.title}
            </DialogTitle>
            <DialogClose className="h-6 w-6 cursor-pointer opacity-70 hover:opacity-100 transition-opacity" />
          </DialogHeader>
          <EventDetails event={event} />
        </DialogContent>
      </Dialog>
    </>
  );
}

function UpcomingEventItem({ 
  event,
  isSelected,
  onClick
}: { 
  event: EvenementComplet;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <Card
      className={cn(
        "relative overflow-hidden cursor-pointer transition-all duration-300",
        isSelected ? "ring-2 ring-black bg-gray-50" : "hover:bg-gray-50"
      )}
      onClick={onClick}
    >
      <div className="p-4 flex gap-4">
        <div className="relative w-32 h-20 flex-shrink-0 rounded-lg overflow-hidden">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover"
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <span className="text-sm text-gray-600 block mb-1">
            {format(new Date(event.date), 'E dd MMM', { locale: fr })}
          </span>
          
          <h4 className="font-medium text-gray-900 mb-1 line-clamp-2">
            {event.title}
          </h4>
        </div>

        <ChevronRight 
          className={cn(
            "h-5 w-5 text-gray-400 flex-shrink-0 transition-transform",
            isSelected && "rotate-90"
          )}
        />
      </div>
    </Card>
  );
}

export default function EventsSection({ events }: { events: Event[] }) {
  const [selectedEvent, setSelectedEvent] = useState(events[0]);

  if (!events.length) {
    return (
      <div className="text-center py-12">
        <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-4" />
        <h3 className="text-xl font-semibold text-gray-900">
          Aucun événement à venir
        </h3>
        <p className="text-gray-600 mt-2">
          Revenez bientôt pour découvrir nos prochains événements.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <EventPreview event={selectedEvent} />
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900 px-4">
            Prochains événements
          </h3>
          
          <div className="space-y-2">
            {events.map((event) => (
              <UpcomingEventItem
                key={event.id}
                event={event}
                isSelected={event.id === selectedEvent.id}
                onClick={() => setSelectedEvent(event)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}