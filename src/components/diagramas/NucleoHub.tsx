'use client'

import { COR_HUB } from '@/lib/cores'
import { LOGO_TRI } from '@/content/logo-grupo'

/**
 * O nucleo: o simbolo oficial do RFEITOSA GROUP (os tres triangulos, em
 * vetor) num medalhao branco — o mesmo padrao dos nos, que mostram so o
 * simbolo de cada sistema —
 * com aneis concentricos de opacidade decrescente. Os aneis dao ao centro
 * um peso optico maior que o de qualquer modulo — que e literalmente a
 * tese: um no entre os outros nao comunicaria "fonte de verdade".
 */
export function NucleoHub({ atenuado }: { atenuado: boolean }) {
  // Simbolo ocupa x 1.8..100.4 e y 1..136 no viewBox do logo.
  const esc = 19 / 135
  return (
    <g style={{ opacity: atenuado ? 0.55 : 1, transition: 'opacity 300ms' }}>
      <circle r={25} fill="none" stroke={COR_HUB} strokeWidth={0.35} strokeOpacity={0.18} style={{ animation: 'pulsar-nucleo 4.5s ease-in-out infinite' }} />
      <circle r={20} fill="none" stroke={COR_HUB} strokeWidth={0.45} strokeOpacity={0.3} />
      <circle r={15.5} style={{ fill: '#fff' }} stroke={COR_HUB} strokeWidth={1} strokeOpacity={0.7} />
      <g transform={`scale(${esc}) translate(-51.1 -68.5)`} role="img" aria-label="RFEITOSA Group">
        {LOGO_TRI.map((t, i) => (
          <path key={i} d={t.d} fill={t.color} />
        ))}
      </g>
      <text textAnchor="middle" y={33} style={{ fill: 'var(--color-texto-fraco)' }} fontSize={3.6} letterSpacing="0.16em">
        FONTE DE VERDADE
      </text>
    </g>
  )
}
