import type { Metadata, Viewport } from 'next'
import { Inter, Caveat } from 'next/font/google'

import './globals.css'

const _inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const _caveat = Caveat({ subsets: ['latin'], variable: '--font-caveat' })

export const metadata: Metadata = {
  title: 'Will You Be My Valentine?',
  description: 'A romantic Valentine\'s Day interactive experience',
}

export const viewport: Viewport = {
  themeColor: '#FDE2E4',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${_inter.variable} ${_caveat.variable} font-sans antialiased`}>{children}</body>
    </html>
  )
}
