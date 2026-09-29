import { cn } from '@/lib/cn'
import { Container } from './Container'

const TOM = {
  papel: 'bg-fundo text-texto',
  papel2: 'bg-fundo-alto text-texto',
  escuro: 'escuro bg-navy-fundo text-white',
} as const

/**
 * Bloco de secao. As secoes alternam entre os dois papeis e o navy, como
 * no site institucional — a troca de fundo marca o capitulo, sem precisar
 * de linhas divisorias.
 */
export function Secao({
  id,
  children,
  className,
  tom = 'papel',
}: {
  id?: string
  children: React.ReactNode
  className?: string
  tom?: keyof typeof TOM
}) {
  return (
    <section id={id} className={cn('relative scroll-mt-16 overflow-hidden py-20 sm:py-28', TOM[tom], className)}>
      <Container className="relative">{children}</Container>
    </section>
  )
}
