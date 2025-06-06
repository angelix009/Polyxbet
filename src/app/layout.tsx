import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'PolyXBets - The Future of Prediction Markets',
  description: 'Trade the future directly inside X. Revolutionary prediction markets with seamless X integration, real-time trading, and unprecedented transparency.',
  keywords: 'prediction markets, trading, crypto, blockchain, X integration, polymarket, betting, future trading',
  authors: [{ name: 'PolyXBets Team' }],
  openGraph: {
    title: 'PolyXBets - The Future of Prediction Markets',
    description: 'Trade the future directly inside X',
    url: 'https://polyxbets.vercel.app',
    siteName: 'PolyXBets',
    images: [
      {
        url: 'https://i.ibb.co/GQBMxRkX/Design-sans-titre-23.png',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PolyXBets - The Future of Prediction Markets',
    description: 'Trade the future directly inside X',
    images: ['https://i.ibb.co/GQBMxRkX/Design-sans-titre-23.png'],
  },
  icons: {
    icon: 'https://i.ibb.co/GQBMxRkX/Design-sans-titre-23.png',
    shortcut: 'https://i.ibb.co/GQBMxRkX/Design-sans-titre-23.png',
    apple: 'https://i.ibb.co/GQBMxRkX/Design-sans-titre-23.png',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="https://i.ibb.co/GQBMxRkX/Design-sans-titre-23.png" type="image/png" />
        <link rel="apple-touch-icon" href="https://i.ibb.co/GQBMxRkX/Design-sans-titre-23.png" />
        <meta name="theme-color" content="#0ea5e9" />
      </head>
      <body className="bg-neutral-950">{children}</body>
    </html>
  )
}