import type { Metadata } from 'next'
import { Source_Serif_4, Spectral, JetBrains_Mono } from 'next/font/google'
import './globals.css'

/**
 * Corpo de texto. Serifada de proposito: e a tese da direcao "Atlas
 * cartografico" — nada de grotesca geometrica generica, o texto todo
 * le como pagina de mapa antigo, nao como dashboard de SaaS.
 */
const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sans-local',
  display: 'swap',
})

/**
 * Fonte de exibicao. Serifa com desenho de atlas de biblioteca —
 * casa com o nome Atlas de forma literal, nao generica. So aparece em
 * titulos grandes; o peso dela em corpo de texto cansaria a leitura.
 */
const spectral = Spectral({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
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
      className={`${sourceSerif.variable} ${spectral.variable} ${mono.variable}`}
    >
      <body className="fundo-atlas font-sans antialiased">{children}</body>
    </html>
  )
}
