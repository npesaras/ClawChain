import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ClawChain',
  description: 'Investing in a Bountiful Future',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
