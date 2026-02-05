import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { FeedbackWidget } from '@/components/FeedbackWidget'
import { FeedbackDashboard } from '@/components/FeedbackDashboard'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

export const metadata: Metadata = {
  title: 'Adam & Lisa Workspace - Slide Creator',
  description: 'Professional slide creation tool with Knowit branding',
  keywords: ['slides', 'presentation', 'knowit', 'workspace', 'productivity'],
  authors: [{ name: 'Adam & Lisa Team' }],
  robots: 'index, follow',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} antialiased`}>
        <div className="min-h-screen bg-gradient-to-br from-knowit-gray-50 to-knowit-blue-50">
          {children}
          <FeedbackWidget />
          <FeedbackDashboard />
        </div>
      </body>
    </html>
  )
}