import { Secao } from '@/components/layout/Secao'
import { TituloSecao } from '@/components/layout/TituloSecao'
import { Revelar } from '@/components/anim/Revelar'
import { OrbitaEcossistema } from '@/components/diagramas/OrbitaEcossistema'

export function VisaoGeral() {
  return (
    <Secao id="ecossistema" tom="papel2">
      <TituloSecao
        sobretitulo="A virada"
        titulo="O Atlas no centro,"
        destaque="todos lendo a mesma base."
        descricao="Cada sistema usa o mesmo cadastro e acrescenta só a própria regra."
      />
      <Revelar de="escala">
        <OrbitaEcossistema />
      </Revelar>
    </Secao>
  )
}
