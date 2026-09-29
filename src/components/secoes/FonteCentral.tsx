import { Secao } from '@/components/layout/Secao'
import { TituloSecao } from '@/components/layout/TituloSecao'
import { Revelar } from '@/components/anim/Revelar'
import { ENTIDADES_MESTRES } from '@/content/ecossistema'

/**
 * As entidades que nao se duplicam: nome e uma linha do que guardam.
 * Sem nome de tabela — o publico e de evento, nao de banco de dados.
 */
export function FonteCentral() {
  return (
    <Secao id="fonte">
      <TituloSecao sobretitulo="Fonte central" titulo="O que" destaque="não se duplica." />

      <div className="grid border-l border-t border-borda sm:grid-cols-2 lg:grid-cols-4">
        {ENTIDADES_MESTRES.map((e, i) => (
          <Revelar
            key={e.codigo}
            atraso={(i % 4) * 0.08}
            className="group border-b border-r border-borda bg-fundo p-7 hover:bg-hub hover:text-white"
          >
            <span className="mb-5 block text-xs font-semibold tracking-[0.2em] text-vinho-claro group-hover:text-lavanda">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="font-display text-xl font-bold tracking-tight">{e.nome}</h3>
            <p className="mt-2 text-sm leading-snug text-texto-suave group-hover:text-lavanda">{e.descricao}</p>
          </Revelar>
        ))}
      </div>

      <Revelar as="p" className="mx-auto mt-12 max-w-2xl text-center font-display text-2xl font-light leading-snug text-fluxo">
        Se já existe no Atlas, <strong className="font-bold">é reutilizado.</strong> Se não existe,{' '}
        <strong className="font-bold">nasce nele.</strong>
      </Revelar>
    </Secao>
  )
}
