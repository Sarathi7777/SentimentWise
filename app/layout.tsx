import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/navbar'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'SentimentWise',
  description: 'Advanced sentiment analysis platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-[#0A0B14] text-white antialiased`} suppressHydrationWarning>
        <div className="fixed inset-0 bg-gradient-to-b from-teal-600/10 via-transparent to-transparent pointer-events-none" />
        <div className="relative z-10">
          <Navbar />
          <main>
            {children}
          </main>
        </div>
        <div className="fixed inset-0 -z-10 bg-[url('/grid.svg')] bg-center opacity-20 pointer-events-none [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div className="fixed inset-x-0 top-0 -z-10 h-96 rotate-180 bg-gradient-to-b from-teal-500/20 to-transparent blur-3xl pointer-events-none" />
      </body>
    </html>
  )
}
