import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import Footer from '@/components/footer'
import NavigationWrapper from '@/components/layout/navigation-wrapper'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Providers } from '@/components/providers'
import SWRegister from './sw-register'
// import SWRegister from './sw-register' // si tu ajoutes l’enregistrement du SW

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ensemble pour le Royaume',
  description: "Rassembler des chrétiens de différentes dénominations pour l'avancement du Royaume de Dieu",
  metadataBase: new URL('https://www.ensemblepourleroyaume.com'),
  alternates: {
    canonical: 'https://www.ensemblepourleroyaume.com',
    languages: { 'fr-FR': 'https://www.ensemblepourleroyaume.com' },
  },
  themeColor: '#0f172a',
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'Ensemble pour le Royaume',
    description: "Rassembler des chrétiens de différentes dénominations pour l'avancement du Royaume de Dieu",
    url: 'https://www.ensemblepourleroyaume.com',
    siteName: 'Ensemble pour le Royaume',
    images: [
      {
        url: 'https://www.ensemblepourleroyaume.com/android-chrome-512x512.png',
        width: 512,
        height: 512,
        alt: 'Ensemble pour le Royaume',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@ensemblepourleroyaume',
    title: 'Ensemble pour le Royaume',
    description: "Rassembler des chrétiens de différentes dénominations pour l'avancement du Royaume de Dieu",
    images: ['https://www.ensemblepourleroyaume.com/android-chrome-512x512.png'],
  },
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
          >
            <NavigationWrapper />
            <main className="bg-gray-900">{children}</main>
            <Footer />
            <Toaster />
          </ThemeProvider>
          <SpeedInsights />
          <SWRegister /> 
        </Providers>
      </body>
    </html>
  )
}
