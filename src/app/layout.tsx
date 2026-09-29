import type { Metadata } from 'next'
import { Source_Sans_3, JetBrains_Mono } from 'next/font/google'
import './globals.css'

/**
 * Fonte unica do site, replicando a identidade RF Group: Source Sans 3
 * em toda parte (corpo e titulos), do peso fino (300, para titulos
 * grandes) ao semi-negrito (700, para as palavras de destaque e o
 * corpo mais denso). Substitui a dupla serifada (Source Serif 4 +
 * Spectral) da direcao "Atlas cartografico" anterior.
 */
const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans-local',
  display: 'swap',
})

/**
 * Fonte de exibicao. Mesma familia do corpo — a identidade do rf-group
 * usa uma unica sans em tudo, so variando o peso (300 fino em titulos,
 * 700 nas palavras de destaque).
 */
const spectral = Source_Sans_3({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-display',
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
    <html
      lang="pt-BR"
      className={`${sourceSans.variable} ${spectral.variable} ${mono.variable}`}
    >
      <body className="fundo-atlas font-sans antialiased">{children}</body>
    </html>
  )
}
