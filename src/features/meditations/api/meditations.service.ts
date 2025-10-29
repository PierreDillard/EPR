import type { SupabaseClient } from "@supabase/supabase-js";
import type { CreateMeditationInput, MeditationsService, UpdateMeditationInput } from '@/core/services/admin/services';
import type { Meditation } from '../types/meditations.types';

export function createSupabaseMeditationsService(client: SupabaseClient): MeditationsService {
  return {
    async list() {
      const { data, error } = await client
        .from("meditations")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Erreur lors de la récupération des méditations:", error);
        throw error;
      }

      return (data ?? []) as Meditation[];
    },

    async get(id) {
      const { data, error } = await client
        .from("meditations")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Erreur lors de la récupération de la méditation:", error);
        throw error;
      }

      if (!data) {
        throw new Error("Méditation non trouvée");
      }

      return data as Meditation;
    },

    async create(input: CreateMeditationInput) {
      const { data, error } = await client
        .from("meditations")
        .insert([
          {
            ...input,
            published: input.published ?? false,
          },
        ])
        .select()
        .single();

      if (error) {
        console.error("Erreur lors de la création de la méditation:", error);
        throw error;
      }

      return data as Meditation;
    },

    async update(id, input: UpdateMeditationInput) {
      const { data, error } = await client
        .from("meditations")
        .update({
          ...input,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select()
        .single();

      if (error) {
        console.error("Erreur lors de la mise à jour de la méditation:", error);
        throw error;
      }

      return data as Meditation;
    },

    async togglePublished(id, currentState) {
      const { data, error } = await client
        .from("meditations")
        .update({
          published: !currentState,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select()
        .single();

      if (error) {
        console.error("Erreur lors du changement de statut de la méditation:", error);
        throw error;
      }

      return data as Meditation;
    },

    async delete(id) {
      const { error } = await client.from("meditations").delete().eq("id", id);

      if (error) {
        console.error("Erreur lors de la suppression de la méditation:", error);
        throw error;
      }
    },

    async countPublished() {
      const { count, error } = await client
        .from("meditations")
        .select("*", { count: "exact", head: true })
        .eq("published", true);

      if (error) {
        console.error("Erreur lors du comptage des méditations publiées:", error);
        throw error;
      }

      return count ?? 0;
    },
  };
}
