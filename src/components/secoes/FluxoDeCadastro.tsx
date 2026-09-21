import { Secao } from '@/components/layout/Secao'
import { TituloSecao } from '@/components/layout/TituloSecao'
import { FluxoCadastro } from '@/components/diagramas/FluxoCadastro'

export function FluxoDeCadastro() {
  return (
    <Secao id="fluxo">
      <TituloSecao
        etiqueta="Fluxo de um cadastro"
        titulo="Onde o dado nasce, e para onde ele vai"
        descricao="Cliente, colaborador, empresa ou participante entram pela mesma porta. O que muda depois é o papel — e é o papel que decide quais módulos passam a enxergar aquele registro."
      />
      <FluxoCadastro />
    </Secao>
  )
}
