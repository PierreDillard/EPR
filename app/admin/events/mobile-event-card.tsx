import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Clock, Calendar, ChevronRight, User, Tag } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import EventForm from './event-form';
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { getBadgeColor } from '@/utils/event';
import type { EventType, EvenementComplet } from "@/types/event";

interface MobileEventCardProps {
  event: EvenementComplet;
  onUpdate: () => void;
}

export default function MobileEventCard({ event, onUpdate }: MobileEventCardProps) {
  return (
    <Sheet>
      <SheetTrigger className="w-full">
        <Card className="w-full hover:bg-gray-50 transition-colors cursor-pointer">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div className="space-y-4 flex-1">
                {/* En-tête */}
                <div>
                  <h3 className="font-semibold text-lg">{event.title}</h3>
                  <div className="flex items-center gap-2 text-gray-600 mt-2">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{event.location}</span>
                  </div>
                </div>
                
                {/* Informations détaillées */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">
                      {format(new Date(event.date), 'PPP', { locale: fr })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">{event.time}</span>
                  </div>
                  {event.speaker && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <User className="h-4 w-4" />
                      <span className="text-sm">{event.speaker}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 mt-2">
                    <Tag className="h-4 w-4" />
                    <Badge className={getBadgeColor(event.type)}>
                      {event.type}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <ChevronRight className="h-5 w-5 text-gray-400 mt-2" />
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>

      <SheetContent side="bottom" className="h-[95vh] overflow-hidden flex flex-col rounded-t-xl">
        <SheetHeader>
          <SheetTitle>Modifier l&apos;événement</SheetTitle>
        </SheetHeader>
        <div className="mt-6 overflow-y-auto pr-6">
          <EventForm 
            eventId={event.id}
            initialData={{
              title: event.title,
              date: event.date,
              time: event.time || '',
              location: event.location,
              speaker: event.speaker,
              type: event.type as EventType,
              description: event.infos?.[0]?.description || '',
              contact_email: event.infos?.[0]?.contact_email || '',
              contact_telephone: event.infos?.[0]?.contact_telephone || '',
            }}
            onSuccess={onUpdate}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}