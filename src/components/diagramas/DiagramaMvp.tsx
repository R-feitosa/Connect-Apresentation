import { Revelar } from '@/components/anim/Revelar'
import { PASSOS_MVP } from '@/content/mvp'
import { cn } from '@/lib/cn'

/**
 * A esteira de um MVP novo. Os passos que REAPROVEITAM ficam em navy; os
 * que exigem construir, em papel. Contar as cores responde a secao sem
 * ler uma palavra: tres de cinco ja estao prontos.
 */
export function DiagramaMvp() {
  const prontos = PASSOS_MVP.filter((p) => p.reaproveita).length
  return (
    <div>
      <ol className="grid border-l border-t border-borda sm:grid-cols-2 lg:grid-cols-5">
        {PASSOS_MVP.map((passo, i) => (
          <Revelar
            as="li"
            key={passo.titulo}
            atraso={i * 0.1}
            className={cn('flex flex-col border-b border-r border-borda p-7', passo.reaproveita ? 'bg-hub text-white' : 'bg-fundo')}
          >
            <span className={cn('mb-5 text-xs font-semibold tracking-[0.2em]', passo.reaproveita ? 'text-lavanda' : 'text-vinho-claro')}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="mb-2 font-display text-xl font-bold tracking-tight">{passo.titulo}</h3>
            <p className={cn('text-sm leading-relaxed', passo.reaproveita ? 'text-lavanda' : 'text-texto-suave')}>{passo.detalhe}</p>
            <span
              className={cn(
                'mt-6 text-[0.66rem] font-semibold uppercase tracking-[0.18em]',
                passo.reaproveita ? 'text-white/70' : 'text-texto-fraco',
              )}
            >
              {passo.reaproveita ? 'já pronto' : 'constrói'}
            </span>
          </Revelar>
        ))}
      </ol>
      <Revelar as="p" className="mt-10 font-display text-2xl font-light text-fluxo">
        {prontos} de {PASSOS_MVP.length} passos <strong className="font-bold">já estão prontos antes do projeto começar.</strong>
      </Revelar>
    </div>
  )
}
