import { supabase } from "@/core/services/database/supabase.client";
import type { Celebration } from "../types/celebrations.types";

export async function getCelebrations() {
  try {
    const { data, error } = await supabase
      .from("celebrations")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      throw new Error(`Erreur lors de la récupération des célébrations : ${error.message}`);
    }

    return { data: data as Celebration[] | null, error: null };
  } catch (e) {
    console.error("Erreur inattendue:", e);
    throw e instanceof Error ? e : new Error("Erreur inattendue lors de la récupération des célébrations");
  }
}

export async function getCelebrationById(id: number) {
  const { data, error } = await supabase
    .from("celebrations")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(`Erreur lors de la récupération de la célébration : ${error.message}`);
  }

  if (!data) {
    throw new Error("Célébration non trouvée");
  }

  return data as Celebration;
}

export async function updateCelebration(id: number, updateData: Partial<Celebration>) {
  const { data, error } = await supabase
    .from("celebrations")
    .update(updateData)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(`Erreur lors de la mise à jour de la célébration : ${error.message}`);
  }

  if (!data) {
    throw new Error("Célébration non trouvée après mise à jour");
  }

  return data as Celebration;
}
