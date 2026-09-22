'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

const TEMPO_POR_SECAO_MS = 9000
const ANCORAS = [
  '#top',
  '#ecossistema',
  '#fluxo',
  '#fonte',
  '#antes-depois',
  '#beneficios',
  '#mvps',
]

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
    indiceRef.current = (indiceRef.current + 1) % ANCORAS.length
    const alvo = document.querySelector(ANCORAS[indiceRef.current])
    alvo?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  useEffect(() => {
    if (!ativo) return
    indiceRef.current = 0
    document.querySelector('#top')?.scrollIntoView({ behavior: 'smooth' })
    timerRef.current = setInterval(avancar, TEMPO_POR_SECAO_MS)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [ativo, avancar])

  return (
    <button
      type="button"
      onClick={() => setAtivo((v) => !v)}
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full border border-borda-forte bg-fundo-alto/90 px-4 py-2.5 font-mono text-[0.7rem] uppercase tracking-[0.15em] text-texto-suave shadow-lg backdrop-blur transition-colors hover:border-hub/50 hover:text-hub"
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
