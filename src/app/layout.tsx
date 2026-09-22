import type { Metadata } from 'next'
import { Manrope, Unbounded, JetBrains_Mono } from 'next/font/google'
import './globals.css'

/**
 * Corpo de texto. Manrope no lugar do Inter de sempre: mesma legibilidade
 * em telas pequenas, mas com um pouco mais de carater nas curvas — e o
 * suficiente para nao competir com a Unbounded do titulo.
 */
const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-sans-local',
  display: 'swap',
})

/**
 * Fonte de exibicao. Geometrica, com o "U" fechado e cantos quase
 * quadrados — parece desenhada para um logo de mapa, o que casa com o
 * nome Atlas. So aparece em titulos grandes; em corpo de texto ela
 * pesaria demais.
 */
const unbounded = Unbounded({
  subsets: ['latin'],
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
      className={`${manrope.variable} ${unbounded.variable} ${mono.variable}`}
    >
      <body className="font-sans antialiased">
        {children}
        <div className="textura-grao" aria-hidden />
      </body>
    </html>
  )
}
