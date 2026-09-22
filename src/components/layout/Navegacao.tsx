'use client'

import { useEffect, useState } from 'react'
import { Container } from './Container'
import { cn } from '@/lib/cn'

const ANCORAS = [
  { href: '#ecossistema', rotulo: 'Atlas' },
  { href: '#fluxo', rotulo: 'Fluxo' },
  { href: '#fonte', rotulo: 'Fonte' },
  { href: '#antes-depois', rotulo: 'Problema' },
  { href: '#beneficios', rotulo: 'Benefícios' },
  { href: '#mvps', rotulo: 'Escala' },
]

/**
 * Barra fixa que so ganha fundo depois do primeiro rolar.
 *
 * Sobre o hero ela fica transparente para nao cortar o titulo; a partir
 * dali recebe fundo e borda, senao o texto das secoes passa por baixo e
 * fica ilegivel.
 */
export function Navegacao() {
  const [rolou, setRolou] = useState(false)

  useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > 24)
    aoRolar()
    window.addEventListener('scroll', aoRolar, { passive: true })
    return () => window.removeEventListener('scroll', aoRolar)
  }, [])

  return (
    <nav
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
        rolou
          ? 'border-b border-borda bg-fundo/85 backdrop-blur-md'
          : 'border-b border-transparent',
      )}
    >
      <Container className="flex h-14 items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="h-2 w-2 rounded-full bg-hub" />
          <span className="text-sm font-semibold tracking-tight text-texto">
            Ecossistema Atlas
          </span>
        </a>
        <ul className="hidden gap-7 md:flex">
          {ANCORAS.map((ancora) => (
            <li key={ancora.href}>
              <a
                href={ancora.href}
                className="text-sm text-texto-suave transition-colors hover:text-texto"
              >
                {ancora.rotulo}
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </nav>
  )
}
