'use client';

import { useEffect, useState } from 'react';
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, User, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useToast } from "@/hooks/use-toast";
import { handleDeleteEvenement, fetchEvenements } from "@/lib/event";
import { useMediaQuery } from '@/hooks/use-media-query';
import Loading from '@/components/ui/Loading';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import type { EvenementComplet } from "@/types/event";
import EventEditDialog from './EventEditDialog';
import { getBadgeColor , getImageUrl} from '@/utils/event';
import MobileEventCard from './mobile-event-card';
import MobileEventAdd from './mobile-event-card-add';


type EventsListProps = {
  onEventUpdate: () => Promise<void>;
};

const IMAGES_URL = process.env.NEXT_PUBLIC_IMAGES_URL;


export const EventsList: React.FC<EventsListProps> = ({ onEventUpdate }) => {
  const [events, setEvents] = useState<EvenementComplet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');

  useEffect(() => {
    loadEvents();
  }, []);

  async function loadEvents() {
    try {
      const data = await fetchEvenements();
      setEvents(data);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les événements",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await handleDeleteEvenement(id);
      toast({
        title: "Succès",
        description: "L'événement a été supprimé",
      });
      loadEvents();
      await onEventUpdate();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'événement",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <Card className="p-6">
      <Loading/>
    </Card>;
  }

  const ActionButtons = ({ event }: { event: EvenementComplet }) => (
    <div className="flex gap-2">
      <EventEditDialog
        eventId={event.id}
        initialData={{
          title: event.title,
          date: event.date,
          time: event.time || '',
          location: event.location,
          speaker: event.speaker,
          type: event.type,
          image: event.image,
          description: event.infos?.[0]?.description || '',
          contact_email: event.infos?.[0]?.contact_email || '',
          contact_telephone: event.infos?.[0]?.contact_telephone || '',
        }}
        onSuccess={loadEvents}
      />
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" size="icon">
            <Trash2 className="h-4 w-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Êtes-vous sûr ?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Cette action ne peut pas être annulée. Cela supprimera
              définitivement cet événement.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleDelete(event.id)}
              className="bg-red-600 hover:bg-red-700"
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );

  return (
    <Card className="overflow-hidden">
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold">Liste des événements</h2>
        <p className="text-sm text-gray-600 mt-1">
          Gérez tous les événements à venir
        </p>
      </div>
      {isMobile ? (
  <div className="space-y-4 p-4">
      <MobileEventAdd onUpdate={async () => {
            await loadEvents();
            await onEventUpdate();
          }} />
    
    {events.map((event) => (
      <MobileEventCard
        key={event.id}
        event={event}
        onUpdate={async () => {
          await loadEvents();
          await onEventUpdate();
        }}
      />
    ))}
  </div>
) : (
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {!isMobile && <TableHead>Image</TableHead>}
              <TableHead>Détails</TableHead>
              {!isMobile && !isTablet && <TableHead>Informations</TableHead>}
              {!isMobile && <TableHead>Type</TableHead>}
              {!isMobile && <TableHead className="text-right">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.length === 0 ? (
              <TableRow>
                <TableCell colSpan={isMobile ? 1 : isTablet ? 3 : 5} className="text-center py-8">
                  Aucun événement à afficher
                </TableCell>
              </TableRow>
            ) : (
              events.map((event) => (
                <TableRow key={event.id}>
                  {!isMobile && (
                    <TableCell>
                      <div className="relative w-24 h-16 rounded-md overflow-hidden">
                        <Image
                          src={getImageUrl(event.image)} 
                          alt={event.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </TableCell>
                  )}
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">{event.title}</div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-1" />
                        {format(new Date(event.date), 'PPP', { locale: fr })}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="w-4 h-4 mr-1" />
                        {event.time}
                      </div>
                      {isMobile && (
                        <>
                          <div className="flex items-center text-sm text-gray-500 mt-2">
                            <MapPin className="w-4 h-4 mr-1" />
                            {event.location}
                          </div>
                          {event.speaker && (
                            <div className="flex items-center text-sm text-gray-500">
                              <User className="w-4 h-4 mr-1" />
                              {event.speaker}
                            </div>
                          )}
                          <div className="mt-2">
                            <Badge className={getBadgeColor(event.type)}>
                              {event.type}
                            </Badge>
                          </div>
                          <div className="flex justify-start gap-2 mt-4 pt-4 border-t border-gray-100">
                            <ActionButtons event={event} />
                          </div>
                        </>
                      )}
                    </div>
                  </TableCell>
                  {!isMobile && !isTablet && (
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <MapPin className="w-4 h-4 mr-1" />
                          {event.location}
                        </div>
                        {event.speaker && (
                          <div className="flex items-center text-sm">
                            <User className="w-4 h-4 mr-1" />
                            {event.speaker}
                          </div>
                        )}
                      </div>
                    </TableCell>
                  )}
                  {!isMobile && (
                    <TableCell>
                      <Badge className={getBadgeColor(event.type)}>
                        {event.type}
                      </Badge>
                    </TableCell>
                  )}
                  {!isMobile && (
                    <TableCell className="text-right">
                      <ActionButtons event={event} />
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      )}
    </Card>
  );
};