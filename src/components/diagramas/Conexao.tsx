'use client'

import { caminhoParaNo, distanciaDoCentro, type Ponto } from '@/lib/geometria'
import { COR_FLUXO } from '@/lib/cores'

/**
 * Uma ligacao do nucleo ate um modulo.
 *
 * Sao DOIS tracos sobrepostos, e a duplicacao e o truque:
 *   - o trilho, fino e apagado, diz que a ligacao existe;
 *   - o pulso, curto e brilhante, corre do centro para fora e diz a
 *     DIRECAO — que e a coisa que a pagina inteira precisa afirmar.
 *
 * `pathLength={1}` normaliza o comprimento: sem isso o dash anda em
 * unidades de usuario e as conexoes curtas piscam enquanto as longas se
 * arrastam. Com ele, todas levam o mesmo tempo, e a duracao vira uma
 * escolha de ritmo em vez de acidente de geometria.
 */
export function Conexao({
  destino,
  cor,
  ativo,
  atenuado,
  indice,
}: {
  destino: Ponto
  cor: string
  ativo: boolean
  atenuado: boolean
  indice: number
}) {
  const d = caminhoParaNo(destino)
  // Conexao mais longa leva um tiquinho mais de tempo: o olho espera
  // isso, e a sincronia perfeita parece mecanica.
  const duracao = 2.4 + distanciaDoCentro(destino) / 400

  return (
    <g style={{ opacity: atenuado ? 0.18 : 1, transition: 'opacity 300ms' }}>
      <path
        d={d}
        fill="none"
        stroke={cor}
        strokeWidth={ativo ? 0.9 : 0.5}
        strokeOpacity={ativo ? 0.75 : 0.28}
        style={{ transition: 'stroke-width 300ms, stroke-opacity 300ms' }}
      />
      <path
        d={d}
        fill="none"
        pathLength={1}
        stroke={ativo ? cor : COR_FLUXO}
        strokeWidth={ativo ? 1.6 : 1.1}
        strokeLinecap="round"
        strokeDasharray="0.12 0.88"
        style={{
          animation: `correr-fluxo ${duracao}s linear infinite`,
          animationDelay: `${indice * -0.35}s`,
          filter: 'drop-shadow(0 0 2px currentColor)',
          color: ativo ? cor : COR_FLUXO,
          opacity: ativo ? 0.95 : 0.5,
          transition: 'opacity 300ms',
        }}
      />
    </g>
  )
}
