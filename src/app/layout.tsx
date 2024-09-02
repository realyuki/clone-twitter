import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { MSWComponent } from './_component/MSWComponent'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'X. It’s what’s happening / X',
  description: 'X. It’s what’s happening / X'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MSWComponent />
        {children}
      </body>
    </html>
  )
}
