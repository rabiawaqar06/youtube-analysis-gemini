import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'YouTube Video Analyzer',
  description: 'Analyze YouTube videos using AI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900`}>
        <div className="min-h-screen backdrop-blur-sm bg-opacity-90">
          {children}
        </div>
      </body>
    </html>
  )
}
