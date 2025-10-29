import type { Identifiable, TimestampedEntity } from "@/core/types/common.types";

export interface PredicationData extends Identifiable<number>, TimestampedEntity {
  youtube_id: string;
  video_id?: string;
  titre: string;
  date: string;
  miniature: string;
  description?: string;
  duration?: string;
  views?: number;
}

export interface VideoProps {
  id: string;
  title: string;
  date: string;
  thumbnail: string;
  description?: string;
}

export interface StatsProps {
  predicationsData: {
    date: string;
  }[];
}

export interface Video extends Identifiable<number> {
  youtube_id: string;
  title: string;
  description?: string;
  date: string;
  duration: string;
  views: number;
  thumbnail: string;
}
