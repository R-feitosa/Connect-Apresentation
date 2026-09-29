import { EfeitosGlobais } from '@/components/anim/EfeitosGlobais'
import { Navegacao } from '@/components/layout/Navegacao'
import { Marquee } from '@/components/layout/Marquee'
import { ModoEstande } from '@/components/layout/ModoEstande'
import { Hero } from '@/components/secoes/Hero'
import { Problema } from '@/components/secoes/Problema'
import { VisaoGeral } from '@/components/secoes/VisaoGeral'
import { Sistemas } from '@/components/secoes/Sistemas'
import { FluxoDeCadastro } from '@/components/secoes/FluxoDeCadastro'
import { FonteCentral } from '@/components/secoes/FonteCentral'
import { Numeros } from '@/components/secoes/Numeros'
import { Beneficios } from '@/components/secoes/Beneficios'
import { NovosMvps } from '@/components/secoes/NovosMvps'
import { Rodape } from '@/components/secoes/Rodape'
import { FRASES_MARQUEE_ENCERRAMENTO } from '@/content/marquee'

/**
 * A pagina e so a ORDEM das secoes: problema -> virada -> sistemas ->
 * pratica -> fonte -> numeros -> beneficios -> escala. Reordenar e mexer
 * nesta lista (e na de `ModoEstande.tsx`), em nada mais.
 */
export default function Home() {
  return (
    <>
      <EfeitosGlobais />
      <Navegacao />
      <main id="top">
        <Hero />
        <Problema />
        <VisaoGeral />
        <Sistemas />
        <FluxoDeCadastro />
        <FonteCentral />
        <Numeros />
        <Beneficios />
        <NovosMvps />
        <Marquee itens={FRASES_MARQUEE_ENCERRAMENTO} invertido />
      </main>
      <Rodape />
      <ModoEstande />
    </>
  )
}
