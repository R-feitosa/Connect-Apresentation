import { cn } from '@/lib/cn'

/** Pill pequena. Usada para papeis, entidades e nomes de tabela. */
export function Etiqueta({
  children,
  cor,
  mono = false,
  className,
}: {
  children: React.ReactNode
  /** Hex opcional: tinge borda e texto mantendo o fundo translucido. */
  cor?: string
  mono?: boolean
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md border px-2 py-1 text-xs leading-none',
        mono && 'font-mono',
        !cor && 'border-borda bg-superficie-alta/60 text-texto-suave',
        className,
      )}
      style={
        cor
          ? { borderColor: `${cor}55`, color: cor, backgroundColor: `${cor}14` }
          : undefined
      }
    >
      {children}
    </span>
  )
}
