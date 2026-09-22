import { PASSOS_MVP } from '@/content/mvp'
import { cn } from '@/lib/cn'
import { COR_HUB } from '@/lib/cores'

/**
 * A esteira de um MVP novo.
 *
 * Os passos que REAPROVEITAM sao em latão; os que exigem construir sao
 * neutros. Contar as cores responde a pergunta da secao sem ler uma
 * palavra: tres de cinco ja estao prontos, e so um e trabalho novo de
 * verdade.
 */
export function DiagramaMvp() {
  return (
    <ol className="relative grid gap-3 lg:grid-cols-5">
      {/* Trilho continuo por tras dos passos, em telas largas. */}
      <span
        aria-hidden
        className="absolute left-0 right-0 top-[3.25rem] hidden h-px bg-gradient-to-r from-borda via-borda-forte to-borda lg:block"
      />
      {PASSOS_MVP.map((passo, i) => (
        <li key={passo.titulo} className="relative">
          <div
            className={cn(
              'flex h-full flex-col rounded-xl border p-5',
              passo.reaproveita
                ? 'border-hub/35 bg-hub/[0.05]'
                : 'border-borda bg-superficie/50',
            )}
          >
            <span
              className={cn(
                'mb-4 flex h-7 w-7 items-center justify-center rounded-lg font-mono text-xs',
                passo.reaproveita
                  ? 'bg-hub/15 text-hub'
                  : 'bg-superficie-alta text-texto-fraco',
              )}
            >
              {i + 1}
            </span>
            <h3
              className={cn(
                'mb-2 text-sm font-semibold',
                passo.reaproveita ? 'text-hub' : 'text-texto',
              )}
            >
              {passo.titulo}
            </h3>
            <p className="text-sm leading-relaxed text-texto-suave">
              {passo.detalhe}
            </p>
            <span
              className={cn(
                'mt-4 font-mono text-[0.65rem] uppercase tracking-[0.12em]',
                passo.reaproveita ? 'text-hub/70' : 'text-texto-fraco',
              )}
            >
              {passo.reaproveita ? 'reaproveita' : 'constrói'}
            </span>
          </div>
        </li>
      ))}
      <li className="lg:col-span-5">
        <p className="mt-4 text-sm text-texto-fraco">
          Três dos cinco passos já estão prontos antes de o projeto começar.{' '}
          <span style={{ color: COR_HUB }}>
            O custo de somar um sistema para de crescer com o tamanho do ecossistema.
          </span>
        </p>
      </li>
    </ol>
  )
}
