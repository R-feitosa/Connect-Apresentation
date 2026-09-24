'use client'

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { cn } from '@/lib/cn'
import { Hero } from '@/components/secoes/Hero'
import { VisaoGeral } from '@/components/secoes/VisaoGeral'
import { FluxoDeCadastro } from '@/components/secoes/FluxoDeCadastro'
import { FonteCentral } from '@/components/secoes/FonteCentral'
import { AntesDepois } from '@/components/secoes/AntesDepois'
import { Beneficios } from '@/components/secoes/Beneficios'
import { NovosMvps } from '@/components/secoes/NovosMvps'
import { Marquee } from '@/components/layout/Marquee'
import { FRASES_MARQUEE_ENCERRAMENTO } from '@/content/marquee'

/**
 * Ultimo slide: a secao de escalabilidade MAIS a faixa de
 * encerramento que, na pagina normal, fecha o scroll antes do
 * rodape. Sem isto ela nao teria slide nenhum no loop — a lista de
 * slides mapeia 1:1 com secoes, e a faixa nao e uma secao.
 */
function SlideFinal() {
  return (
    <>
      <NovosMvps />
      <Marquee itens={FRASES_MARQUEE_ENCERRAMENTO} invertido className="my-4" />
    </>
  )
}

const SLIDES = [
  Hero,
  VisaoGeral,
  FluxoDeCadastro,
  FonteCentral,
  AntesDepois,
  Beneficios,
  SlideFinal,
]

const TEMPO_POR_SLIDE_MS = 9000

/** Duracao da animacao de deslizar entre slides. O timeout que tira o
 * slide de saida do ar (mais abaixo) usa um numero levemente maior,
 * pra nao cortar a animacao no ultimo frame. Tem que bater com a
 * duracao das classes `.animar-slide-*` em `globals.css`. */
const DURACAO_TRANSICAO_MS = 550

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
  const [estado, setEstado] = useState<{ indice: number; sentido: 1 | -1 }>({
    indice: 0,
    sentido: 1,
  })
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const mudarSlide = useCallback((delta: 1 | -1) => {
    setEstado((atual) => ({
      indice: (atual.indice + delta + SLIDES.length) % SLIDES.length,
      sentido: delta,
    }))
  }, [])

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
    timerRef.current = setInterval(() => mudarSlide(1), TEMPO_POR_SLIDE_MS)
  }, [mudarSlide])

  useEffect(() => {
    if (!ativo) return
    // Adiado num rAF (nao chamado direto no corpo do efeito) pelo
    // mesmo motivo do efeito de ativacao acima: e a forma segura de
    // reagir a uma mudanca externa sem disparar um set-state sincrono
    // dentro do proprio efeito.
    const id = requestAnimationFrame(() => setEstado({ indice: 0, sentido: 1 }))
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
        mudarSlide(1)
        reiniciarTemporizador()
      } else if (evento.key === 'ArrowLeft') {
        mudarSlide(-1)
        reiniciarTemporizador()
      }
    }
    window.addEventListener('keydown', aoTeclar)
    return () => window.removeEventListener('keydown', aoTeclar)
  }, [ativo, mudarSlide, reiniciarTemporizador])

  // Guarda o slide anterior so pelo tempo da transicao, pra ele poder
  // "sair" enquanto o novo "entra" — o efeito de deslizar de verdade
  // precisa dos dois montados ao mesmo tempo por um instante. Comparado
  // durante a propria renderizacao (dois `useState`, nunca um ref): e o
  // jeito que o React recomenda pra "lembrar" um valor do render
  // anterior sem depender de efeito nenhum.
  const [indiceAnterior, setIndiceAnterior] = useState(estado.indice)
  const [saindo, setSaindo] = useState<{ indice: number; sentido: 1 | -1 } | null>(null)
  if (indiceAnterior !== estado.indice) {
    setSaindo({ indice: indiceAnterior, sentido: estado.sentido })
    setIndiceAnterior(estado.indice)
  }

  useEffect(() => {
    if (!saindo) return
    const id = setTimeout(() => setSaindo(null), DURACAO_TRANSICAO_MS)
    return () => clearTimeout(id)
  }, [saindo])

  const SlideAtual = SLIDES[estado.indice]

  return (
    <>
      {ativo && (
        <div
          className="fundo-atlas fixed inset-0 z-40 overflow-hidden"
          aria-live="polite"
        >
          {saindo &&
            (() => {
              const SlideQueSai = SLIDES[saindo.indice]
              return (
                <div
                  key={`sai-${saindo.indice}`}
                  className={cn(
                    'absolute inset-0',
                    saindo.sentido === 1
                      ? 'animar-slide-sai-cima'
                      : 'animar-slide-sai-baixo',
                  )}
                >
                  <Slide>
                    <SlideQueSai />
                  </Slide>
                </div>
              )
            })()}
          <div
            key={`entra-${estado.indice}`}
            className={cn(
              'absolute inset-0',
              estado.sentido === 1 ? 'animar-slide-entra-baixo' : 'animar-slide-entra-cima',
            )}
          >
            <Slide>
              <SlideAtual />
            </Slide>
          </div>
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
