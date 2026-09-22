import { cn } from '@/lib/cn'

/**
 * Faixa de texto corrida, na diagonal do site inteiro.
 *
 * E o elemento que faz a pagina parecer viva mesmo parada num loop de
 * TV: ninguem precisa rolar para perceber movimento. O conteudo aparece
 * duas vezes no DOM — e a tecnica padrao de marquee em CSS puro, sem
 * JS medindo largura, e a animacao em `globals.css` desloca exatamente
 * metade da faixa.
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
  return (
    <div
      aria-hidden
      className={cn(
        'group relative -mx-[6%] flex w-[112%] overflow-hidden border-y border-borda/70 bg-superficie/40 py-4',
        invertido && '-rotate-1',
        !invertido && 'rotate-1',
        className,
      )}
    >
      <div className="marquee-trilho flex shrink-0 items-center gap-10 whitespace-nowrap pr-10">
        <Trilho itens={itens} />
      </div>
      <div className="marquee-trilho flex shrink-0 items-center gap-10 whitespace-nowrap pr-10" aria-hidden>
        <Trilho itens={itens} />
      </div>
    </div>
  )
}

function Trilho({ itens }: { itens: readonly string[] }) {
  return (
    <>
      {itens.map((item, i) => (
        <span key={i} className="flex items-center gap-10">
          <span className="font-display text-lg uppercase tracking-tight text-texto-suave sm:text-xl">
            {item}
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-hub" />
        </span>
      ))}
    </>
  )
}
