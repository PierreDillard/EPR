"use client"

import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

export default function QRCode() {
  return (
    <Card>
      <CardContent className="p-6 text-center">
        <h3 className="text-xl font-semibold mb-4">Rejoignez notre communauté</h3>
        <div className="relative w-48 h-48 mx-auto mb-4">
          <Image
            src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://chat.whatsapp.com/example"
            alt="QR Code WhatsApp"
            fill
            className="object-contain"
          />
        </div>
        <p className="text-gray-600">
          Scannez ce QR code pour rejoindre notre groupe WhatsApp
        </p>
      </CardContent>
    </Card>
  )
}