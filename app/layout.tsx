import type { Metadata } from 'next'
import { Noto_Sans_Devanagari } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const devanagariFont = Noto_Sans_Devanagari({
  subsets: ['latin', 'devanagari'],
  weight: ['400', '500', '700', '900'],
  variable: '--font-devanagari',
})

export const metadata: Metadata = {
  title: 'Varaaz - Art & Learning',
  description: 'Explore watercolor courses and book personalized art sessions',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={devanagariFont.variable}>
      <body className="bg-white text-gray-900 font-devanagari">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
