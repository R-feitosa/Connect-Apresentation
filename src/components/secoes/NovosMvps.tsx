import { Secao } from '@/components/layout/Secao'
import { TituloSecao } from '@/components/layout/TituloSecao'
import { DiagramaMvp } from '@/components/diagramas/DiagramaMvp'

export function NovosMvps() {
  return (
    <Secao id="mvps">
      <TituloSecao
        etiqueta="Escalabilidade"
        titulo="Preparado para o próximo sistema"
        descricao="Um MVP novo não recomeça a modelagem de dados. Ele pergunta ao HUB o que já existe, reaproveita, e escreve apenas a própria regra."
      />
      <DiagramaMvp />
    </Secao>
  )
}
