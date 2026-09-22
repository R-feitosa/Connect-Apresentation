'use client'

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Hero } from '@/components/secoes/Hero'
import { VisaoGeral } from '@/components/secoes/VisaoGeral'
import { FluxoDeCadastro } from '@/components/secoes/FluxoDeCadastro'
import { FonteCentral } from '@/components/secoes/FonteCentral'
import { AntesDepois } from '@/components/secoes/AntesDepois'
import { Beneficios } from '@/components/secoes/Beneficios'
import { NovosMvps } from '@/components/secoes/NovosMvps'

const SLIDES = [
  Hero,
  VisaoGeral,
  FluxoDeCadastro,
  FonteCentral,
  AntesDepois,
  Beneficios,
  NovosMvps,
]

const TEMPO_POR_SLIDE_MS = 9000

/**
 * Piloto automatico para rodar a pagina numa TV de estande.
 *
 * Antes disto, o modo estande rolava a pagina normal por ancora — mas
 * uma pagina de rolar nao tem tamanho de tela padronizado: cada secao
 * tem a altura que o conteudo dela pede, entao numa janela real (menor
 * que a tela cheia usada pra desenhar o site) sobrava conteudo cortado
 * ou vazando pra proxima secao.
 *
 * Agora e um slide-show de verdade: cada secao vira UM slide, do
 * tamanho exato da tela, com o conteudo encolhido (nunca esticado) o
 * suficiente pra caber inteiro — nunca cortado. So o slide atual fica
 * montado, entao nada do proximo aparece por engano. `ArrowRight` /
 * `ArrowLeft` navegam manualmente e reiniciam o tempo de permanencia.
 */
export function ModoEstande() {
  const [ativo, setAtivo] = useState(false)
  const [indice, setIndice] = useState(0)
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

  const reiniciarTemporizador = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setIndice((i) => (i + 1) % SLIDES.length)
    }, TEMPO_POR_SLIDE_MS)
  }, [])

  useEffect(() => {
    if (!ativo) return
    // Adiado num rAF (nao chamado direto no corpo do efeito) pelo
    // mesmo motivo do efeito de ativacao acima: e a forma segura de
    // reagir a uma mudanca externa sem disparar um set-state sincrono
    // dentro do proprio efeito.
    const id = requestAnimationFrame(() => setIndice(0))
    reiniciarTemporizador()
    return () => {
      cancelAnimationFrame(id)
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [ativo, reiniciarTemporizador])

  useEffect(() => {
    // O overlay do slide-show cobre a pagina visualmente, mas a pagina
    // real continua montada por tras dela (e cada secao vira de novo
    // um slide, com o MESMO id de ancora) — sem isto, um leitor de tela
    // ou o Tab do teclado ainda alcancaria esse conteudo duplicado e
    // escondido. `inert` tira tudo isso da arvore de acessibilidade e
    // do foco enquanto o modo estande estiver ativo.
    const main = document.getElementById('top')
    const rodape = document.querySelector('footer')
    for (const el of [main, rodape]) {
      if (!el) continue
      if (ativo) el.setAttribute('inert', '')
      else el.removeAttribute('inert')
    }
  }, [ativo])

  useEffect(() => {
    if (!ativo) return
    function aoTeclar(evento: KeyboardEvent) {
      if (evento.key === 'ArrowRight') {
        setIndice((i) => (i + 1) % SLIDES.length)
        reiniciarTemporizador()
      } else if (evento.key === 'ArrowLeft') {
        setIndice((i) => (i - 1 + SLIDES.length) % SLIDES.length)
        reiniciarTemporizador()
      }
    }
    window.addEventListener('keydown', aoTeclar)
    return () => window.removeEventListener('keydown', aoTeclar)
  }, [ativo, reiniciarTemporizador])

  const SlideComponente = SLIDES[indice]

  return (
    <>
      {ativo && (
        <div className="fundo-atlas fixed inset-0 z-40" aria-live="polite">
          <Slide key={indice}>
            <SlideComponente />
          </Slide>
        </div>
      )}
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
    </>
  )
}

/**
 * Um slide = uma secao, do tamanho exato da tela, com o conteudo
 * medido na altura natural e encolhido (`scale`, nunca ampliado) o
 * suficiente pra caber sem cortar.
 *
 * Centralizado, nao ancorado no topo: com `align-items: center` no
 * container e `transform-origin: center`, o navegador primeiro
 * centraliza a caixa (do tamanho natural, que pode ultrapassar a
 * tela) e so depois encolhe em torno desse centro — o resultado e a
 * caixa menor cair certinha no meio da tela. Ancorar no topo deixava
 * um vao vazio embaixo em secoes mais curtas que a tela, em vez de
 * parecer um slide equilibrado.
 */
function Slide({ children }: { children: React.ReactNode }) {
  const externoRef = useRef<HTMLDivElement>(null)
  const internoRef = useRef<HTMLDivElement>(null)
  const [escala, setEscala] = useState(1)

  useLayoutEffect(() => {
    const externo = externoRef.current
    const interno = internoRef.current
    if (!externo || !interno) return

    const recalcular = () => {
      const alturaConteudo = interno.scrollHeight
      const alturaDisponivel = externo.clientHeight
      setEscala(alturaConteudo > 0 ? Math.min(1, alturaDisponivel / alturaConteudo) : 1)
    }

    recalcular()
    const observador = new ResizeObserver(recalcular)
    observador.observe(interno)
    window.addEventListener('resize', recalcular)
    return () => {
      observador.disconnect()
      window.removeEventListener('resize', recalcular)
    }
  }, [])

  return (
    <div
      ref={externoRef}
      className="flex h-full w-full items-center justify-center overflow-hidden"
    >
      <div
        ref={internoRef}
        className="w-full shrink-0"
        style={{ transform: `scale(${escala})`, transformOrigin: 'center' }}
      >
        {children}
      </div>
    </div>
  )
}
