import type { SupabaseClient } from "@supabase/supabase-js";
import type { PredicationsService } from "@/core/services/admin/services";
import type { PredicationData } from "../types/predications.types";

export function createSupabasePredicationsService(client: SupabaseClient): PredicationsService {
  return {
    async list() {
      const { data, error } = await client
        .from("predications")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Erreur lors de la récupération des prédications:", error);
        throw error;
      }

      return (data ?? []) as PredicationData[];
    },

    async addFromYoutubeUrl(url) {
      const response = await fetch("/api/admin/predications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
        credentials: "include",
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        const contentType = response.headers.get("content-type");
        let message = response.statusText;

        if (contentType?.includes("application/json")) {
          const payload = await response.json();
          message = payload.error ?? message;
        } else {
          const text = await response.text();
          message = text || message;
        }

        throw new Error(message);
      }

      const payload = await response.json();
      return payload.data as PredicationData;
    },

    async delete(id) {
      const response = await fetch(`/api/admin/predications?id=${id}`, {
        method: "DELETE",
        headers: {
          "X-Requested-With": "XMLHttpRequest",
        },
        credentials: "include",
      });

      if (!response.ok) {
        const contentType = response.headers.get("content-type");
        let message = response.statusText;

        if (contentType?.includes("application/json")) {
          const payload = await response.json();
          message = payload.error ?? message;
        } else {
          const text = await response.text();
          message = text || message;
        }

        throw new Error(message);
      }
    },

    async count() {
      const { count, error } = await client
        .from("predications")
        .select("*", { count: "exact", head: true });

      if (error) {
        console.error("Erreur lors du comptage des prédications:", error);
        throw error;
      }

      return count ?? 0;
    },
  };
}
