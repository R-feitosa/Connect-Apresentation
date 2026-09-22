'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

const TEMPO_POR_PARADA_MS = 8000
const ANCORAS = [
  '#top',
  '#ecossistema',
  '#fluxo',
  '#fonte',
  '#antes-depois',
  '#beneficios',
  '#mvps',
]

/** So conta como "nao cabe na tela" acima desta folga — sem isso,
 * secoes que sobram uns poucos pixels (arredondamento de grade, etc.)
 * ganhariam uma segunda parada so pra mostrar quase a mesma coisa de
 * novo. */
const FOLGA_TOLERAVEL_PX = 24

/**
 * Piloto automatico para rodar a pagina numa TV de estande.
 *
 * Sem interacao nenhuma, a landing e uma pagina de rolar. Numa TV
 * ninguem rola — entao isto avanca sozinho por ancora, secao a secao, e
 * volta ao topo ao terminar, criando o loop que o estande precisa. Ativa
 * sozinho com `?tv=1` na URL (o link que vai na TV) ou pelo botao, que
 * fica discreto no canto para quem for operar a tela manualmente.
 */
export function ModoEstande() {
  const [ativo, setAtivo] = useState(false)
  const indiceRef = useRef(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  /** Se a parada atual ja mostrou o restante de uma secao alta demais
   * para a tela (ver `avancar`). */
  const mostrouRestante = useRef(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('tv') !== '1') return
    // Ativa so apos montar: no servidor nao ha `window.location.search`,
    // entao o estado inicial precisa ser `false` para bater com o HTML
    // hidratado — o efeito e a unica forma segura de ler a URL aqui.
    const id = requestAnimationFrame(() => setAtivo(true))
    return () => cancelAnimationFrame(id)
  }, [])

  const avancar = useCallback(() => {
    // "#top" e o <main> inteiro, nao uma secao — nunca tenta medir ou
    // completar a rolagem dele, so usa como ponto de partida do loop.
    const indiceAtual = indiceRef.current
    const eTopo = indiceAtual === 0
    const atual = eTopo ? null : document.querySelector(ANCORAS[indiceAtual])
    const sobraDaSecao = atual
      ? atual.getBoundingClientRect().height - window.innerHeight
      : 0

    if (!mostrouRestante.current && sobraDaSecao > FOLGA_TOLERAVEL_PX) {
      // A secao e mais alta que a tela: sem isto, o modo estande alinha
      // so o topo e pula pra proxima antes de alguem ver o fim dela
      // (o card final, uma fileira extra) — mostra o restante primeiro.
      mostrouRestante.current = true
      atual?.scrollIntoView({ behavior: 'smooth', block: 'end' })
      return
    }

    mostrouRestante.current = false
    indiceRef.current = (indiceAtual + 1) % ANCORAS.length
    const alvo = document.querySelector(ANCORAS[indiceRef.current])
    alvo?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  useEffect(() => {
    if (!ativo) return
    indiceRef.current = 0
    mostrouRestante.current = false
    document.querySelector('#top')?.scrollIntoView({ behavior: 'smooth' })
    timerRef.current = setInterval(avancar, TEMPO_POR_PARADA_MS)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [ativo, avancar])

  return (
    <button
      type="button"
      onClick={() => setAtivo((v) => !v)}
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full border border-borda-forte bg-fundo-alto px-4 py-2.5 font-mono text-[0.7rem] uppercase tracking-[0.15em] text-texto-suave shadow-lg transition-colors hover:border-hub/50 hover:text-hub"
      aria-pressed={ativo}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          ativo ? 'animate-pulse bg-hub' : 'bg-texto-fraco'
        }`}
        aria-hidden
      />
      {ativo ? 'Loop TV ligado' : 'Modo estande'}
    </button>
  )
}
