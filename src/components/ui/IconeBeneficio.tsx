import type { IconeBeneficio as Tipo } from '@/types/ecossistema'

/**
 * Icones desenhados a mao, em SVG.
 *
 * Sem biblioteca de icones: sao seis, e cada um diz uma coisa especifica
 * (dois circulos virando um, um no que se ramifica). Um pacote de
 * milhares de icones genericos pesaria mais e diria menos.
 */
const CAMINHOS: Record<Tipo, React.ReactNode> = {
  deduplicacao: (
    <>
      <circle cx="9" cy="12" r="5" />
      <circle cx="15" cy="12" r="5" />
      <path d="M12 8.2v7.6" />
    </>
  ),
  consistencia: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v6M12 15v6M3 12h6M15 12h6" />
    </>
  ),
  integracao: (
    <>
      <circle cx="5" cy="6" r="2" />
      <circle cx="19" cy="6" r="2" />
      <circle cx="12" cy="18" r="2" />
      <path d="M5 8v4a2 2 0 002 2h1M19 8v4a2 2 0 01-2 2h-1" />
    </>
  ),
  extensibilidade: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <path d="M17.5 14.5v6M14.5 17.5h6" />
    </>
  ),
  governanca: (
    <>
      <path d="M12 3l7 3v5.5c0 4-3 7.5-7 9-4-1.5-7-5-7-9V6z" />
      <path d="M9.5 12l1.8 1.8L15 10" />
    </>
  ),
  escala: (
    <>
      <path d="M4 20V10M10 20V4M16 20v-7M22 20V7" />
    </>
  ),
}

export function IconeBeneficio({ nome }: { nome: Tipo }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden
    >
      {CAMINHOS[nome]}
    </svg>
  )
}
