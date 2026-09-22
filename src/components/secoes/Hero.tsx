import { Container } from '@/components/layout/Container'
import { Marquee } from '@/components/layout/Marquee'
import { GradeFundo } from '@/components/diagramas/GradeFundo'
import { MODULOS, ENTIDADES_MESTRES } from '@/content/ecossistema'

const FRASES_MARQUEE = [
  'Sistemas isolados',
  'Dados fragmentados',
  'Um ecossistema',
  'Uma única fonte de verdade',
]

export function Hero() {
  return (
    <header className="relative flex min-h-[100svh] flex-col overflow-hidden pt-24">
      <GradeFundo />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[42rem] w-[60rem] -translate-x-1/2 -translate-y-1/3 rounded-full bg-hub/[0.08] blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 h-[26rem] w-[26rem] translate-x-1/3 translate-y-1/3 rounded-full bg-fluxo/[0.06] blur-3xl"
      />

      <Container className="relative flex flex-1 flex-col justify-center">
        <div className="animar-surgir mb-8 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.2em] text-texto-suave">
          <span className="rounded-full border border-hub/30 bg-hub/[0.06] px-3 py-1 text-hub">
            R. Feitosa Group
          </span>
          <span className="font-mono text-texto-fraco">Ecossistema Atlas</span>
        </div>

        <h1 className="animar-surgir max-w-5xl text-balance font-display text-[clamp(2.6rem,7vw,6.5rem)] font-medium leading-[0.98] tracking-tight">
          Vários sistemas.
          <br />
          <span className="text-texto-fraco line-through decoration-2 decoration-texto-fraco/50">
            Nenhum falava com o outro.
          </span>
          <br />
          <span className="text-hub">Agora, um só Atlas.</span>
        </h1>

        <p
          className="animar-surgir mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-texto-suave sm:text-xl"
          style={{ animationDelay: '120ms' }}
        >
          O problema era claro: cada aplicação tinha seu próprio banco, seus
          próprios cadastros, sua própria versão da verdade. A remodelagem
          criou o <strong className="font-medium text-texto">Atlas</strong>:
          um ecossistema onde todas as aplicações passam a compartilhar a
          mesma base — e evoluem juntas a partir dela.
        </p>

        <dl
          className="animar-surgir mt-14 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-3"
          style={{ animationDelay: '220ms' }}
        >
          <Metrica valor={String(MODULOS.length)} rotulo="sistemas conectados" />
          <Metrica valor={String(ENTIDADES_MESTRES.length)} rotulo="entidades mestras" />
          <Metrica valor="1" rotulo="fonte de verdade" destacado />
        </dl>
      </Container>

      <Marquee itens={FRASES_MARQUEE} className="mt-16" />
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
        className={`font-display text-5xl font-medium tracking-tight ${
          destacado ? 'text-hub' : 'text-texto'
        }`}
      >
        {valor}
      </dd>
      <p className="mt-2 text-sm text-texto-fraco">{rotulo}</p>
    </div>
  )
}
