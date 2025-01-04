import Link from "next/link"
import { Facebook, Instagram, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Ensemble pour le Royaume</h3>
            <p className="text-gray-400 text-sm">
              Rassembler des chrétiens de différentes dénominations pour l'avancement du Royaume de Dieu.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Liens Rapides</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#vision" className="text-gray-400 hover:text-white">
                  Notre Vision
                </Link>
              </li>
              <li>
                <Link href="#celebrations" className="text-gray-400 hover:text-white">
                  Célébrations
                </Link>
              </li>
              <li>
                <Link href="#actualites" className="text-gray-400 hover:text-white">
                  Actualités
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#contact" className="text-gray-400 hover:text-white">
                  Nous Contacter
                </Link>
              </li>
              <li>
                <Link href="/mentions-legales" className="text-gray-400 hover:text-white">
                  Mentions Légales
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Suivez-nous</h4>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/EnsemblePourLeRoyaume/?locale=fr_FR" className="text-gray-400 hover:text-white">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="https://www.instagram.com/ensemblepourleroyaume/" className="text-gray-400 hover:text-white">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="https://www.youtube.com/@ensemblepourleroyaume" className="text-gray-400 hover:text-white">
                <Youtube className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800">
          <p className="text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} Ensemble pour le Royaume. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  )
}