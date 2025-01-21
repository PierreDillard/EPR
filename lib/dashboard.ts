import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import type { DashboardData, DashboardPredication, DashboardPCelebration } from '@/types/dashboard'

export async function getDashboardData(): Promise<DashboardData> {
  const supabase = createServerComponentClient({ cookies })
  
  try {
    const [
      { count: predicationsCount, error: predicationsError },
      { count: celebrationsCount, error: celebrationsError },
      { data: latestPredicationsData, error: latestPredicationsError },
      { data: latestCelebrationsData, error: latestCelebrationsError },
      { data: adminsCount, error: adminsError }
    ] = await Promise.all([
      supabase.from('predications').select('*', { count: 'exact' }),
      supabase.from('celebrations').select('*', { count: 'exact' }),
      supabase.from('predications')
        .select('*')
        .order('date', { ascending: false })
        .limit(5),
      supabase.from('celebrations')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5),
      supabase.from('admins').select('*', { count: 'exact' })
    ])

    if (predicationsError) throw predicationsError
    if (celebrationsError) throw celebrationsError
    if (latestPredicationsError) throw latestPredicationsError
    if (latestCelebrationsError) throw latestCelebrationsError
    if (adminsError) throw adminsError

    // Convertir les données null en tableaux vides avec le bon type
    const latestPredications: DashboardPredication[] = latestPredicationsData?.map(pred => ({
      id: pred.id,
      titre: pred.titre,
      date: pred.date,
      miniature: pred.miniature,
      video_id: pred.video_id
    })) || [];

    const latestCelebrations: DashboardPCelebration[] = latestCelebrationsData?.map(celeb => ({
      id: celeb.id,
      lieu: celeb.lieu,
      adresse: celeb.adresse,
      jour: celeb.jour,
      horaire: celeb.horaire,
      created_at: celeb.created_at
    })) || [];

    return {
      predicationsCount: predicationsCount || 0,
      celebrationsCount: celebrationsCount || 0,
      latestPredications,
      latestCelebrations,
      adminsCount: Array.isArray(adminsCount) ? adminsCount.length : 0
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des données du dashboard:', error)
    throw error
  }
}