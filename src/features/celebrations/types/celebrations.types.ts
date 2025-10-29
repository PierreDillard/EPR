import type { Identifiable, PartialTimestampedEntity } from "@/core/types/common.types";

export interface Celebration extends Identifiable<number>, PartialTimestampedEntity {
  lieu: string;
  adresse: string;
  horaire: string;
  jour: string;
}

  export interface CelebrationProps {
    lieu: string
    adresse: string
    horaire: string
    jour: string
    image?: string;
  }
