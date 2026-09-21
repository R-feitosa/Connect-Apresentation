import { Container } from '@/components/layout/Container'
import { GradeFundo } from '@/components/diagramas/GradeFundo'
import { MODULOS, ENTIDADES_MESTRES } from '@/content/ecossistema'

export function Hero() {
  return (
    <header className="relative overflow-hidden pb-24 pt-24 sm:pb-32 sm:pt-32">
      <GradeFundo />
      {/* Brilho dourado atras do titulo: o nucleo "vazando" para o texto. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[36rem] w-[52rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-hub/[0.07] blur-[100px]"
      />

      <Container className="relative">
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.25em] text-hub">
          Ecossistema Atlas — R. Feitosa Group
        </p>

        <h1 className="max-w-4xl text-balance text-4xl font-semibold leading-[1.1] tracking-tight sm:text-6xl">
          Um ecossistema.
          <br />
          <span className="text-hub">Uma fonte de verdade.</span>
          <br />
          Múltiplas soluções.
        </h1>

        <p className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-texto-suave">
          Os sistemas do grupo deixaram de manter cadastros paralelos. Pessoas,
          empresas, papéis e acessos nascem uma única vez no{' '}
          <strong className="font-medium text-texto">Atlas Hub</strong> e são
          reutilizados por todos os módulos — cada um acrescentando apenas o que
          pertence à sua própria regra de negócio.
        </p>

        <dl className="mt-14 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-3">
          <Metrica valor={String(MODULOS.length)} rotulo="sistemas integrados" />
          <Metrica valor={String(ENTIDADES_MESTRES.length)} rotulo="entidades mestres" />
          <Metrica valor="1" rotulo="cadastro de origem" destacado />
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
