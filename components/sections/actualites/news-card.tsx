"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import Image from "next/image"
import { Calendar } from "lucide-react"

export interface NewsProps {
  title: string
  date: string
  image: string
  description: string
}

export default function NewsCard({ title, date, image, description }: NewsProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <CardHeader className="flex items-center gap-2 text-sm text-gray-500">
        <Calendar className="h-4 w-4" />
        {date}
      </CardHeader>
      <CardContent>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  )
}