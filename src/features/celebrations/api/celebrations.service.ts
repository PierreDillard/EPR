import type { SupabaseClient } from "@supabase/supabase-js";
import type { CelebrationsService } from "@/core/services/admin/services";
import type { Celebration } from "../types/celebrations.types";

export function createSupabaseCelebrationsService(client: SupabaseClient): CelebrationsService {
  return {
    async list() {
      const { data, error } = await client
        .from("celebrations")
        .select("*")
        .order("id", { ascending: true });

      if (error) {
        console.error("Erreur lors de la récupération des célébrations:", error);
        throw error;
      }

      return (data ?? []) as Celebration[];
    },

    async get(id) {
      const { data, error } = await client
        .from("celebrations")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Erreur lors de la récupération de la célébration:", error);
        throw error;
      }

      if (!data) {
        throw new Error("Célébration non trouvée");
      }

      return data as Celebration;
    },

    async update(id, updateData) {
      const { data, error } = await client
        .from("celebrations")
        .update(updateData)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        console.error("Erreur lors de la mise à jour de la célébration:", error);
        throw error;
      }

      if (!data) {
        throw new Error("Célébration non trouvée après mise à jour");
      }

      return data as Celebration;
    },

    async count() {
      const { count, error } = await client
        .from("celebrations")
        .select("*", { count: "exact", head: true });

      if (error) {
        console.error("Erreur lors du comptage des célébrations:", error);
        throw error;
      }

      return count ?? 0;
    },
  };
}
