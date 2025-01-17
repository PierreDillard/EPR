export interface Event {
    id: string;
    title: string;
    date: string;
    type: 'intercession' | 'formation' | 'celebration' | 'évangelisation';
    location: string;
    time?: string;
    speaker?: string;
    image: string;
    recurrent: boolean;
  }
  
  // types/evenements.ts

export type EventType = 'intercession' | 'formation' | 'celebration' | 'évangelisation'| 'séminaire';

export interface Evenement {
  id: string;
  title: string;
  date: string;
  type: EventType;
  location: string;
  time: string;
  speaker?: string;
  image: string;
}

export interface EvenementInfo {
  id: string;
  evenement_id: string;
  description?: string;
  contact_email?: string;
  contact_telephone?: string;
  transport?: string;
  programme?: string;
}

// Type combiné pour un événement avec ses infos
export interface EvenementComplet extends Evenement {
  infos?: EvenementInfo;
}