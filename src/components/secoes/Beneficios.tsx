import { Secao } from '@/components/layout/Secao'
import { TituloSecao } from '@/components/layout/TituloSecao'
import { Revelar } from '@/components/anim/Revelar'
import { IconeBeneficio } from '@/components/ui/IconeBeneficio'
import { BENEFICIOS } from '@/content/beneficios'

export function Beneficios() {
  return (
    <Secao id="beneficios" tom="papel2">
      <TituloSecao sobretitulo="Benefícios" titulo="O que muda" destaque="no dia a dia." />

      <div className="grid border-l border-t border-borda sm:grid-cols-2 lg:grid-cols-3">
        {BENEFICIOS.map((b, i) => (
          <Revelar key={b.titulo} atraso={(i % 3) * 0.1} className="group border-b border-r border-borda bg-fundo-alto p-8 hover:bg-hub hover:text-white">
            <span className="mb-6 inline-flex h-11 w-11 items-center justify-center border border-fluxo/30 text-fluxo transition-colors duration-500 group-hover:border-white/30 group-hover:text-white">
              <IconeBeneficio nome={b.icone} />
            </span>
            <h3 className="mb-2 font-display text-xl font-bold tracking-tight">{b.titulo}</h3>
            <p className="text-sm leading-relaxed text-texto-suave group-hover:text-lavanda">{b.descricao}</p>
          </Revelar>
        ))}
      </div>
    </Secao>
  )
}
