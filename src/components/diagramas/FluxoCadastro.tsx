'use client'

import { useState } from 'react'
import { FLUXOS } from '@/content/fluxos'
import { MODULO_POR_CODIGO } from '@/content/ecossistema'
import { LogoSistema } from '@/components/ui/LogoSistema'
import { cn } from '@/lib/cn'

/**
 * A esteira de um cadastro, por tipo de pessoa. O passo 2 ("Nasce no
 * HUB") e sempre o mesmo, sempre em navy: trocar de aba muda quem chega e
 * onde termina, mas a coluna do meio fica parada — e essa e a tese.
 */
export function FluxoCadastro() {
  const [ativo, setAtivo] = useState(FLUXOS[0].codigo)
  const fluxo = FLUXOS.find((f) => f.codigo === ativo) ?? FLUXOS[0]

  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-3" role="tablist" aria-label="Tipo de cadastro">
        {FLUXOS.map((f) => (
          <button
            key={f.codigo}
            type="button"
            role="tab"
            aria-selected={f.codigo === ativo}
            onClick={() => setAtivo(f.codigo)}
            className={cn(
              'border px-5 py-2.5 text-[0.75rem] font-semibold uppercase tracking-[0.16em] transition-colors duration-300',
              f.codigo === ativo
                ? 'border-hub bg-hub text-white'
                : 'border-borda-forte text-texto-suave hover:border-hub hover:text-hub',
            )}
          >
            {f.rotulo}
          </button>
        ))}
      </div>

      <ol key={fluxo.codigo} className="grid gap-px border border-borda bg-borda sm:grid-cols-2 lg:grid-cols-4">
        {fluxo.passos.map((passo, i) => {
          const ehHub = i === 1
          return (
            <li
              key={passo.titulo}
              className={cn('animar-surgir p-7', ehHub ? 'bg-hub text-white' : 'bg-fundo-alto')}
              style={{ animationDelay: `${i * 90}ms` }}
            >
              <span className={cn('mb-5 block text-xs font-semibold tracking-[0.2em]', ehHub ? 'text-lavanda' : 'text-vinho-claro')}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mb-2 font-display text-xl font-bold tracking-tight">{passo.titulo}</h3>
              <p className={cn('text-sm leading-relaxed', ehHub ? 'text-lavanda' : 'text-texto-suave')}>{passo.detalhe}</p>
            </li>
          )
        })}
      </ol>

      <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
        <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-texto-fraco">Passa a aparecer em</span>
        {fluxo.destinos.map((codigo) => {
          const modulo = MODULO_POR_CODIGO.get(codigo)
          return modulo ? <LogoSistema key={codigo} codigo={codigo} nome={modulo.nome} className="h-9" /> : null
        })}
        <span className="text-sm text-texto-suave">
          — <strong className="font-semibold text-hub">sem recadastrar.</strong>
        </span>
      </div>
    </div>
  )
}
