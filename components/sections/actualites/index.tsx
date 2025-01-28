import SectionTitle from '@/components/sections/section-title';
import { Calendar } from 'lucide-react';
import { Suspense } from 'react';
import Loading from '@/components/ui/Loading';
import DynamicEvents from './DynamicEvents';

export default function EventsPage() {
  return (
    <section id="actualites" className="py-4 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle 
          title="Événements"      
          color="#00AECE"
          icon={Calendar}
          subtitle="Découvrez tous nos événements et rejoignez-nous pour grandir ensemble"
        />
        
        <Suspense fallback={<Loading />}>
          <DynamicEvents />
        </Suspense>
      </div>
    </section>
  );
}