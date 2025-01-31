"use client";

import { useState, useEffect } from 'react';
import { format } from "date-fns";
import { fr } from "date-fns/locale";

import { cn } from "@/lib/utils/utils";
import { CalendarIcon } from "lucide-react";
import { LucideProps } from "lucide-react";

import { handleAddEvenement, updateEvenement } from "@/lib/event";
import { uploadEventImage } from '@/lib/services/UploadService';

import { EventType } from "@/types/event";
import { getDefaultEventImage, getValidEventType } from '@/utils/event';

import { useToast } from "@/hooks/use-toast";
import Loading from '@/components/ui/Loading';

import {
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";

import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";

import EventFormMainFields from './EventFormMainFields';
import EventFormImageField from './EventFormImageField';
import EventFormInfosFields from './EventFormInfosFields';

// Interface initiale non modifiée
interface EventFormProps {
  onSuccess: () => void;
  initialData?: {
    title: string;
    date: string;
    time: string;
    location: string;
    speaker?: string;
    type: EventType
    image?: string;
    description?: string;
    contact_email?: string;
    contact_telephone?: string;
  };
  eventId?: string;
}

export default function EventForm({ onSuccess, initialData, eventId }: EventFormProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Date et image
  const [date, setDate] = useState<Date | undefined>(
    initialData?.date ? new Date(initialData.date) : undefined
  );
  const [selectedImage, setSelectedImage] = useState<string | File>(
    initialData?.image || getDefaultEventImage(initialData?.type || 'reunion')
  );

  // États liés à la table "evenements"
  const [eventData, setEventData] = useState({
    title: initialData?.title || '',
    type: getValidEventType(initialData?.type),
    location: initialData?.location || '',
    time: initialData?.time || '',
    speaker: initialData?.speaker || ''
  });

  // États liés à la table "evenements_infos"
  const [eventInfos, setEventInfos] = useState({
    description: initialData?.description || '',
    contact_email: initialData?.contact_email || '',
    contact_telephone: initialData?.contact_telephone || ''
  });

  useEffect(() => {
    if (initialData) {
      setEventData({
        title: initialData.title || '',
        type: initialData.type || '',
        location: initialData.location || '',
        time: initialData.time || '',
        speaker: initialData.speaker || ''
      });
      setEventInfos({
        description: initialData.description || '',
        contact_email: initialData.contact_email || '',
        contact_telephone: initialData.contact_telephone || ''
      });
      if (initialData.date) {
        setDate(new Date(initialData.date));
      }
    }
  }, [initialData]);

  const updateEventData = (field: keyof typeof eventData, value: string) => {
    setEventData(prev => ({ ...prev, [field]: value }));
  };

  const updateEventInfos = (field: keyof typeof eventInfos, value: string) => {
    setEventInfos(prev => ({ ...prev, [field]: value }));
  };

  const eventTypes = [
    { label: "Réunion", value: "reunion" },
    { label: "Formation", value: "formation" },
    { label: "Célébration", value: "celebration" },
    { label: "Évangélisation", value: "evangelisation" },
    { label: "Séminaire", value: "seminaire" },
  ];

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!date) throw new Error("La date est requise");

      let imageUrl = typeof selectedImage === 'string' ? selectedImage : '';
      if (selectedImage instanceof File) {
        try {
          imageUrl = await uploadEventImage(selectedImage);
        } catch (error) {
          toast({
            title: "Erreur d'upload",
            description: "Impossible d'uploader l'image. L'événement ne sera pas créé.",
            variant: "destructive",
          });
          return;
        }
      }

      const evenement = {
        title: eventData.title,
        date: format(date, 'yyyy-MM-dd'),
        type: eventData.type as EventType,
        location: eventData.location,
        time: eventData.time,
        speaker: eventData.speaker || undefined,
        image: imageUrl,
      };

      const infos = {
        description: eventInfos.description,
        contact_email: eventInfos.contact_email,
        contact_telephone: eventInfos.contact_telephone
      };

      if (eventId) {
        await updateEvenement(eventId, evenement, infos);
        toast({
          title: "Événement mis à jour !",
          description: "L'événement a été modifié avec succès.",
        });
      } else {
        await handleAddEvenement(evenement, infos);
        toast({
          title: "Événement créé !",
          description: "L'événement a été ajouté avec succès.",
        });
      }

      onSuccess();
    } catch (error) {
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Une erreur est survenue",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/** Sous‐composant 1 : Champs principaux (titre, type, date, horaire, lieu, etc.) */}
      <EventFormMainFields
        eventData={eventData}
        updateEventData={updateEventData}
        eventTypes={eventTypes}
        date={date}
        setDate={setDate}
        cn={cn}
        CalendarIcon={CalendarIcon as any}
        Calendar={Calendar}
        Popover={Popover}
        PopoverTrigger={PopoverTrigger}
        PopoverContent={PopoverContent}
        fr={fr}
      />

      {/** Sous‐composant 2 : Image de l'événement */}
      <EventFormImageField
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        eventType={eventData.type}
      />

      {/** Sous‐composant 3 : Infos complémentaires (description, email, téléphone) */}
      <EventFormInfosFields
        eventInfos={eventInfos}
        updateEventInfos={updateEventInfos}
      />

      <div className="flex justify-end gap-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? <Loading /> : eventId ? "Mettre à jour" : "Créer"}
        </Button>
      </div>
    </form>
  );
}
