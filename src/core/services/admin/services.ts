import type { EventStats, Evenement, EvenementComplet, EvenementInfo } from "@/features/events/types/events.types";
import type { PredicationData } from "@/features/predications/types/predications.types";
import type { Celebration } from "@/features/celebrations/types/celebrations.types";
import type { Meditation } from "@/features/meditations/types/meditations.types";

export interface EventsService {
  list(): Promise<EvenementComplet[]>;
  getStats(): Promise<EventStats>;
  create(input: CreateEventInput): Promise<Evenement>;
  update(id: string, input: UpdateEventInput): Promise<EvenementComplet>;
  delete(id: string): Promise<void>;
}

export interface AdminServices {
  events: EventsService;
  predications: PredicationsService;
  celebrations: CelebrationsService;
  meditations: MeditationsService;
}

export interface CreateEventInput {
  event: Omit<Evenement, "id">;
  infos?: Omit<EvenementInfo, "id" | "evenement_id">;
}

export interface UpdateEventInput {
  event: Partial<Omit<Evenement, "id">>;
  infos?: Partial<Omit<EvenementInfo, "id" | "evenement_id">>;
}

export interface PredicationsService {
  list(): Promise<PredicationData[]>;
  addFromYoutubeUrl(url: string): Promise<PredicationData>;
  delete(id: number): Promise<void>;
  count(): Promise<number>;
}

export interface CelebrationsService {
  list(): Promise<Celebration[]>;
  get(id: number): Promise<Celebration>;
  update(id: number, data: Partial<Celebration>): Promise<Celebration>;
  count(): Promise<number>;
}

export interface CreateMeditationInput {
  title: string;
  content: string;
  image_url?: string;
  published?: boolean;
}

export interface UpdateMeditationInput extends Partial<CreateMeditationInput> {}

export interface MeditationsService {
  list(): Promise<Meditation[]>;
  get(id: string): Promise<Meditation>;
  create(input: CreateMeditationInput): Promise<Meditation>;
  update(id: string, input: UpdateMeditationInput): Promise<Meditation>;
  togglePublished(id: string, currentState: boolean): Promise<Meditation>;
  delete(id: string): Promise<void>;
  countPublished(): Promise<number>;
}
