"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"

export default function MapView() {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <Card className="w-full h-[400px] overflow-hidden">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d83998.95410694685!2d2.276995957977573!3d48.85883773930695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e1f06e2b70f%3A0x40b82c3688c9460!2sParis%2C%20France!5e0!3m2!1sfr!2sfr!4v1650000000000!5m2!1sfr!2sfr"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </Card>
  )
}