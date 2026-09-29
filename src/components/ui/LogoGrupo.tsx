import { LOGO_EITOSA, LOGO_GROUP, LOGO_MONO, LOGO_TRI, LOGO_VIEWBOX } from '@/content/logo-grupo'

const VINHO = '#5f0006'

/**
 * Logo oficial do RFEITOSA GROUP, em vetor (o mesmo do site institucional).
 *  - `cor`: cores oficiais, para fundo claro;
 *  - `mono`: uma cor so (`currentColor`), para fundo escuro.
 */
export function LogoGrupo({ variante = 'cor', className }: { variante?: 'cor' | 'mono'; className?: string }) {
  const c = (cor: string) => (variante === 'mono' ? 'currentColor' : cor)
  return (
    <svg viewBox={LOGO_VIEWBOX} className={className} role="img" aria-label="RFEITOSA Group">
      {LOGO_TRI.map((t, i) => (
        <path key={i} d={t.d} fill={c(t.color)} opacity={variante === 'mono' ? [1, 0.55, 0.8][i] : 1} />
      ))}
      <path d={LOGO_MONO} fill={c(VINHO)} fillRule="evenodd" />
      <path d={LOGO_EITOSA} fill={c(VINHO)} />
      <rect x="258" y="103.5" width="197" height="2" fill={c(VINHO)} />
      <path d={LOGO_GROUP} fill={c(VINHO)} />
    </svg>
  )
}
