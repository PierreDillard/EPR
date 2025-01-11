"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Play } from "lucide-react"
import Image from "next/image"



export default function VideoCard({ id, title, date, thumbnail }: VideoProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer">
      <div className="relative aspect-video">
        <Image 
          src={`https://img.youtube.com/vi/${id}/maxresdefault.jpg`}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          quality={75}
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Play className="w-16 h-16 text-white" />
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <Calendar className="h-4 w-4" />
          {date}
        </div>
        <h3 className="text-lg font-semibold line-clamp-2">{title}</h3>
      </CardContent>
    </Card>
  )
}