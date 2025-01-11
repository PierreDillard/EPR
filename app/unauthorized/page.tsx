/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
export default function UnauthorizedPage() {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Accès non autorisé
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Vous n'avez pas les droits nécessaires pour accéder à cette page.
          </p>
          <div className="mt-5">
            <a
              href="/login"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800"
            >
              Retour à la connexion
            </a>
          </div>
        </div>
      </div>
    );
  }