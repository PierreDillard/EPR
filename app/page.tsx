import HeroBanner from "@/components/sections/hero-banner"
import Vision from "@/components/sections/vision"
import Celebrations from "@/components/sections/celebrations"
import Predications from "@/components/sections/predications" 
import Actualites from "@/components/sections/actualites"
import Contact from "@/components/sections/contact"

export default function Home() {
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