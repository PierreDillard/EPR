import { fetchEvenementsAVenir } from '@/lib/event';
import { EventsClient } from './EventsClient';
import SectionTitle from '@/components/sections/section-title';

export default async function EventsPage() {

  const events = await fetchEvenementsAVenir();


  return (
    <section id="actualites" className="py-4 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle 
          title="Evénements"      
          color="#0A0A0A"
          subtitle="Découvrez tous nos événements et rejoignez-nous pour grandir ensemble"
        />
        
        {/* Liste complète des événements */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">Tous les événements</h2>
          <EventsClient initialEvents={events || []} />
        </div>
      </div>
    </section>
  );
}