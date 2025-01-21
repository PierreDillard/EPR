import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

import type { DashboardData } from '@/types/dashboard'

export async function getDashboardData(): Promise<DashboardData> {
  const supabase = createServerComponentClient({ cookies })
  
  try {
    const [
      { count: predicationsCount, error: predicationsError },
      { count: celebrationsCount, error: celebrationsError },
      { data: latestPredications, error: latestPredicationsError },
      { data: latestCelebrations, error: latestCelebrationsError },
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

    return {
      predicationsCount,
      celebrationsCount,
      latestPredications,
      latestCelebrations,
      adminsCount: Array.isArray(adminsCount) ? adminsCount.length : 0
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des données du dashboard:', error)
    throw error
  }
}