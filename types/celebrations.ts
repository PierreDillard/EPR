export interface Celebration {
    id: number;
    lieu: string;
    adresse: string;
    horaire: string;
    jour: string;
    created_at?: string;
  }

  export interface CelebrationProps {
    lieu: string
    adresse: string
    horaire: string
    jour: string
  }