import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import Footer from '@/components/footer'
import NavigationWrapper from '@/components/layout/navigation-wrapper'
import { SpeedInsights } from "@vercel/speed-insights/next"
import GoogleAnalytics from '@/components/GoogleAnalytics'
import { Providers } from '@/components/providers'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ensemble pour le Royaume',
  description: "Rassembler des chrétiens de différentes dénominations pour l'avancement du Royaume de Dieu",
  metadataBase: new URL('https://www.ensemblepourleroyaume.com'),
  alternates: {
    canonical: 'https://www.ensemblepourleroyaume.com',
    languages: { 'fr-FR': 'https://www.ensemblepourleroyaume.com' },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/images/apple-touch-icon.png' 
   
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'Ensemble pour le Royaume',
    description: "Rassembler des chrétiens de différentes dénominations pour l'avancement du Royaume de Dieu",
    url: 'https://www.ensemblepourleroyaume.com',
    siteName: 'Ensemble pour le Royaume',
    images: [
      {
       
        url: 'https://www.ensemblepourleroyaume.com/images/android-chrome-512x512.png',
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
    images: ['https://www.ensemblepourleroyaume.com/images/android-chrome-512x512.png'],
  },
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
<link rel="icon" href="/favicon.ico" />
<link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
<link rel="manifest" href="/site.webmanifest" />
<meta name="theme-color" content="#0f172a" />
      
      <body className={`${inter.className}`} suppressHydrationWarning>
        
  
      <Providers>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          
          
          <NavigationWrapper />
         
          
          <main className=" bg-gray-900 backdrop-blur-[2px]">{children}</main>
          <Footer />
          <Toaster />
        </ThemeProvider>
        <SpeedInsights />
      </Providers>
      </body>
    </html>
  )
}
