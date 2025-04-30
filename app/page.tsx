import HeroBanner from "@/components/sections/hero-banner"
import Vision from "@/components/sections/vision"
import Celebrations from "@/components/sections/celebrations"
import Predications from "@/components/sections/predications" 
import Actualites from "@/components/sections/actualites"
import Contact from "@/components/sections/contact"

import { getLatestMeditations } from "@/lib/meditations"



export default async function Home() {
  const meditations = await getLatestMeditations();
  console.log("SUPABASE:", {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    anon: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  });
  
  return (
    <>
      <HeroBanner />
   
      <Vision />
      




      <Celebrations />


      <Actualites />


      <Predications /> 


      <Contact />
    </>
  )
}