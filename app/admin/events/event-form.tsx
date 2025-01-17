'use client';

import { useState } from 'react';
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
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useToast } from "@/hooks/use-toast";
import { EventType } from "@/types/event";
import { handleAddEvenement } from "@/lib/event";

interface EventFormProps {
  onSuccess: () => void;
}

export default function EventForm({ onSuccess }: EventFormProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState<Date>();
  
  const eventTypes: { label: string; value: EventType }[] = [
    { label: "Réunion", value: "intercession" },
    { label: "Formation", value: "formation" },
    { label: "Célébration", value: "celebration" },
    { label: "Évangélisation", value: "évangelisation" },
    { label: "Séminaire", value: "séminaire" },
  ];

  async function onSubmit(formData: FormData) {
    setIsLoading(true);
    try {
      if (!date) throw new Error("La date est requise");

      const evenement = {
        title: formData.get('title') as string,
        date: format(date, 'yyyy-MM-dd'),
        type: formData.get('type') as EventType,
        location: formData.get('location') as string,
        time: formData.get('time') as string,
        speaker: formData.get('speaker') as string || undefined,
        image: "/images/events/event.jpg", // Image par défaut
      };

      const infos = {
        description: formData.get('description') as string,
        contact_email: formData.get('contact_email') as string,
        contact_telephone: formData.get('contact_telephone') as string,
      };

      await handleAddEvenement(evenement, infos);
      
      toast({
        title: "Événement créé !",
        description: "L'événement a été ajouté avec succès.",
      });
      
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
    <form action={onSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Titre</label>
          <Input required name="title" placeholder="Titre de l'événement" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Type</label>
          <Select name="type" required>
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
          <Input required name="time" type="time" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Lieu</label>
          <Input required name="location" placeholder="Lieu de l'événement" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Intervenant</label>
          <Input name="speaker" placeholder="Nom de l'intervenant (optionnel)" />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium">Description</label>
          <Textarea
            name="description"
            placeholder="Description détaillée de l'événement"
            rows={4}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Email de contact</label>
          <Input
            name="contact_email"
            type="email"
            placeholder="Email de contact"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Téléphone de contact</label>
          <Input
            name="contact_telephone"
            type="tel"
            placeholder="Téléphone de contact"
          />
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Création..." : "Créer l'événement"}
        </Button>
      </div>
    </form>
  );
}