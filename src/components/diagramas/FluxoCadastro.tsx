'use client'

import { useState } from 'react'
import { FLUXOS } from '@/content/fluxos'
import { MODULO_POR_CODIGO } from '@/content/ecossistema'
import { COR_FAMILIA, COR_HUB } from '@/lib/cores'
import { cn } from '@/lib/cn'

/**
 * A esteira de um cadastro, por tipo de pessoa.
 *
 * O SEGUNDO passo e sempre "Nasce no HUB", em dourado, em todos os
 * fluxos. Trocar de aba muda quem chega e muda onde termina, mas a
 * coluna do meio fica parada — e essa imobilidade e o argumento. Se cada
 * fluxo tivesse um desenho proprio, o leitor veria quatro processos; do
 * jeito que esta, ve um processo com quatro entradas.
 */
export function FluxoCadastro() {
  const [ativo, setAtivo] = useState(FLUXOS[0].codigo)
  const fluxo = FLUXOS.find((f) => f.codigo === ativo) ?? FLUXOS[0]

  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-2" role="tablist" aria-label="Tipo de cadastro">
        {FLUXOS.map((f) => (
          <button
            key={f.codigo}
            type="button"
            role="tab"
            aria-selected={f.codigo === ativo}
            onClick={() => setAtivo(f.codigo)}
            className={cn(
              'rounded-lg border px-4 py-2 text-sm transition-colors duration-200',
              f.codigo === ativo
                ? 'border-hub/50 bg-hub/10 text-hub'
                : 'border-borda bg-superficie/50 text-texto-suave hover:border-borda-forte hover:text-texto',
            )}
          >
            {f.rotulo}
          </button>
        ))}
      </div>

      <ol key={fluxo.codigo} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {fluxo.passos.map((passo, i) => {
          const ehHub = i === 1
          return (
            <li
              key={passo.titulo}
              className="animar-surgir"
              style={{ animationDelay: `${i * 90}ms` }}
            >
              <div
                className={cn(
                  'relative h-full rounded-xl border p-5',
                  ehHub
                    ? 'border-hub/40 bg-hub/[0.06]'
                    : 'border-borda bg-superficie/50',
                )}
              >
                <div className="mb-3 flex items-center gap-3">
                  <span
                    className={cn(
                      'flex h-6 w-6 shrink-0 items-center justify-center rounded-md font-mono text-[0.7rem]',
                      ehHub ? 'bg-hub/20 text-hub' : 'bg-superficie-alta text-texto-fraco',
                    )}
                  >
                    {i + 1}
                  </span>
                  <h3
                    className={cn(
                      'text-sm font-semibold',
                      ehHub ? 'text-hub' : 'text-texto',
                    )}
                  >
                    {passo.titulo}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-texto-suave">
                  {passo.detalhe}
                </p>

                {/* Seta entre cartoes, so a partir do segundo em telas largas. */}
                {i < fluxo.passos.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute -right-4 top-1/2 hidden -translate-y-1/2 text-borda-forte lg:block"
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2 6h8M7 3l3 3-3 3"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                )}
              </div>
            </li>
          )
        })}
      </ol>

      <div className="mt-8 flex flex-wrap items-center gap-3 rounded-xl border border-borda bg-superficie/40 px-5 py-4">
        <span className="font-mono text-[0.7rem] uppercase tracking-[0.15em] text-texto-fraco">
          Passa a aparecer em
        </span>
        {fluxo.destinos.map((codigo) => {
          const modulo = MODULO_POR_CODIGO.get(codigo)
          if (!modulo) return null
          const cor = COR_FAMILIA[modulo.familia]
          return (
            <span
              key={codigo}
              className="inline-flex items-center gap-2 rounded-md border px-2.5 py-1 text-xs"
              style={{ borderColor: `${cor}55`, color: cor, backgroundColor: `${cor}14` }}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: cor }} />
              {modulo.nome}
            </span>
          )
        })}
        <span className="ml-auto font-mono text-[0.7rem] text-texto-fraco">
          sem recadastrar
        </span>
      </div>

      <p className="mt-5 text-sm text-texto-fraco">
        Repare no passo 2: ele é o mesmo nos quatro fluxos.{' '}
        <span style={{ color: COR_HUB }}>Muda quem chega e muda onde termina; a origem, não.</span>
      </p>
    </div>
  )
}
