import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Image from 'next/image'
import { Card } from "@/components/ui/card"
import {
  Video,
  Calendar,
  Users,
  TrendingUp
} from "lucide-react"
import DashboardStats from './dashboard-stats'
import LatestContent from './latest-content'

export default async function DashboardPage() {
  const supabase = createServerComponentClient({ cookies })
  
  // Récupérer les statistiques
  const [
    { count: predicationsCount },
    { count: celebrationsCount },
    { data: latestPredications },
    { data: latestCelebrations },
    { data: adminsCount }
  ] = await Promise.all([
    supabase.from('predications').select('*', { count: 'exact' }),
    supabase.from('celebrations').select('*', { count: 'exact' }),
    supabase.from('predications').select('*').order('date', { ascending: false }).limit(5),
    supabase.from('celebrations').select('*').order('created_at', { ascending: false }).limit(5),
    supabase.from('admins').select('*', { count: 'exact' })
  ])

  const stats = [
    {
      name: 'Prédications',
      value: predicationsCount || 0,
      icon: Video,
      description: 'Total des prédications',
      color: 'text-blue-600'
    },
    {
      name: 'Célébrations',
      value: celebrationsCount || 0,
      icon: Calendar,
      description: 'Lieux de célébrations',
      color: 'text-green-600'
    },
    {
      name: 'Administrateurs',
      value: Array.isArray(adminsCount) ? adminsCount.length : 0, 
      icon: Users,
      description: 'Nombre d\'administrateurs',
      color: 'text-purple-600'
    }
  ]
  console.log(stats);
  console.log('Prédications récentes :', latestPredications);
console.log('Célébrations récentes :', latestCelebrations);

  return (
    <div className="space-y-8 md:space-y-24">
      <div>
        <h1 className="text-2xl font-bold mt-6">Tableau de bord</h1>
        <p className="text-gray-600">Aperçu des statistiques et activités récentes</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.name} className="p-6">
              <div className="flex items-center">
                <div className={`p-2 rounded-lg ${stat.color} bg-opacity-10`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-semibold">{stat.value}</p>
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-600">{stat.description}</p>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Dernières prédications */}
        <Card>
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Dernières prédications</h2>
            <div className="space-y-4">
              {latestPredications?.map((predication) => (
                 <div key={predication.id} className="flex items-center gap-4">
                 {predication.miniature && (
                   <div className="relative w-32 h-20 flex-shrink-0">
                     <Image
                       src={predication.miniature}
                       alt={predication.titre}
                       fill
                       sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                       className="object-cover rounded"
                       unoptimized // Pour les images externes comme YouTube
                     />
                   </div>
                 )}
                  <div>
                    <p className="font-medium">{predication.titre}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(predication.date).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Dernières célébrations */}
        <Card>
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Lieux de célébration</h2>
            <div className="space-y-4">
              {latestCelebrations?.map((celebration) => (
                <div key={celebration.id} className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-green-100">
                    <Calendar className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">{celebration.lieu}</p>
                  
                    <p className="text-sm text-gray-500">{celebration.adresse}</p>
                    <p className="text-sm text-gray-600">
                      {celebration.jour} - {celebration.horaire}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}