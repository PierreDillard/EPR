export interface Identifiable<T = string | number> {
  id: T;
}

export interface TimestampedEntity {
  created_at: string;
  updated_at?: string | null;
}

export interface PartialTimestampedEntity {
  created_at?: string;
  updated_at?: string | null;
}
