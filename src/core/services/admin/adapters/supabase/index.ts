import type { SupabaseClient } from "@supabase/supabase-js";
import { createSupabaseCelebrationsService } from "@/features/celebrations/api/celebrations.service";
import { createSupabaseEventsService } from "@/features/events/api/events.service";
import { createSupabasePredicationsService } from "@/features/predications/api/predications.service";
import { createSupabaseMeditationsService } from "@/features/meditations/api/meditations.service";
import type { AdminServices } from "../../services";

export function createSupabaseAdminServices(client: SupabaseClient): AdminServices {
  return {
    events: createSupabaseEventsService(client),
    predications: createSupabasePredicationsService(client),
    celebrations: createSupabaseCelebrationsService(client),
    meditations: createSupabaseMeditationsService(client),
  };
}
