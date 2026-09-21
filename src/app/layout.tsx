import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono-local',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Ecossistema Atlas — uma fonte de verdade',
  description:
    'Como os sistemas do R. Feitosa Group compartilham um cadastro único, com o Atlas Hub no centro dos dados mestres.',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${mono.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
