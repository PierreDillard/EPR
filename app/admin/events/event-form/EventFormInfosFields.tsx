"use client";

import React from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface EventInfos {
  description: string;
  contact_email: string;
  contact_telephone: string;
}

interface EventFormInfosFieldsProps {
  eventInfos: EventInfos;
  updateEventInfos: (field: keyof EventInfos, value: string) => void;
}

export default function EventFormInfosFields({
  eventInfos,
  updateEventInfos
}: EventFormInfosFieldsProps) {

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Description */}
      <div className="space-y-2 md:col-span-2">
        <label className="text-sm font-medium">Description</label>
        <Textarea
          rows={4}
          value={eventInfos.description}
          onChange={(e) => updateEventInfos('description', e.target.value)}
          placeholder="Description détaillée de l'événement (optionnel)"
        />
      </div>

      {/* Email de contact */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Email de contact</label>
        <Input
          type="email"
          value={eventInfos.contact_email}
          onChange={(e) => updateEventInfos('contact_email', e.target.value)}
          placeholder="Email de contact (optionnel)"
        />
      </div>

      {/* Téléphone de contact */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Téléphone de contact</label>
        <Input
          type="tel"
          value={eventInfos.contact_telephone}
          onChange={(e) => updateEventInfos('contact_telephone', e.target.value)}
          placeholder="Téléphone de contact (optionnel)"
        />
      </div>
    </div>
  );
}
