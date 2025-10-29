import type { Identifiable, TimestampedEntity } from "@/core/types/common.types";

export interface DashboardPredication extends Identifiable<number> {
  titre: string;
  date: string;
  miniature?: string;
  video_id: string;
}

export interface DashboardPCelebration extends Identifiable<number>, TimestampedEntity {
  lieu: string;
  adresse: string;
  jour: string;
  horaire: string;
}

export interface DashboardData {
  predicationsCount: number;       // Changé de number|null à number
  celebrationsCount: number;       // Changé de number|null à number
  latestPredications: DashboardPredication[];
  latestCelebrations: DashboardPCelebration[];
  adminsCount: number;
}
