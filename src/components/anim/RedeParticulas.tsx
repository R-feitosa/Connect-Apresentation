'use client'

import { useEffect, useRef } from 'react'

/**
 * Rede de particulas conectadas no fundo do Hero, que foge do cursor —
 * a mesma do site institucional (rf-group), em canvas 2D.
 *
 * Custo controlado para a TV de estande: no maximo 70 pontos, pausa
 * quando sai da tela, e nao desenha a copia da pagina que fica por tras
 * do modo estande (so a do slide).
 */
export function RedeParticulas() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const cv = ref.current
    const cx = cv?.getContext('2d')
    if (!cv || !cx) return
    const reduzir = matchMedia('(prefers-reduced-motion: reduce)').matches
    const noSlide = cv.closest('[data-estande]') !== null
    let W = 0
    let H = 0
    let raf = 0
    let visivel = true
    let pts: { x: number; y: number; vx: number; vy: number }[] = []
    const mouse = { x: -999, y: -999 }

    const medir = () => {
      const r = cv.getBoundingClientRect()
      const dpr = Math.min(devicePixelRatio, 2)
      W = r.width
      H = r.height
      cv.width = W * dpr
      cv.height = H * dpr
      cx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const n = Math.round(Math.min(70, (W * H) / 18000))
      pts = Array.from({ length: n }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
      }))
    }

    const desenhar = () => {
      if (!visivel) return
      // Com o modo estande ligado, a pagina de verdade fica coberta: so o
      // canvas de dentro do slide gasta quadro.
      if (!noSlide && document.body.classList.contains('estande')) {
        raf = requestAnimationFrame(desenhar)
        return
      }
      cx.clearRect(0, 0, W, H)
      cx.fillStyle = 'rgba(201,205,240,.65)'
      for (const p of pts) {
        if (!reduzir) {
          p.x += p.vx
          p.y += p.vy
          if (p.x < 0 || p.x > W) p.vx *= -1
          if (p.y < 0 || p.y > H) p.vy *= -1
          const dx = p.x - mouse.x
          const dy = p.y - mouse.y
          const d = Math.hypot(dx, dy)
          if (d < 140 && d > 0) {
            p.x += (dx / d) * 0.6
            p.y += (dy / d) * 0.6
          }
        }
        cx.beginPath()
        cx.arc(p.x, p.y, 1.5, 0, 7)
        cx.fill()
      }
      cx.lineWidth = 1
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i]
          const b = pts[j]
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < 130) {
            cx.strokeStyle = `rgba(201,205,240,${0.22 * (1 - d / 130)})`
            cx.beginPath()
            cx.moveTo(a.x, a.y)
            cx.lineTo(b.x, b.y)
            cx.stroke()
          }
        }
      }
      if (!reduzir) raf = requestAnimationFrame(desenhar)
    }

    const aoMover = (e: PointerEvent) => {
      const r = cv.getBoundingClientRect()
      mouse.x = e.clientX - r.left
      mouse.y = e.clientY - r.top
    }

    medir()
    addEventListener('resize', medir)
    const pai = cv.parentElement
    pai?.addEventListener('pointermove', aoMover)
    const io = new IntersectionObserver(([e]) => {
      visivel = e.isIntersecting
      cancelAnimationFrame(raf)
      if (visivel) desenhar()
    })
    io.observe(cv)
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      removeEventListener('resize', medir)
      pai?.removeEventListener('pointermove', aoMover)
    }
  }, [])

  return <canvas ref={ref} aria-hidden className="absolute inset-0 -z-10 h-full w-full" />
}
