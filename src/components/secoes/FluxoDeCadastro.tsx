import { Secao } from '@/components/layout/Secao'
import { TituloSecao } from '@/components/layout/TituloSecao'
import { Revelar } from '@/components/anim/Revelar'
import { FluxoCadastro } from '@/components/diagramas/FluxoCadastro'

export function FluxoDeCadastro() {
  return (
    <Secao id="fluxo" tom="papel2">
      <TituloSecao sobretitulo="Na prática" titulo="Quem chega" destaque="nasce uma vez só." />
      <Revelar>
        <FluxoCadastro />
      </Revelar>
    </Secao>
  )
}
