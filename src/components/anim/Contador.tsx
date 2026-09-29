'use client'

import { useEffect, useRef, useState } from 'react'

const formatar = (v: number) => Math.round(v).toLocaleString('pt-BR')

/** Numero que conta de 0 ate o valor final quando entra na tela. */
export function Contador({
  valor,
  prefixo = '',
  sufixo = '',
  className,
}: {
  valor: number
  prefixo?: string
  sufixo?: string
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const [v, setV] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf = 0
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        io.disconnect()
        if (matchMedia('(prefers-reduced-motion: reduce)').matches) return setV(valor)
        const t0 = performance.now()
        const passo = (t: number) => {
          const p = Math.min((t - t0) / 1900, 1)
          setV(valor * (1 - Math.pow(1 - p, 4)))
          if (p < 1) raf = requestAnimationFrame(passo)
        }
        raf = requestAnimationFrame(passo)
      },
      { threshold: 0.3 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [valor])
  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: 'tabular-nums' }}>
      {prefixo + formatar(v) + sufixo}
    </span>
  )
}
