"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

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
    { href: "#predications", label: "Prédications" },
    { href: "#contact", label: "Contact" },
  ]

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen ? "bg-gray-200/70 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            {/* Logo - Visible en mobile et desktop */}
            <div className="flex-shrink-0">
              <Link href="/">
                <div className="relative w-16 h-16 md:w-24 md:h-24">
                  <Image
                    src="/logo1.jpeg"
                    alt="EPR Logo"
                    fill
                    className="object-contain "
                    priority
                  />
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
                    isScrolled ? "text-gray-700 hover:text-gray-900" : "text-white hover:text-gray-200"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile menu button avec animation */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                className={`z-50 transition-colors ${isMobileMenuOpen ? "text-gray-900" : isScrolled ? "" : "text-white"}`}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <div className="relative w-6 h-6">
                  <span className={`absolute left-0 transform transition-transform duration-300 ease-in-out ${
                    isMobileMenuOpen ? "rotate-45 translate-y-0 top-3" : "translate-y-0 top-1"
                  } w-6 h-0.5 bg-current`}></span>
                  <span className={`absolute left-0 top-3 w-6 h-0.5 bg-current transition-opacity duration-300 ${
                    isMobileMenuOpen ? "opacity-0" : "opacity-100"
                  }`}></span>
                  <span className={`absolute left-0 transform transition-transform duration-300 ease-in-out ${
                    isMobileMenuOpen ? "-rotate-45 translate-y-0 top-3" : "translate-y-0 top-5"
                  } w-6 h-0.5 bg-current`}></span>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Overlay */}
      <div 
        className={`fixed inset-0 bg-white transition-opacity duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? "opacity-100 z-40" : "opacity-0 pointer-events-none -z-10"
        }`}
      >
        <div className={`flex flex-col items-center pt-24 h-full transition-transform duration-500 ease-in-out ${
          isMobileMenuOpen ? "translate-y-0" : "-translate-y-8"
        }`}>
          <div className="flex flex-col items-center space-y-6 p-8 w-full">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xl font-medium text-gray-900 hover:text-gray-600 transition-all duration-300 px-4 py-2 w-full text-center transform ${
                  isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}