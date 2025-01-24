import { fetchEvenementsAVenir } from '@/lib/event';
import EventsSection from './EventsSection';
import SectionTitle from '@/components/sections/section-title';

export default async function EventsPage() {
  const events = await fetchEvenementsAVenir();

  return (
    <section id="actualites" className="py-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <SectionTitle 
          title="Événements"      
          color="#0A0A0A"
          subtitle="Découvrez tous nos événements et rejoignez-nous pour grandir ensemble"
        />
        
        <EventsSection events={events || []} />
      </div>
    </section>
  );
}