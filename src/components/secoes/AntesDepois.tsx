import { Secao } from '@/components/layout/Secao'
import { TituloSecao } from '@/components/layout/TituloSecao'
import { COMPARATIVO } from '@/content/comparativo'

/**
 * Antes x depois, pareado linha a linha.
 *
 * Duas colunas alinhadas no MESMO indice: cada "depois" fica na altura do
 * "antes" que ele responde. Duas listas soltas deixariam o leitor
 * procurando a correspondencia — pareando, a leitura horizontal ja
 * entrega o argumento.
 */
export function AntesDepois() {
  return (
    <Secao id="antes-depois">
      <TituloSecao
        indice="04"
        etiqueta="Antes e depois"
        titulo="Do caos operacional ao ecossistema integrado"
        descricao="O problema não era só tecnologia: eram processos repetidos, cadastros duplicados e decisões tomadas com informações diferentes. Atlas mudou esse cenário ao unificar a base e o comportamento do negócio."
      />

      <div className="overflow-hidden rounded-xl border border-borda">
        <div className="grid grid-cols-1 border-b border-borda bg-superficie/60 sm:grid-cols-2">
          <div className="border-b border-borda px-6 py-4 sm:border-b-0 sm:border-r">
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.15em] text-texto-fraco">
              Antes — aplicações isoladas
            </span>
          </div>
          <div className="px-6 py-4">
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.15em] text-hub">
              Depois — Atlas como base compartilhada
            </span>
          </div>
        </div>

        <ul>
          {COMPARATIVO.map((par, i) => (
            <li
              key={par.antes}
              className={`grid grid-cols-1 sm:grid-cols-2 ${
                i > 0 ? 'border-t border-borda' : ''
              }`}
            >
              <div className="flex gap-3 px-6 py-5 sm:border-r sm:border-borda">
                <span aria-hidden className="mt-1.5 text-texto-fraco">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                </span>
                <span className="text-sm leading-relaxed text-texto-fraco">
                  {par.antes}
                </span>
              </div>
              <div className="flex gap-3 bg-hub/[0.03] px-6 py-5">
                <span aria-hidden className="mt-1.5 text-hub">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2.5 6.5l2.5 2.5 4.5-5.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="text-sm leading-relaxed text-texto">
                  {par.depois}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Secao>
  )
}
