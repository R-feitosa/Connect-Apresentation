import { Secao } from '@/components/layout/Secao'
import { TituloSecao } from '@/components/layout/TituloSecao'
import { OrbitaEcossistema } from '@/components/diagramas/OrbitaEcossistema'

export function VisaoGeral() {
  return (
    <Secao id="ecossistema" comLinhaSuperior={false}>
      <TituloSecao
        etiqueta="Visão geral"
        titulo="O HUB no centro, os módulos ao redor"
        descricao="Cada linha é uma leitura de dado mestre saindo do centro. Nenhum módulo mantém o próprio cadastro de pessoas ou empresas — todos leem o mesmo registro e escrevem apenas o que é seu."
      />
      <OrbitaEcossistema />
    </Secao>
  )
}
