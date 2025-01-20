// middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Liste des paramètres à supprimer
const BLOCKED_PARAMS = ['fbclid', 'utm_source', 'utm_medium', 'utm_campaign']

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  
  // Nettoyage des URLs
  const url = new URL(req.url)
  let cleaned = false

  // Vérifier si l'URL contient des paramètres à nettoyer
  BLOCKED_PARAMS.forEach(param => {
    if (url.searchParams.has(param)) {
      url.searchParams.delete(param)
      cleaned = true
    }
  })

  // Si un nettoyage est nécessaire, rediriger vers l'URL propre
  if (cleaned) {
    return NextResponse.redirect(url)
  }

  // Initialiser Supabase
  const supabase = createMiddlewareClient({ req, res })

  // Vérifier la session
  const { data: { session } } = await supabase.auth.getSession()

  // Si on accède à /login
  if (req.nextUrl.pathname === '/login') {
    if (session) {
      return NextResponse.redirect(new URL('/admin/dashboard', req.url))
    }
    return res
  }

  // Si on accède à une route admin
  if (req.nextUrl.pathname.startsWith('/admin')) {
    if (!session) {
      return NextResponse.redirect(new URL('/login', req.url))
    }

    try {
      const { data: admin, error } = await supabase
        .from('admins')
        .select('is_super_admin')
        .eq('id', session.user.id)
        .single()

      if (error || !admin) {
        return NextResponse.redirect(new URL('/unauthorized', req.url))
      }

      return res
    } catch (error) {
      console.error('Erreur middleware:', error)
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }

  return res
}

// Mise à jour du matcher pour inclure toutes les routes
export const config = {
  matcher: [
    '/',              // Route principale
    '/login',
    '/admin/:path*',
    '/unauthorized',
    '/:path*'         // Toutes les autres routes
  ]
}