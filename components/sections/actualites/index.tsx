import { fetchEvenementsAVenir } from '@/lib/event';
import EventsSection from './EventsSection';
import SectionTitle from '@/components/sections/section-title';
import { Calendar } from 'lucide-react'; // Adjust the import path as necessary

export default async function EventsPage() {
  const events = await fetchEvenementsAVenir();

  return (
    <section id="actualites" className="py-4 bg-gray-50">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle 
          title="Événements"      
          color="#00AECE"
          icon={Calendar}
          subtitle="Découvrez tous nos événements et rejoignez-nous pour grandir ensemble"
        />
        
        <EventsSection events={events || []} />
      </div>
    </section>
  );
}