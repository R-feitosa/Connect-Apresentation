'use client'

import { useMemo, useState } from 'react'
import { MODULOS, ENTIDADE_POR_CODIGO } from '@/content/ecossistema'
import { distribuirEmElipse } from '@/lib/geometria'
import { COR_FAMILIA, COR_HUB, ROTULO_FAMILIA } from '@/lib/cores'
import { Conexao } from './Conexao'
import { NucleoHub } from './NucleoHub'
import { NoModulo } from './NoModulo'
import { Etiqueta } from '@/components/ui/Etiqueta'
import { LogoSistema } from '@/components/ui/LogoSistema'
import type { FamiliaModulo } from '@/types/ecossistema'

const RAIO_X = 78
const RAIO_Y = 64

/**
 * O diagrama principal.
 *
 * Duas decisoes que valem explicacao:
 *
 * 1. ATENUAR EM VEZ DE DESTACAR. Ao focar um modulo, os outros CAEM para
 *    ~20% em vez de o escolhido ficar mais forte. Empurrar um item para
 *    cima num fundo escuro estoura; puxar o resto para baixo isola sem
 *    alterar a leitura do que foi escolhido.
 *
 * 2. O PAINEL NAO SOME. Sem selecao ele mostra a legenda de familias;
 *    com selecao, o que o modulo le do HUB e o que ele guarda de proprio.
 *    Um painel que aparece e desaparece faz a pagina saltar, e o salto e
 *    justamente o que tira a credibilidade de uma apresentacao.
 */
export function OrbitaEcossistema() {
  const [focado, setFocado] = useState<string | null>(null)

  const posicoes = useMemo(
    () => distribuirEmElipse(MODULOS.length, RAIO_X, RAIO_Y),
    [],
  )

  const moduloFocado = focado
    ? MODULOS.find((m) => m.codigo === focado) ?? null
    : null

  const familias = useMemo(
    () => [...new Set(MODULOS.map((m) => m.familia))] as FamiliaModulo[],
    [],
  )

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-10">
      <div className="lg:col-span-7">
        <svg
          viewBox="-130 -94 260 188"
          className="h-auto w-full"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Diagrama do ecossistema: o Atlas Hub ao centro e os módulos ao redor, consumindo os dados mestres."
        >
          <g>
            {MODULOS.map((modulo, i) => (
              <Conexao
                key={modulo.codigo}
                destino={posicoes[i]}
                cor={COR_FAMILIA[modulo.familia]}
                ativo={focado === modulo.codigo}
                atenuado={focado !== null && focado !== modulo.codigo}
                indice={i}
              />
            ))}
          </g>

          {MODULOS.map((modulo, i) => (
            <NoModulo
              key={modulo.codigo}
              modulo={modulo}
              posicao={posicoes[i]}
              ativo={focado === modulo.codigo}
              atenuado={focado !== null && focado !== modulo.codigo}
              aoFocar={() => setFocado(modulo.codigo)}
              aoSair={() => setFocado(null)}
            />
          ))}

          <NucleoHub atenuado={focado !== null} />
        </svg>
      </div>

      <div className="lg:col-span-5">
        <div className="min-h-[21rem] border border-borda bg-fundo p-7">
          {moduloFocado ? (
            <div key={moduloFocado.codigo} className="animar-surgir">
              <LogoSistema codigo={moduloFocado.codigo} nome={moduloFocado.nome} className="mb-4 h-12" />
              <p className="mb-6 text-sm text-texto-suave">{moduloFocado.resumo}</p>

              <p className="mb-2 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-hub">
                Lê do HUB
              </p>
              <div className="mb-6 flex flex-wrap gap-1.5">
                {moduloFocado.consome.map((codigo) => (
                  <Etiqueta key={codigo} cor={COR_HUB}>
                    {ENTIDADE_POR_CODIGO.get(codigo)?.nome ?? codigo}
                  </Etiqueta>
                ))}
              </div>

              <p className="mb-2 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-texto-fraco">
                Guarda de próprio
              </p>
              <ul className="space-y-1.5">
                {moduloFocado.proprio.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm text-texto-suave">
                    <span className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-borda-forte" />
                    {item}
                  </li>
                ))}
              </ul>

              {moduloFocado.usuarios !== undefined && (
                <p className="mt-6 border-t border-borda pt-4 font-mono text-xs text-texto-fraco">
                  {moduloFocado.usuarios} pessoas com acesso concedido
                </p>
              )}
            </div>
          ) : (
            <div>
              <h3 className="mb-2 font-display text-2xl font-light text-fluxo">
                {MODULOS.length} sistemas, <strong className="font-bold">um cadastro.</strong>
              </h3>
              <p className="mb-6 text-sm leading-relaxed text-texto-suave">
                Passe por um sistema para ver o que ele <strong className="font-semibold text-hub">lê do HUB</strong>.
              </p>
              <p className="mb-3 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-texto-fraco">
                Famílias
              </p>
              <ul className="space-y-2.5">
                {familias.map((familia) => (
                  <li key={familia} className="flex items-center gap-3 text-sm text-texto-suave">
                    <span
                      className="h-2 w-2 shrink-0 rounded-full"
                      style={{ backgroundColor: COR_FAMILIA[familia] }}
                    />
                    {ROTULO_FAMILIA[familia]}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
