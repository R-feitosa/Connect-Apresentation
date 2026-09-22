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
        indice="03"
        etiqueta="Fonte central"
        titulo="O que não se duplica em lugar nenhum"
        descricao="As informações mais importantes do negócio têm um único dono e passam a ser compartilhadas por todos os módulos, sem recriar identidade em cada solução."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {ENTIDADES_MESTRES.map((entidade) => (
          <Cartao key={entidade.codigo} comBrilho className="flex flex-col">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h3 className="text-base font-semibold text-texto">
                {entidade.nome}
              </h3>
              <span className="h-2.5 w-2.5 rounded-full bg-hub" aria-hidden />
            </div>
            <p className="mb-5 flex-1 text-sm leading-relaxed text-texto-suave">
              {entidade.descricao}
            </p>
            <Etiqueta mono className="w-fit">Base compartilhada</Etiqueta>
          </Cartao>
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-hub/25 bg-hub/[0.05] p-6">
        <p className="text-pretty leading-relaxed text-texto-suave">
          <strong className="font-medium text-hub">A regra que sustenta tudo:</strong>{' '}
          um módulo nunca cria a identidade mestre do zero. Se a informação já
          existe no Atlas, ela é reutilizada. Se ainda não existe, ela nasce no
          próprio ecossistema e fica disponível para quem precisa.
        </p>
      </div>
    </Secao>
  )
}
