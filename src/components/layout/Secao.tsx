import { cn } from '@/lib/cn'
import { Container } from './Container'

/**
 * Bloco de secao com respiro vertical padronizado.
 *
 * O `id` alimenta a navegacao por ancora; o espacamento e o mesmo em
 * todas para a pagina ter cadencia de apresentacao, nao de dashboard.
 */
export function Secao({
  id,
  children,
  className,
  comLinhaSuperior = true,
}: {
  id?: string
  children: React.ReactNode
  className?: string
  comLinhaSuperior?: boolean
}) {
  return (
    <section
      id={id}
      className={cn(
        'scroll-mt-20 py-14 sm:py-20',
        comLinhaSuperior && 'border-t border-borda/60',
        className,
      )}
    >
      <Container>{children}</Container>
    </section>
  )
}
