import { Container } from '@/components/layout/Container'
import { Marquee } from '@/components/layout/Marquee'
import { GradeFundo } from '@/components/diagramas/GradeFundo'
import { MODULOS, ENTIDADES_MESTRES } from '@/content/ecossistema'
import { FRASES_MARQUEE_HERO } from '@/content/marquee'

export function Hero() {
  return (
    <header id="hero" className="relative flex min-h-[100svh] flex-col overflow-hidden pt-24">
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
        <div className="animar-surgir mb-8 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.2em]">
          <span className="rounded-full border-2 border-hub bg-hub/[0.06] px-3 py-1 font-bold text-hub">
            R. Feitosa Group
          </span>
          <span className="rounded bg-hub px-2.5 py-1 font-mono font-bold text-acento">
            Ecossistema Atlas
          </span>
        </div>

        <h1 className="animar-surgir max-w-5xl text-balance font-display text-[clamp(2.6rem,7vw,6.5rem)] font-bold leading-[0.98] tracking-tight">
          Vários sistemas.
          <br />
          <span className="text-texto-fraco line-through decoration-4 decoration-fluxo/40">
            Nenhum falava com o outro.
          </span>
          <br />
          <span className="text-hub">Agora, um só </span>
          <span className="text-fluxo">Atlas.</span>
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
          <Metrica valor={String(MODULOS.length)} rotulo="sistemas conectados" cor="hub" />
          <Metrica valor={String(ENTIDADES_MESTRES.length)} rotulo="entidades mestras" cor="fluxo" />
          <Metrica valor="1" rotulo="fonte de verdade" cor="comercial" />
        </dl>
      </Container>

      <Marquee itens={FRASES_MARQUEE_HERO} className="mt-6" />
    </header>
  )
}

const COR_METRICA = {
  hub: 'text-hub',
  fluxo: 'text-fluxo',
  comercial: 'text-comercial',
} as const

function Metrica({
  valor,
  rotulo,
  cor,
}: {
  valor: string
  rotulo: string
  cor: keyof typeof COR_METRICA
}) {
  return (
    <div>
      <dt className="sr-only">{rotulo}</dt>
      <dd className={`font-display text-5xl font-bold tracking-tight ${COR_METRICA[cor]}`}>
        {valor}
      </dd>
      <p className="mt-2 text-sm font-medium text-texto-fraco">{rotulo}</p>
    </div>
  )
}
