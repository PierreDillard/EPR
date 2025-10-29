

import type { Identifiable, TimestampedEntity } from "@/core/types/common.types";

export interface Meditation extends Identifiable<string>, TimestampedEntity {
  title: string;
  content?: string;
  image_url?: string;
  published: boolean;
}
