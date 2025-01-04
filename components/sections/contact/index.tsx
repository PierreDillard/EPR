"use client"
import SectionTitle from "@/components/sections/section-title"
import ContactForm from "./contact-form"
import QRCode from "./qr-code"


export default function Contact() {
  return (
    <section id="contact" className="py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">

           <SectionTitle 
          title="Contact"
          color="#0A0A0A"
          subtitle="Nous sommes à votre écoute. N'hésitez pas à nous contacter"
        />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-xl font-semibold mb-6">Envoyez-nous un message</h3>
            <ContactForm />
          </div>
          <div className="flex items-center justify-center">
            <QRCode />
          </div>
        </div>
      </div>
    </section>
  )
}