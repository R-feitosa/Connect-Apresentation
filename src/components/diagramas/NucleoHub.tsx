'use client'

import { COR_HUB } from '@/lib/cores'
import { MARCA_HUB } from '@/content/sistemas'

/**
 * O nucleo: o simbolo oficial do HUB (do manual de marca) num medalhao,
 * com aneis concentricos de opacidade decrescente. Os aneis dao ao centro
 * um peso optico maior que o de qualquer modulo — que e literalmente a
 * tese: um no entre os outros nao comunicaria "fonte de verdade".
 */
export function NucleoHub({ atenuado }: { atenuado: boolean }) {
  const alt = 21
  const larg = (alt * MARCA_HUB.width) / MARCA_HUB.height
  return (
    <g style={{ opacity: atenuado ? 0.55 : 1, transition: 'opacity 300ms' }}>
      <circle r={25} fill="none" stroke={COR_HUB} strokeWidth={0.35} strokeOpacity={0.18} style={{ animation: 'pulsar-nucleo 4.5s ease-in-out infinite' }} />
      <circle r={20} fill="none" stroke={COR_HUB} strokeWidth={0.45} strokeOpacity={0.3} />
      <circle r={15.5} style={{ fill: '#fff' }} stroke={COR_HUB} strokeWidth={1} strokeOpacity={0.7} />
      <image href={MARCA_HUB.src} x={-larg / 2} y={-alt / 2 - 0.5} width={larg} height={alt} />
      <text textAnchor="middle" y={33} style={{ fill: 'var(--color-texto-fraco)' }} fontSize={3.6} letterSpacing="0.16em">
        FONTE DE VERDADE
      </text>
    </g>
  )
}
