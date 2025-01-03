"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Désactiver le défilement quand le menu mobile est ouvert
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  const navLinks = [
    { href: "#vision", label: "Notre Vision" },
    { href: "#celebrations", label: "Célébrations" },
    { href: "#actualites", label: "Actualités" },
    { href: "#contact", label: "Contact" },
  ]

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            <div className="flex-shrink-0 flex items-center gap-4">
              <Link href="/" className="flex items-center gap-4">
                <div className="relative w-24 h-24 hidden md:block">
                  <Image
                    src={'logo1.jpeg'}
                    alt="EPR Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <div className={`hidden lg:block transition-colors duration-300 ${
                  isScrolled || isMobileMenuOpen ? "text-gray-900" : "text-white"
                }`}>
                  <h2 className="text-lg font-bold leading-tight">
                    Ensemble pour le Royaume
                  </h2>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
                    isScrolled 
                      ? "text-gray-700 hover:text-gray-900" 
                      : "text-white hover:text-gray-200"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                className={`z-50 transition-colors ${isMobileMenuOpen ? "text-gray-900" : isScrolled ? "" : "text-white"}`}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-40 md:hidden">
          <div className="flex flex-col items-center pt-24 h-full">
            {/* Logo mobile */}
            <div className="relative w-24 h-24 mb-8">
              <Image
                src={'logo2.jpeg'}
                alt="EPR Logo"
                fill
                className="object-contain rounded-full"
                priority
              />
            </div>
            
            {/* Navigation Links */}
            <div className="flex flex-col items-center space-y-6 p-8 w-full">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xl font-medium text-gray-900 hover:text-gray-600 transition-colors px-4 py-2 w-full text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}