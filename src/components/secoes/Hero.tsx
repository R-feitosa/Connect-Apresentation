import { Container } from '@/components/layout/Container'
import { GradeFundo } from '@/components/diagramas/GradeFundo'
import { MODULOS, ENTIDADES_MESTRES } from '@/content/ecossistema'

export function Hero() {
  return (
    <header className="relative overflow-hidden pb-24 pt-24 sm:pb-32 sm:pt-32">
      <GradeFundo />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[36rem] w-[52rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-hub/[0.07] blur-[100px]"
      />

      <Container className="relative">
        <div className="mb-8 flex flex-wrap gap-3 text-xs uppercase tracking-[0.2em] text-texto-suave">
          <span className="rounded-full border border-hub/30 bg-hub/[0.06] px-3 py-1 text-hub">
            Problema
          </span>
          <span className="rounded-full border border-borda bg-superficie/50 px-3 py-1">
            Solução
          </span>
        </div>

        <p className="mb-6 font-mono text-xs uppercase tracking-[0.25em] text-hub">
          Ecossistema Atlas — R. Feitosa Group
        </p>

        <h1 className="max-w-4xl text-balance text-4xl font-semibold leading-[1.08] tracking-tight sm:text-6xl">
          Antes, cada aplicação
          <br />
          <span className="text-hub">vivia no seu próprio mundo.</span>
          <br />
          Agora, elas compartilham o mesmo Atlas.
        </h1>

        <p className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-texto-suave">
          O problema era claro: várias soluções operavam com cadastros,
          processos e regras diferentes, sem falar entre si. A remodelagem criou
          o <strong className="font-medium text-texto">Atlas</strong>, um
          ecossistema em que todas as aplicações usam a mesma base e a mesma
          fonte de verdade para evoluir em conjunto.
        </p>

        <dl className="mt-14 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-3">
          <Metrica valor={String(MODULOS.length)} rotulo="sistemas conectados" />
          <Metrica valor={String(ENTIDADES_MESTRES.length)} rotulo="campos de origem" />
          <Metrica valor="1" rotulo="fonte de verdade" destacado />
        </dl>
      </Container>
    </header>
  )
}

function Metrica({
  valor,
  rotulo,
  destacado = false,
}: {
  valor: string
  rotulo: string
  destacado?: boolean
}) {
  return (
    <div>
      <dt className="sr-only">{rotulo}</dt>
      <dd
        className={`font-mono text-4xl font-semibold tracking-tight ${
          destacado ? 'text-hub' : 'text-texto'
        }`}
      >
        {valor}
      </dd>
      <p className="mt-2 text-sm text-texto-fraco">{rotulo}</p>
    </div>
  )
}
