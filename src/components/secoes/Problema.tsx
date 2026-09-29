import { Secao } from '@/components/layout/Secao'
import { Revelar, Sobretitulo } from '@/components/anim/Revelar'
import { COMPARATIVO } from '@/content/comparativo'

/**
 * O ponto de partida, em quatro dores. Cada pilar mostra o problema e,
 * ao passar o mouse, vira navy e mostra a resposta do Atlas — o mesmo
 * gesto dos pilares do site institucional.
 */
export function Problema() {
  return (
    <Secao id="problema">
      <div className="grid items-start gap-14 lg:grid-cols-2 lg:gap-20">
        <Revelar de="esquerda">
          <Sobretitulo>Antes do Atlas</Sobretitulo>
          <h2 className="titulo-marca mt-5">
            Cada sistema com a sua <strong>própria verdade.</strong>
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-texto-suave">
            Cadastros repetidos, números que não batiam e retrabalho em toda área. Esse era o ponto de partida.
          </p>
        </Revelar>

        <Revelar de="direita" className="grid gap-px border border-borda bg-borda sm:grid-cols-2">
          {COMPARATIVO.map((par, i) => (
            <div
              key={par.titulo}
              className="group relative bg-fundo p-8 transition-[background-color,color,transform] duration-500 hover:z-10 hover:-translate-y-1 hover:bg-hub hover:text-white"
            >
              <span className="mb-6 block text-xs font-semibold tracking-[0.2em] text-vinho-claro transition-colors duration-500 group-hover:text-lavanda">
                {String(i + 1).padStart(2, '0')}
              </span>
              <b className="mb-2 block font-display text-2xl font-bold tracking-tight">{par.titulo}</b>
              <span className="block text-sm leading-relaxed text-texto-suave group-hover:hidden">{par.antes}</span>
              <span className="hidden text-sm leading-relaxed text-lavanda group-hover:block">
                <strong className="font-semibold text-white">Com o Atlas:</strong> {par.depois}
              </span>
            </div>
          ))}
        </Revelar>
      </div>
    </Secao>
  )
}
