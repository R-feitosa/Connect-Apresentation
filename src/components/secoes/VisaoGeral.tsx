import { Secao } from '@/components/layout/Secao'
import { TituloSecao } from '@/components/layout/TituloSecao'
import { OrbitaEcossistema } from '@/components/diagramas/OrbitaEcossistema'

export function VisaoGeral() {
  return (
    <Secao id="ecossistema" comLinhaSuperior={false}>
      <TituloSecao
        etiqueta="Visão geral"
        titulo="Atlas no centro, aplicações conectadas ao mesmo registro"
        descricao="O ecossistema deixa de ser um conjunto de ferramentas paralelas para virar uma plataforma única: cada módulo usa o mesmo universo de dados e acrescenta apenas a sua própria regra de negócio."
      />
      <OrbitaEcossistema />
    </Secao>
  )
}
