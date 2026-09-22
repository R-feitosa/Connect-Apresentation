import { cn } from '@/lib/cn'

/**
 * Faixa de texto corrida, na diagonal do site inteiro.
 *
 * E o elemento que faz a pagina parecer viva mesmo parada num loop de
 * TV: ninguem precisa rolar para perceber movimento.
 *
 * A duplicacao do conteudo tem que estar DENTRO da faixa que se move,
 * nao em duas faixas irmas cada uma com sua propria copia. So assim
 * "andar metade do proprio comprimento" (a animacao em `globals.css`)
 * termina exatamente em cima da segunda copia — identica a primeira —
 * e o corte de -50% de volta a 0% fica invisivel. Com a duplicacao do
 * lado de fora, cada faixa so tinha meio conteudo: o loop saltava no
 * meio do texto em vez de emendar.
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
