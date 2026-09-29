import { cn } from '@/lib/cn'

/** Minimo de itens por metade da faixa, para cobrir uma TV larga sem vao.
 * As repeticoes saem do tamanho de CADA lista: lista curta repete mais. */
const MINIMO_ITENS_POR_METADE = 16

/** Segundos por item: a velocidade aparente fica igual em listas curtas e longas. */
const SEGUNDOS_POR_ITEM = 3.2

/**
 * Faixa corrida em bordo solido, como no site institucional. As duas
 * metades identicas ficam DENTRO do trilho que se move: andar exatamente
 * 50% termina em cima da copia, e o recomeco fica invisivel.
 */
export function Marquee({
  itens,
  invertido = false,
  className,
}: {
  itens: readonly string[]
  invertido?: boolean
  className?: string
}) {
  const passadas = Math.max(1, Math.ceil(MINIMO_ITENS_POR_METADE / itens.length))
  const duracao = passadas * itens.length * SEGUNDOS_POR_ITEM

  return (
    <div aria-hidden className={cn('relative flex w-full overflow-hidden border-y border-white/10 bg-fluxo py-5 text-white', className)}>
      <div
        className="marquee-trilho flex shrink-0 items-center whitespace-nowrap"
        style={{ animationDuration: `${duracao}s`, animationDirection: invertido ? 'reverse' : 'normal' }}
      >
        <Metade itens={itens} passadas={passadas} />
        <Metade itens={itens} passadas={passadas} />
      </div>
    </div>
  )
}

function Metade({ itens, passadas }: { itens: readonly string[]; passadas: number }) {
  return (
    <div className="flex shrink-0 items-center">
      {Array.from({ length: passadas }, (_, i) =>
        itens.map((item, j) => (
          <span key={`${i}-${j}`} className="flex items-center gap-16 px-8 font-display text-2xl font-light tracking-tight">
            {item}
            <span className="text-[0.55rem] opacity-60">◆</span>
          </span>
        )),
      )}
    </div>
  )
}
