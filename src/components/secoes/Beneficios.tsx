import { Secao } from '@/components/layout/Secao'
import { TituloSecao } from '@/components/layout/TituloSecao'
import { Cartao } from '@/components/ui/Cartao'
import { IconeBeneficio } from '@/components/ui/IconeBeneficio'
import { BENEFICIOS } from '@/content/beneficios'

/** Alterna a cor do icone por posicao — o mesmo tom em todo cartao
 * deixava a grade monotona; revezando entre as 3 cores da marca cada
 * cartao ganha identidade propria sem inventar uma cor nova. */
const CORES_ICONE = [
  'border-hub/30 bg-hub/[0.08] text-hub',
  'border-fluxo/30 bg-fluxo/[0.08] text-fluxo',
  'border-comercial/30 bg-comercial/[0.08] text-comercial',
] as const

export function Beneficios() {
  return (
    <Secao id="beneficios">
      <TituloSecao
        indice="05"
        etiqueta="Benefícios"
        titulo="O que a arquitetura integrada entrega"
        descricao="Não são promessas de projeto: são consequências diretas de haver um único lugar onde o dado mestre nasce."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {BENEFICIOS.map((beneficio, i) => (
          <Cartao key={beneficio.titulo} comBrilho>
            <span
              className={`mb-5 inline-flex h-10 w-10 items-center justify-center rounded-lg border ${CORES_ICONE[i % CORES_ICONE.length]}`}
            >
              <IconeBeneficio nome={beneficio.icone} />
            </span>
            <h3 className="mb-2 text-base font-bold text-texto">
              {beneficio.titulo}
            </h3>
            <p className="text-sm leading-relaxed text-texto-suave">
              {beneficio.descricao}
            </p>
          </Cartao>
        ))}
      </div>
    </Secao>
  )
}
