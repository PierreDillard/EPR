import type { Identifiable } from "@/core/types/common.types";

export interface Event extends Identifiable<string> {
  title: string;
  date: string;
  location: string;
  type: EventType;
  time?: string;
  speaker?: string;
  image: string;
}
  
  // types/evenements.ts

// types/event.ts
export type EventType = 'reunion' | 'formation' | 'celebration' | 'evangelisation' | 'seminaire'|'meditation';

export interface Evenement extends Identifiable<string> {
  title: string;
  date: string;
  type: EventType;
  location: string;
  time?: string 
  speaker?: string;
  image: string;

}

export interface EvenementInfo extends Identifiable<string> {
  evenement_id: string;
  description?: string;
  contact_email?: string;
  contact_telephone?: string;
  transport?: string;
  programme?: string;
}


export interface EvenementComplet extends Evenement {
  infos?: {

    description?: string;

    contact_email?: string;

    contact_telephone?: string;
    transport?: string;
    programme?: string;

  }[];
}
export interface EventStats {
  total: number
  upcoming: number
  thisMonth: number
}
