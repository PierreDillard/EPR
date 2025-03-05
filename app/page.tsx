import HeroBanner from "@/components/sections/hero-banner"
import Vision from "@/components/sections/vision"
import Celebrations from "@/components/sections/celebrations"
import Predications from "@/components/sections/predications" 
import Actualites from "@/components/sections/actualites"
import Contact from "@/components/sections/contact"
import MeditationSection from "@/components/sections/meditations"
import { getLatestMeditations } from "@/lib/meditations"

export default async function Home() {
  const meditations = await getLatestMeditations();
  return (
    <>
      <HeroBanner />
      <MeditationSection meditations={meditations} />
      <Vision />
      <Celebrations />
      <Actualites />
      <Predications /> 
      <Contact />
    </>
  )
}