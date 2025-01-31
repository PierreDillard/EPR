"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Locale } from 'date-fns';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LucideProps } from "lucide-react";

interface EventFormMainFieldsProps {
  eventData: {
    title: string;
    type: string;
    location: string;
    time: string;
    speaker: string;
  };
  updateEventData: (field: keyof EventFormMainFieldsProps['eventData'], value: string) => void;
  eventTypes: { label: string; value: string; }[];
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;

  
  cn: (...classes: string[]) => string;
  CalendarIcon: (props: LucideProps) => JSX.Element;
  Calendar: any; // ou le type approprié
  Popover: React.FC<any>;
  PopoverTrigger: React.FC<any>;
  PopoverContent: React.FC<any>;
  fr: Locale;
}

export default function EventFormMainFields({
  eventData,
  updateEventData,
  eventTypes,
  date,
  setDate,
  cn,
  CalendarIcon,
  Calendar,
  Popover,
  PopoverTrigger,
  PopoverContent,
  fr,
}: EventFormMainFieldsProps) {

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Titre */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Titre</label>
        <Input
          required
          value={eventData.title}
          onChange={(e) => updateEventData('title', e.target.value)}
          placeholder="Titre de l'événement"
        />
      </div>

      {/* Type */}
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

      {/* Date */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Date</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !date ? "text-muted-foreground" : ""
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? date.toLocaleDateString('fr-FR') : "Sélectionner une date"}
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

      {/* Horaire */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Horaire</label>
        <Input
          required
          type="time"
          value={eventData.time}
          onChange={(e) => updateEventData('time', e.target.value)}
        />
      </div>

      {/* Lieu */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Lieu</label>
        <Input
          required
          value={eventData.location}
          onChange={(e) => updateEventData('location', e.target.value)}
          placeholder="Lieu de l'événement"
        />
      </div>

      {/* Intervenant */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Intervenant</label>
        <Input
          value={eventData.speaker}
          onChange={(e) => updateEventData('speaker', e.target.value)}
          placeholder="Nom de l'intervenant (optionnel)"
        />
      </div>
    </div>
  );
}
