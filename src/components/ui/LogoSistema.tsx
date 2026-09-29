import Image from 'next/image'
import { MARCAS_EMPRESAS } from '@/content/marcas-empresas'
import { VISUAL_SISTEMA } from '@/content/sistemas'
import { cn } from '@/lib/cn'

/**
 * Logo de um sistema: o PNG do manual (ou gerado no mesmo padrao) ou,
 * para sistemas com nome de empresa, a medalha oficial + o nome.
 * A altura vem de `className` (ex.: `h-14`); a largura acompanha.
 */
export function LogoSistema({
  codigo,
  nome,
  className,
  imediato = false,
  somenteMarca = false,
}: {
  codigo: string
  nome: string
  className?: string
  /** Carrega sem esperar entrar na tela (logos do Hero). */
  imediato?: boolean
  /** Empresas: so a medalha, sem o nome ao lado (espacos pequenos). */
  somenteMarca?: boolean
}) {
  const v = VISUAL_SISTEMA[codigo]
  if (!v) return <span className={cn('font-semibold', className)}>{nome}</span>

  if (v.logo) {
    return (
      <Image
        src={v.logo}
        alt={nome}
        sizes="(max-width: 640px) 50vw, 260px"
        loading={imediato ? 'eager' : 'lazy'}
        className={cn('w-auto object-contain', className)}
      />
    )
  }

  // Empresa: medalha + nome em caixa-alta, num SVG so — assim o nome escala
  // junto com a altura definida em `className`, como um logo de verdade.
  const m = MARCAS_EMPRESAS[v.empresa!]
  if (somenteMarca) {
    return (
      <svg viewBox="-1 -1 2 2" className={cn('w-auto', className)} role="img" aria-label={nome}>
        <circle r="1" fill={m.disco} />
        {m.camadas.map((c, i) => (
          <path key={i} d={c.d} fill={c.cor} />
        ))}
      </svg>
    )
  }
  const linhas = nome.toUpperCase().split(' ')
  const fs = linhas.length === 1 ? 38 : linhas.length === 2 ? 34 : 27
  const y0 = 50 - (linhas.length * fs) / 2 + fs * 0.82
  const largura = Math.round(124 + Math.max(...linhas.map((l) => l.length)) * fs * 0.58)
  return (
    <svg viewBox={`0 0 ${largura} 100`} className={cn('w-auto', className)} role="img" aria-label={nome}>
      <g transform="translate(50 50) scale(50)">
        <circle r="1" fill={m.disco} />
        {m.camadas.map((c, i) => (
          <path key={i} d={c.d} fill={c.cor} />
        ))}
      </g>
      {linhas.map((l, i) => (
        <text
          key={l}
          x="118"
          y={y0 + i * fs}
          fill={v.cor}
          fontSize={fs}
          fontWeight="700"
          letterSpacing="0.5"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {l}
        </text>
      ))}
    </svg>
  )
}
