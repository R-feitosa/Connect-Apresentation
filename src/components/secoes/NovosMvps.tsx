import { Secao } from '@/components/layout/Secao'
import { TituloSecao } from '@/components/layout/TituloSecao'
import { DiagramaMvp } from '@/components/diagramas/DiagramaMvp'

export function NovosMvps() {
  return (
    <Secao id="escala">
      <TituloSecao sobretitulo="Escalabilidade" titulo="Pronto para" destaque="o próximo sistema." />
      <DiagramaMvp />
    </Secao>
  )
}
