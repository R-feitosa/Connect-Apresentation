import { cn } from '@/lib/cn'

/**
 * Quantos itens uma metade da faixa precisa ter, no minimo, para
 * cobrir uma tela bem larga (a TV do estande) sem deixar vao.
 *
 * Uma tentativa anterior forcava `min-width: 100vw` na metade — a
 * largura ficava certa, mas o conteudo (poucas repeticoes) so
 * preenchia o comeco da caixa e sobrava um vao em branco DENTRO dela.
 * Uma tentativa anterior a essa repetia a lista um numero fixo de
 * vezes — funcionava para uma lista de 4 frases, mas uma lista mais
 * curta (3 frases) rendia menos largura com a mesma contagem e voltou
 * a faltar. A correcao e calcular as repeticoes A PARTIR do tamanho
 * de CADA lista: uma lista curta repete mais vezes que uma longa, ate
 * as duas renderem aproximadamente a mesma largura total.
 */
const MINIMO_ITENS_POR_METADE = 16

/** Segundos de exibicao por item de faixa. Como a duracao escala com
 * o numero de itens (que por sua vez acompanha a largura real do
 * conteudo), a velocidade aparente fica parecida entre uma lista
 * curta e uma longa. */
const SEGUNDOS_POR_ITEM = 4

/**
 * Faixa de texto corrida na horizontal.
 *
 * E o elemento que faz a pagina parecer viva mesmo parada num loop de
 * TV: ninguem precisa rolar para perceber movimento.
 *
 * A duplicacao (as duas `Metade`) tem que estar DENTRO da faixa que
 * se move, nao em duas faixas irmas cada uma com sua propria copia:
 * so assim "andar exatamente a largura de uma metade" (a animacao em
 * `globals.css`) termina em cima de uma copia identica, e o corte de
 * volta ao inicio fica invisivel.
 */
export function Marquee({
  itens,
  invertido = false,
  className,
}: {
  itens: readonly string[]
  /** Roda a faixa no sentido contrario, para diferenciar duas faixas
   * na mesma pagina sem depender de inclinacao. */
  invertido?: boolean
  className?: string
}) {
  const passadas = Math.max(1, Math.ceil(MINIMO_ITENS_POR_METADE / itens.length))
  const duracaoSegundos = passadas * itens.length * SEGUNDOS_POR_ITEM

  return (
    <div
      aria-hidden
      className={cn(
        'relative flex w-full overflow-hidden border-y-2 border-hub bg-hub py-4',
        className,
      )}
    >
      <div
        className="marquee-trilho flex shrink-0 items-center whitespace-nowrap"
        style={{
          animationDuration: `${duracaoSegundos}s`,
          animationDirection: invertido ? 'reverse' : 'normal',
        }}
      >
        <Metade itens={itens} passadas={passadas} />
        <Metade itens={itens} passadas={passadas} />
      </div>
    </div>
  )
}

function Metade({
  itens,
  passadas,
}: {
  itens: readonly string[]
  passadas: number
}) {
  return (
    <div className="flex shrink-0 items-center gap-10 pr-10">
      {Array.from({ length: passadas }, (_, i) => (
        <Trilho key={i} itens={itens} />
      ))}
    </div>
  )
}

function Trilho({ itens }: { itens: readonly string[] }) {
  return (
    <>
      {itens.map((item, i) => (
        <span key={i} className="flex items-center gap-10">
          <span
            className={cn(
              'font-display text-lg font-bold uppercase tracking-tight sm:text-xl',
              i % 2 === 0 ? 'text-acento' : 'text-superficie',
            )}
          >
            {item}
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-acento" />
        </span>
      ))}
    </>
  )
}
