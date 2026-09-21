import { Secao } from '@/components/layout/Secao'
import { TituloSecao } from '@/components/layout/TituloSecao'
import { Cartao } from '@/components/ui/Cartao'
import { Etiqueta } from '@/components/ui/Etiqueta'
import { ENTIDADES_MESTRES } from '@/content/ecossistema'

/**
 * As entidades que nao se duplicam.
 *
 * Cada cartao mostra a TABELA real. E o detalhe que separa "queremos ser
 * integrados" de "somos integrados": quem duvidar pode ir conferir.
 */
export function FonteCentral() {
  return (
    <Secao id="fonte">
      <TituloSecao
        etiqueta="Fonte central"
        titulo="O que não se duplica em lugar nenhum"
        descricao="Estes registros têm um dono único. Os módulos leem daqui e complementam com o que é específico da sua área — nunca recriando a identidade."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {ENTIDADES_MESTRES.map((entidade) => (
          <Cartao key={entidade.codigo} comBrilho className="flex flex-col">
            <h3 className="mb-2 text-base font-semibold text-texto">
              {entidade.nome}
            </h3>
            <p className="mb-5 flex-1 text-sm leading-relaxed text-texto-suave">
              {entidade.descricao}
            </p>
            <Etiqueta mono>{entidade.tabela}</Etiqueta>
          </Cartao>
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-hub/25 bg-hub/[0.05] p-6">
        <p className="text-pretty leading-relaxed text-texto-suave">
          <strong className="font-medium text-hub">A regra que sustenta tudo:</strong>{' '}
          um módulo nunca cria cadastro mestre paralelo. Se a informação já
          existe no HUB, ele a referencia. Se não existe, ele a cria{' '}
          <em className="not-italic text-texto">no HUB</em> — e não numa tabela
          própria que ninguém mais enxerga.
        </p>
      </div>
    </Secao>
  )
}
