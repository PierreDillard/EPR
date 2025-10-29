import { getLatestMeditations } from "@/features/meditations";
import { CelebrationsSection } from "@/features/celebrations";
import { EventsSection } from "@/features/events";
import { PredicationsSection } from "@/features/predications";
import { HeroBanner, VisionSection, ContactSection } from "@/features/landing";

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
