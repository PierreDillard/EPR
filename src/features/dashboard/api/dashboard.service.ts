import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import type { DashboardData, DashboardPredication, DashboardPCelebration } from '../types/dashboard.types';
import { createServerAdminServices } from '@/core/services/admin/server';

export async function getDashboardData(): Promise<DashboardData> {
  const services = createServerAdminServices();
  const supabase = createServerComponentClient({ cookies });

  try {
    const [
      predications,
      celebrations,
      predicationsCount,
      celebrationsCount,
      { count: adminsCount, error: adminsError }
    ] = await Promise.all([
      services.predications.list(),
      services.celebrations.list(),
      services.predications.count(),
      services.celebrations.count(),
      supabase.from('admins').select('*', { count: 'exact' })
    ])

    if (adminsError) {
      throw adminsError
    }

    const latestPredications: DashboardPredication[] = predications
      .slice()
      .sort((a, b) => new Date(b.date ?? b.created_at ?? '').getTime() - new Date(a.date ?? a.created_at ?? '').getTime())
      .slice(0, 5)
      .map((pred) => ({
        id: pred.id,
        titre: pred.titre,
        date: pred.date,
        miniature: pred.miniature,
        video_id: pred.video_id ?? pred.youtube_id
      }))

    const latestCelebrations: DashboardPCelebration[] = celebrations
      .slice()
      .sort((a, b) => new Date(b.created_at ?? '').getTime() - new Date(a.created_at ?? '').getTime())
      .slice(0, 5)
      .map((celeb) => ({
        id: celeb.id,
        lieu: celeb.lieu,
        adresse: celeb.adresse,
        jour: celeb.jour,
        horaire: celeb.horaire,
        created_at: celeb.created_at ?? ''
      }))

    return {
      predicationsCount: predicationsCount || 0,
      celebrationsCount: celebrationsCount || 0,
      latestPredications,
      latestCelebrations,
      adminsCount: adminsCount ?? 0
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des données du dashboard:', error)
    throw error
  }
}
