'use client'

import { useEffect, useState } from 'react'
import { Container } from './Container'
import { LogoGrupo } from '@/components/ui/LogoGrupo'
import { cn } from '@/lib/cn'

const ANCORAS = [
  { href: '#problema', rotulo: 'Antes' },
  { href: '#ecossistema', rotulo: 'Atlas' },
  { href: '#sistemas', rotulo: 'Sistemas' },
  { href: '#fluxo', rotulo: 'Fluxo' },
  { href: '#numeros', rotulo: 'Números' },
  { href: '#escala', rotulo: 'Escala' },
]

/**
 * Cabecalho claro e solido, como no site institucional: a logo oficial
 * (navy e bordo) precisa de fundo claro, mesmo por cima do Hero escuro.
 * Encolhe um pouco depois do primeiro rolar. Fundo opaco, sem
 * `backdrop-blur` — o blur reamostra a pagina a cada quadro de rolagem.
 */
export function Navegacao() {
  const [rolou, setRolou] = useState(false)

  useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > 60)
    aoRolar()
    window.addEventListener('scroll', aoRolar, { passive: true })
    return () => window.removeEventListener('scroll', aoRolar)
  }, [])

  return (
    <nav
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b border-borda bg-[#f7f6f4] transition-[padding,box-shadow] duration-500',
        rolou ? 'py-2 shadow-[0_10px_30px_-18px_rgba(10,14,43,0.35)]' : 'py-3.5',
      )}
    >
      <Container className="flex items-center justify-between">
        <a href="#top" aria-label="RFEITOSA Group — início" className="block">
          <LogoGrupo className={cn('w-auto transition-[height] duration-500', rolou ? 'h-9' : 'h-11')} />
        </a>
        <ul className="hidden gap-8 md:flex">
          {ANCORAS.map((a) => (
            <li key={a.href}>
              <a
                href={a.href}
                className="relative py-1 text-[0.78rem] font-medium uppercase tracking-[0.14em] text-texto after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-fluxo after:transition-transform after:duration-500 hover:after:origin-left hover:after:scale-x-100"
              >
                {a.rotulo}
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </nav>
  )
}
