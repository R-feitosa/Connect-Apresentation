import { Secao } from '@/components/layout/Secao'
import { TituloSecao } from '@/components/layout/TituloSecao'
import { Cartao } from '@/components/ui/Cartao'
import { IconeBeneficio } from '@/components/ui/IconeBeneficio'
import { BENEFICIOS } from '@/content/beneficios'

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
        {BENEFICIOS.map((beneficio) => (
          <Cartao key={beneficio.titulo} comBrilho>
            <span className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-hub/25 bg-hub/[0.08] text-hub">
              <IconeBeneficio nome={beneficio.icone} />
            </span>
            <h3 className="mb-2 text-base font-semibold text-texto">
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
