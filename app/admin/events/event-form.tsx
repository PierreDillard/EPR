"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useToast } from "@/hooks/use-toast";
import { EventType } from "@/types/event";
import { handleAddEvenement, updateEvenement } from "@/lib/event";
import Loading from '@/components/ui/Loading';
import { getEventImage } from '@/utils/event';

interface EventFormProps {
  onSuccess: () => void;
  initialData?: {
    title: string;
    date: string;
    time: string;
    location: string;
    speaker?: string;
    type: EventType;
    description?: string;
    contact_email?: string;
    contact_telephone?: string;
  };
  eventId?: string;
}

export default function EventForm({ onSuccess, initialData, eventId }: EventFormProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState<Date | undefined>(
    initialData?.date ? new Date(initialData.date) : undefined
  );
  
  const [eventData, setEventData] = useState({
    title: initialData?.title || '',
    type: initialData?.type || '',
    location: initialData?.location || '',
    time: initialData?.time || '',
    speaker: initialData?.speaker || ''
  });

  // État pour la table evenements_infos
  const [eventInfos, setEventInfos] = useState({
    description: initialData?.description || '',
    contact_email: initialData?.contact_email || '',
    contact_telephone: initialData?.contact_telephone || ''
  });

  useEffect(() => {
    if (initialData) {
      console.log("INITIAL DATA",initialData);
      // Mettre à jour les données de l'événement
      setEventData({
        title: initialData.title || '',
        type: initialData.type || '',
        location: initialData.location || '',
        time: initialData.time || '',
        speaker: initialData.speaker || ''
      });

      // Mettre à jour les informations complémentaires
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
    { label: "Réunion", value: "intercession" },
    { label: "Formation", value: "formation" },
    { label: "Célébration", value: "celebration" },
    { label: "Évangélisation", value: "évangelisation" },
    { label: "Séminaire", value: "séminaire" },
  ];

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!date) throw new Error("La date est requise");

      const evenement = {
        title: eventData.title,
        date: format(date, 'yyyy-MM-dd'),
        type: eventData.type as EventType,
        location: eventData.location,
        time: eventData.time,
        speaker: eventData.speaker || undefined,
        image: getEventImage (eventData.type as EventType)
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

  // JSX du formulaire avec les nouveaux états
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Titre</label>
          <Input
            required
            value={eventData.title}
            onChange={(e) => updateEventData('title', e.target.value)}
            placeholder="Titre de l'événement"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Type</label>
          <Select
            value={eventData.type}
            onValueChange={(value) => updateEventData('type', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner un type" />
            </SelectTrigger>
            <SelectContent>
              {eventTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Date picker reste inchangé */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, 'PPP', { locale: fr }) : "Sélectionner une date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                locale={fr}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Horaire</label>
          <Input
            required
            type="time"
            value={eventData.time}
            onChange={(e) => updateEventData('time', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Lieu</label>
          <Input
            required
            value={eventData.location}
            onChange={(e) => updateEventData('location', e.target.value)}
            placeholder="Lieu de l'événement"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Intervenant</label>
          <Input
            value={eventData.speaker}
            onChange={(e) => updateEventData('speaker', e.target.value)}
            placeholder="Nom de l'intervenant (optionnel)"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium">Description</label>
          <Textarea
            rows={4}
            value={eventInfos.description}
            onChange={(e) => updateEventInfos('description', e.target.value)}
            placeholder="Description détaillée de l'événement"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Email de contact</label>
          <Input
            type="email"
            value={eventInfos.contact_email}
        
            onChange={(e) => updateEventInfos('contact_email', e.target.value)}
            placeholder="Email de contact"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Téléphone de contact</label>
          <Input
            type="tel"
            value={eventInfos.contact_telephone}
            onChange={(e) => updateEventInfos('contact_telephone', e.target.value)}
            placeholder="Téléphone de contact"
          />
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? <Loading /> : eventId ? "Mettre à jour" : "Créer"}
        </Button>
      </div>
    </form>
  );
}