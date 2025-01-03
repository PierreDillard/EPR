"use client"

import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Clock, Calendar } from "lucide-react"
import type { CelebrationProps } from "@/types/celebrations"



export default function CelebrationCard({ lieu, adresse, horaire, jour }: CelebrationProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-4">{lieu}</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-gray-500" />
            <span className="text-gray-600">{adresse}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-gray-500" />
            <span className="text-gray-600">{horaire}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span className="text-gray-600">{jour}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}