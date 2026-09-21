import { cn } from '@/lib/cn'

/** Largura util unica da pagina. Uma so, para as secoes nao "dancarem". */
export function Container({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('mx-auto w-full max-w-6xl px-5 sm:px-8', className)}>
      {children}
    </div>
  )
}
