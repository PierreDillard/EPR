import './globals.css'
import type { Metadata } from 'next'
import { Inter,Playfair_Display, Montserrat  } from 'next/font/google'
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'

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
    icon: '/icon.png',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning >
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