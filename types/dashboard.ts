export interface DashboardPredication {
    id: number
    titre: string
    date: string
    miniature?: string
    video_id: string
  }
  
  export interface DashboardPCelebration {
    id: number
    lieu: string
    adresse: string
    jour: string
    horaire: string
    created_at: string
  }
  
  export interface DashboardData {
    predicationsCount: number | null
    celebrationsCount: number | null
    latestPredications: DashboardPredication[]
    latestCelebrations: DashboardPCelebration[]
    adminsCount: number
  }