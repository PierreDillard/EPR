import { getLatestMeditations } from "@/features/meditations/api/public";
import CelebrationsSection from "@/features/celebrations/components/CelebrationsSection";
import EventsSection from "@/features/events/components";
import PredicationsSection from "@/features/predications/components/PredicationsSection";
import HeroBanner from "@/features/landing/components/HeroBanner";
import VisionSection from "@/features/landing/components/VisionSection";
import ContactSection from "@/features/landing/components/contact";

export default async function Home() {
  const meditations = await getLatestMeditations();
  console.log("SUPABASE:", {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    anon: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  });
  
  return (
    <>
      <HeroBanner />
   
      <VisionSection />
      




      <CelebrationsSection />

      <EventsSection />


      <PredicationsSection /> 


      <ContactSection />
    </>
  )
}
