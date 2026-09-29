'use client'

import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react'
import { cn } from '@/lib/cn'

const CLASSE = { cima: 'rv', esquerda: 'rv-l', direita: 'rv-r', escala: 'rv-s' } as const

/** Poe a classe `in` no elemento quando ele entra na tela (uma vez so). */
export function useRevelar<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        el.classList.add('in')
        io.disconnect()
      },
      { threshold: 0.15, rootMargin: '0px 0px -6% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return ref
}

type Tag = 'div' | 'section' | 'article' | 'header' | 'h2' | 'p' | 'li' | 'ul' | 'ol' | 'span'

export function Revelar({
  as: Elemento = 'div',
  de = 'cima',
  atraso = 0,
  className,
  style,
  children,
  id,
}: {
  as?: Tag
  de?: keyof typeof CLASSE
  /** Segundos de atraso, para escalonar itens de uma grade. */
  atraso?: number
  className?: string
  style?: CSSProperties
  children?: ReactNode
  id?: string
}) {
  const ref = useRevelar<HTMLElement>()
  return (
    <Elemento
      // O `ref` e generico (HTMLElement) e serve a qualquer uma das tags aceitas.
      ref={ref as never}
      id={id}
      className={cn(CLASSE[de], className)}
      style={atraso ? ({ ...style, '--d': `${atraso}s` } as CSSProperties) : style}
    >
      {children}
    </Elemento>
  )
}

/** Sobretitulo com o traco que se desenha quando aparece. */
export function Sobretitulo({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRevelar<HTMLParagraphElement>()
  return (
    <p ref={ref} className={cn('sobretitulo', className)}>
      {children}
    </p>
  )
}
