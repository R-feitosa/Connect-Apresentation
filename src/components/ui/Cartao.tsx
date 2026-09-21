import { cn } from '@/lib/cn'

/**
 * Superficie base de toda a pagina.
 *
 * Borda de 1px e fundo levemente acima do fundo da pagina, sem sombra:
 * sombra em fundo escuro nao aparece e so adiciona peso. A separacao vem
 * da borda e do degrade sutil.
 */
export function Cartao({
  children,
  className,
  comBrilho = false,
}: {
  children: React.ReactNode
  className?: string
  comBrilho?: boolean
}) {
  return (
    <div
      className={cn(
        'relative rounded-xl border border-borda bg-superficie/70 p-6',
        'bg-gradient-to-b from-superficie-alta/60 to-superficie/40',
        comBrilho && 'transition-colors duration-300 hover:border-borda-forte',
        className,
      )}
    >
      {children}
    </div>
  )
}
