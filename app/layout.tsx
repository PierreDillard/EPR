
import './globals.css'
import type { Metadata } from 'next'
import { Inter,Playfair_Display, Montserrat  } from 'next/font/google'
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import ScrollHandler from'@/components/utils/scroll-handler'

const inter = Inter({ subsets: ['latin'] })
const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair'
})

const montserrat = Montserrat({ 
  subsets: ['latin'],
  variable: '--font-montserrat'
})


export const metadata: Metadata = {
  title: 'Ensemble pour le Royaume',
  description: 'Rassembler des chrétiens de différentes dénominations pour l\'avancement du Royaume de Dieu',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon-32x32.png',
  },
  openGraph: {
    title: 'Ensemble pour le Royaume',
    description: 'Rassembler des chrétiens de différentes dénominations pour l\'avancement du Royaume de Dieu',
    url: 'https://www.ensemblepourleroyaume.com',
    siteName: 'Ensemble pour le Royaume',
    images: [
      {
        url: '/android-chrome-512x512.png',
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
    description: 'Rassembler des chrétiens de différentes dénominations pour l\'avancement du Royaume de Dieu',
    images: ['/android-chrome-512x512.png'],
  },
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="fr" suppressHydrationWarning >
         <ScrollHandler /> 
         <head>
         <link rel="icon" href="/favicon.ico" sizes="any" />
         <link
  rel="apple-touch-icon"
  href="/apple-icon?<generated>"
  type="image/<generated>"
  sizes="<generated>"
/>
  <link
  rel="icon"
  href="/icon?<generated>"
  type="image/<generated>"
  sizes="<generated>"
/>
  <link rel="manifest" href="/site.webmanifest" />
  <meta name="msapplication-TileColor" content="#ffffff" />
  <meta name="theme-color" content="#ffffff" />
</head>
  <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Navigation />
          <main>{children}</main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}