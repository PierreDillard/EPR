"use client";

import React from 'react';
import EventImageUpload from '@/components/admin/EventImageUpload';
import { EventType } from '@/types/event'; // Adjust the import path as necessary

interface EventFormImageFieldProps {
  selectedImage: string | File;

  setSelectedImage: React.Dispatch<React.SetStateAction<string | File>>;
  eventType: EventType;
}

export default function EventFormImageField({
  selectedImage,
  setSelectedImage,
  eventType,
}: EventFormImageFieldProps) {

  return (
    <div className="space-y-2 md:col-span-2">
      <label className="text-sm font-medium">Image de l&apos;événement</label>
      <EventImageUpload
        eventType={eventType}
        onImageChange={(image) => setSelectedImage(image)}
        currentImage={typeof selectedImage === 'string' ? selectedImage : undefined}
      />
    </div>
  );
}
