import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SW-AI',
  description: 'Discover AI Tools That Work Together',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
