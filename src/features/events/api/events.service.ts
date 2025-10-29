import type { SupabaseClient } from "@supabase/supabase-js";
import type { EventsService, CreateEventInput, UpdateEventInput } from "@/core/services/admin/services";
import type { EvenementComplet } from "../types/events.types";
import { deleteImageFromServer } from "@/core/services/storage/UploadService";

export function createSupabaseEventsService(client: SupabaseClient): EventsService {
  return {
    async list() {
      const { data, error } = await client
        .from("evenements")
        .select(`
          *,
          infos: evenements_infos (*)
        `)
        .order("date", { ascending: true });

      if (error) {
        console.error("Erreur lors de la récupération des événements:", error);
        throw error;
      }

      return (data ?? []) as EvenementComplet[];
    },

    async getStats() {
      const today = new Date().toISOString().split("T")[0];
      const currentMonth = new Date().getMonth() + 1;

      const { data: events, error } = await client
        .from("evenements")
        .select("*")
        .order("date", { ascending: true });

      if (error) {
        console.error("Erreur lors du calcul des statistiques des événements:", error);
        throw error;
      }

      const total = events?.length ?? 0;
      const upcoming = events?.filter((event) => event.date >= today).length ?? 0;
      const thisMonth =
        events?.filter((event) => {
          const eventDate = new Date(event.date);
          return eventDate.getMonth() + 1 === currentMonth;
        }).length ?? 0;

      return {
        total,
        upcoming,
        thisMonth,
      };
    },

    async create({ event, infos }: CreateEventInput) {
      const { data: eventData, error: eventError } = await client
        .from("evenements")
        .insert([{ ...event }])
        .select()
        .single();

      if (eventError) {
        console.error("Erreur lors de l'ajout de l'événement:", eventError);
        throw eventError;
      }

      if (infos && eventData?.id) {
        const { error: infosError } = await client
          .from("evenements_infos")
          .insert([
            {
              ...infos,
              evenement_id: eventData.id,
            },
          ]);

        if (infosError) {
          await client.from("evenements").delete().eq("id", eventData.id);
          console.error("Erreur lors de l'ajout des informations:", infosError);
          throw infosError;
        }
      }

      return eventData;
    },

    async update(id, { event, infos }: UpdateEventInput) {
      const { error: eventError } = await client
        .from("evenements")
        .update(event)
        .eq("id", id);

      if (eventError) {
        console.error("Erreur lors de la mise à jour de l'événement:", eventError);
        throw eventError;
      }

      if (infos) {
        const { data: existingInfos } = await client
          .from("evenements_infos")
          .select()
          .eq("evenement_id", id)
          .maybeSingle();

        if (existingInfos) {
          const { error: updateError } = await client
            .from("evenements_infos")
            .update(infos)
            .eq("evenement_id", id);

          if (updateError) {
            console.error("Erreur lors de la mise à jour des infos:", updateError);
            throw updateError;
          }
        } else {
          const { error: insertError } = await client
            .from("evenements_infos")
            .insert([{ ...infos, evenement_id: id }]);

          if (insertError) {
            console.error("Erreur lors de la création des infos:", insertError);
            throw insertError;
          }
        }
      }

      const { data: updatedEvent, error: fetchError } = await client
        .from("evenements")
        .select(`
          *,
          infos: evenements_infos (*)
        `)
        .eq("id", id)
        .single();

      if (fetchError) {
        console.error("Erreur lors de la récupération de l'événement mis à jour:", fetchError);
        throw fetchError;
      }

      return updatedEvent as EvenementComplet;
    },

    async delete(id) {
      const { data: event, error: fetchError } = await client
        .from("evenements")
        .select("*")
        .eq("id", id)
        .single();

      if (fetchError) {
        console.error("Erreur lors de la récupération de l'événement:", fetchError);
        throw fetchError;
      }

      if (event?.image) {
        try {
          await deleteImageFromServer(event.image);
        } catch (imageError) {
          console.error("Erreur lors de la suppression de l'image:", imageError);
        }
      }

      const { error } = await client
        .from("evenements")
        .delete()
        .eq("id", id);

      if (error) {
        console.error("Erreur lors de la suppression de l'événement:", error);
        throw error;
      }
    },
  };
}
