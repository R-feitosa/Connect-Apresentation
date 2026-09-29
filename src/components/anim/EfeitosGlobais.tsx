'use client'

import { useEffect, useRef } from 'react'

/**
 * Efeitos de pagina inteira, portados do site institucional (rf-group):
 * preloader, barra de progresso de rolagem, brilho que segue o cursor,
 * botoes `.mag` atraidos pelo cursor e cartoes `.tilt` com inclinacao 3D.
 *
 * Botoes e cartoes usam delegacao de evento (um listener no documento), e
 * nao um listener por elemento: os slides do modo estande montam secoes
 * novas a qualquer momento, e elas ganham o efeito sem registrar nada.
 */
export function EfeitosGlobais() {
  const progresso = useRef<HTMLDivElement>(null)
  const brilho = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reduzir = matchMedia('(prefers-reduced-motion: reduce)').matches
    const fino = matchMedia('(pointer: fine)').matches
    const pronto = setTimeout(() => document.body.classList.add('pronto'), reduzir ? 0 : 1300)

    let agendado = false
    const aoRolar = () => {
      if (agendado) return
      agendado = true
      requestAnimationFrame(() => {
        agendado = false
        const h = document.documentElement.scrollHeight - innerHeight
        if (progresso.current) progresso.current.style.transform = `scaleX(${h > 0 ? scrollY / h : 0})`
      })
    }
    addEventListener('scroll', aoRolar, { passive: true })
    aoRolar()

    let ativo: HTMLElement | null = null
    const soltar = () => {
      if (ativo) ativo.style.transform = ''
      ativo = null
    }
    const aoMover = (e: PointerEvent) => {
      const g = brilho.current
      if (g) {
        g.style.opacity = '1'
        g.style.translate = `${e.clientX}px ${e.clientY}px`
      }
      const alvo = (e.target as Element | null)?.closest<HTMLElement>('.mag, .tilt') ?? null
      if (alvo !== ativo) soltar()
      if (!alvo) return
      ativo = alvo
      const r = alvo.getBoundingClientRect()
      if (alvo.classList.contains('mag')) {
        alvo.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.18}px, ${(e.clientY - r.top - r.height / 2) * 0.28}px)`
      } else {
        const x = (e.clientX - r.left) / r.width - 0.5
        const y = (e.clientY - r.top) / r.height - 0.5
        alvo.style.transform = `perspective(900px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg) translateY(-4px)`
      }
    }
    if (fino && !reduzir) {
      addEventListener('pointermove', aoMover, { passive: true })
      document.documentElement.addEventListener('pointerleave', soltar)
    }

    return () => {
      clearTimeout(pronto)
      removeEventListener('scroll', aoRolar)
      removeEventListener('pointermove', aoMover)
      document.documentElement.removeEventListener('pointerleave', soltar)
    }
  }, [])

  return (
    <>
      <div id="progresso" ref={progresso} aria-hidden />
      <div id="brilho" ref={brilho} aria-hidden />
      <div id="pre" aria-hidden>
        <div className="marca">
          <span>Ecossistema</span>&nbsp;<span style={{ animationDelay: '0.12s' }}>Atlas</span>
        </div>
        <div className="barra">
          <i />
        </div>
      </div>
    </>
  )
}
