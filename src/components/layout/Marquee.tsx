import { cn } from '@/lib/cn'

/**
 * Quantas vezes a lista de frases se repete dentro da faixa que se
 * move. Tem que ser PAR: a animacao anda exatamente metade do
 * comprimento da faixa, entao a segunda metade precisa ser identica
 * a primeira para o corte de -50% de volta a 0% ficar invisivel —
 * qualquer numero par de copias identicas satisfaz isso.
 *
 * O motivo de ser mais que 2: numa TV larga, duas copias de frases
 * curtas nao enchem nem metade da tela — sobra um vao vazio antes do
 * loop reiniciar (a faixa literalmente acaba antes da borda direita).
 * Repetir mais vezes garante fluxo continuo em qualquer largura de
 * tela, do notebook a uma TV de estande em 4K.
 */
const COPIAS_NA_FAIXA = 8

/** Segundos para a faixa andar o equivalente a UMA passada da lista de
 * frases. A duracao total escala com `COPIAS_NA_FAIXA` para a
 * velocidade aparente ficar igual nao importa quantas copias existam. */
const SEGUNDOS_POR_PASSADA = 16

/**
 * Faixa de texto corrida, na diagonal do site inteiro.
 *
 * E o elemento que faz a pagina parecer viva mesmo parada num loop de
 * TV: ninguem precisa rolar para perceber movimento.
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
  const duracaoSegundos = (COPIAS_NA_FAIXA / 2) * SEGUNDOS_POR_PASSADA

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
      <div
        className="marquee-trilho flex shrink-0 items-center gap-10 whitespace-nowrap pr-10"
        style={{ animationDuration: `${duracaoSegundos}s` }}
      >
        {Array.from({ length: COPIAS_NA_FAIXA }, (_, i) => (
          <Trilho key={i} itens={itens} />
        ))}
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
