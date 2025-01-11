// middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  // Vérifier la session
  const { data: { session } } = await supabase.auth.getSession()

  // Si on accède à /login
  if (req.nextUrl.pathname === '/login') {
    if (session) {
      // Déjà connecté, rediriger vers le dashboard
      return NextResponse.redirect(new URL('/admin/dashboard', req.url))
    }
    return res
  }

  // Si on accède à une route admin
  if (req.nextUrl.pathname.startsWith('/admin')) {
    if (!session) {
      // Non connecté, rediriger vers login
      return NextResponse.redirect(new URL('/login', req.url))
    }

    try {
      // Vérifier si l'utilisateur est admin
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

export const config = {
  matcher: [
    '/login',
    '/admin/:path*',
    '/unauthorized'
  ]
}