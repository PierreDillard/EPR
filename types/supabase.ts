export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      actualites: {
        Row: {
          id: number
          created_at: string
          title: string
          date: string
          image: string
          description: string
          published: boolean
        }
        Insert: {
          id?: number
          created_at?: string
          title: string
          date: string
          image: string
          description: string
          published?: boolean
        }
        Update: {
          id?: number
          created_at?: string
          title?: string
          date?: string
          image?: string
          description?: string
          published?: boolean
        }
      }
      celebrations: {
        Row: {
          id: number
          created_at: string
          jour: string
          horaire: string
          lieu: string
          adresse: string
        }
        Insert: {
          id?: number
          created_at?: string
          jour: string
          horaire: string
          lieu: string
          adresse: string
        }
        Update: {
          id?: number
          created_at?: string
          jour?: string
          horaire?: string
          lieu?: string
          adresse?: string
        }
      }
      predications: {
        Row: {
          id: number
          created_at: string
          titre: string
          date: string
          description: string
          youtube_id: string
        }
        Insert: {
          id?: number
          created_at?: string
          titre: string
          date: string
          description: string
          youtube_id: string
        }
        Update: {
          id?: number
          created_at?: string
          titre?: string
          date?: string
          description?: string
          youtube_id?: string
        }
      }
    }
  }
}