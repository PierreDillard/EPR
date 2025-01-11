/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
          404 - Page non trouvée
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          La page que vous recherchez n'existe pas.
        </p>
        <div className="mt-5">
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  )
}