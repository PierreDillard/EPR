import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

async function getLatestMeditations() {
  const supabase = createServerComponentClient({ cookies })
  const { data: meditations } = await supabase
    .from('meditations')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })
    .limit(4)
  
  return meditations || []
}

export default async function MeditationSection() {
  const meditations = await getLatestMeditations()

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Méditations guidées</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez nos méditations guidées pour vous accompagner dans votre pratique quotidienne
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {meditations.map((meditation) => (
            <Card key={meditation.id} className="group hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                {meditation.image_url && (
                  <div className="relative h-48 w-full">
                    <Image
                      src={meditation.image_url}
                      alt={meditation.title}
                      fill
                      className="object-cover rounded-t-lg"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary">
                    {meditation.title}
                  </h3>
                  <div 
                    className="text-gray-600 line-clamp-2 text-sm mb-4"
                    dangerouslySetInnerHTML={{ 
                      __html: meditation.content.substring(0, 100) + '...' 
                    }}
                  />
                  <Link href={`/meditations/${meditation.id}`}>
                    <Button variant="outline" className="w-full">
                      Découvrir
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link href="/meditations">
            <Button variant="default" size="lg">
              Voir toutes les méditations
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

