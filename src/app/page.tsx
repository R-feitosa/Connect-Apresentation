import { Navegacao } from '@/components/layout/Navegacao'
import { Hero } from '@/components/secoes/Hero'
import { VisaoGeral } from '@/components/secoes/VisaoGeral'
import { FluxoDeCadastro } from '@/components/secoes/FluxoDeCadastro'
import { FonteCentral } from '@/components/secoes/FonteCentral'
import { AntesDepois } from '@/components/secoes/AntesDepois'
import { Beneficios } from '@/components/secoes/Beneficios'
import { NovosMvps } from '@/components/secoes/NovosMvps'
import { Rodape } from '@/components/secoes/Rodape'

/**
 * A pagina e so a ORDEM das secoes.
 *
 * Nenhuma marcacao mora aqui: trocar a ordem, remover uma secao ou
 * acrescentar outra e mexer nesta lista, e em nada mais. Era esse o
 * pedido de "nao concentrar a landing num arquivo so".
 */
export default function Home() {
  return (
    <>
      <Navegacao />
      <main id="top">
        <Hero />
        <VisaoGeral />
        <FluxoDeCadastro />
        <FonteCentral />
        <AntesDepois />
        <Beneficios />
        <NovosMvps />
      </main>
      <Rodape />
    </>
  )
}
