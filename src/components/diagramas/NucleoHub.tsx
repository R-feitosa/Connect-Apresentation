'use client'

import { COR_HUB } from '@/lib/cores'

/**
 * O nucleo.
 *
 * Fica visualmente acima de tudo e e o unico elemento em latao da pagina.
 * Os aneis concentricos nao sao enfeite: eles dao ao centro um peso
 * optico maior que o de qualquer modulo, que e literalmente a tese —
 * um no entre os outros nao comunicaria "fonte de verdade".
 */
export function NucleoHub({ atenuado }: { atenuado: boolean }) {
  return (
    <g style={{ opacity: atenuado ? 0.55 : 1, transition: 'opacity 300ms' }}>
      {/* Aneis, nao discos. Latao PREENCHIDO em dois raios virava um
          borrao solido que engolia o texto interno — o nucleo precisa de
          peso optico, nao de area pintada. O peso vem de tres aneis
          concentricos com opacidade decrescente. */}
      <circle
        r={25}
        fill="none"
        stroke={COR_HUB}
        strokeWidth={0.35}
        strokeOpacity={0.18}
        style={{ animation: 'pulsar-nucleo 4.5s ease-in-out infinite' }}
      />
      <circle r={20} fill="none" stroke={COR_HUB} strokeWidth={0.45} strokeOpacity={0.3} />
      <circle r={15.5} fill="#080E1A" stroke={COR_HUB} strokeWidth={1} strokeOpacity={0.7} />
      <circle r={15.5} fill={COR_HUB} fillOpacity={0.05} stroke="none" />

      <text
        textAnchor="middle"
        y={2.6}
        fill={COR_HUB}
        fontSize={8}
        fontWeight={600}
        letterSpacing="0.1em"
      >
        HUB
      </text>
      {/* Legenda FORA dos aneis. Dentro ela encostava na borda do circulo
          de 15.5 e ficava ilegivel; embaixo ha espaco de sobra e o
          nucleo fica com o rotulo respirando. */}
      <text
        textAnchor="middle"
        y={33}
        fill="#7E8EA8"
        fontSize={3.6}
        letterSpacing="0.16em"
      >
        FONTE DE VERDADE
      </text>
    </g>
  )
}
