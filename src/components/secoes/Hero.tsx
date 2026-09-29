import { Container } from '@/components/layout/Container'
import { Marquee } from '@/components/layout/Marquee'
import { MODULOS, ENTIDADES_MESTRES } from '@/content/ecossistema'
import { FRASES_MARQUEE_HERO } from '@/content/marquee'

/**
 * Hero escuro, replicando `.hero` do rf-group: degrade radial navy
 * (hub no centro-direita, apagando para o navy mais profundo nas
 * bordas), texto claro. E a unica secao escura fora do padrao "papel"
 * do resto do site — igual a identidade institucional real do grupo.
 */
export function Hero() {
  return (
    <header
      id="hero"
      className="relative flex min-h-[100svh] flex-col overflow-hidden pt-24 text-white"
      style={{
        background:
          'radial-gradient(120% 90% at 75% 40%, var(--color-hub) 0%, var(--color-hub-suave) 38%, var(--color-navy-fundo) 78%)',
      }}
    >
      {/* Grade tecnica, agora clara sobre o navy (era escura sobre o
          papel) — mesma calibragem original da direcao "Atlas
          cartografico", de quando o Hero ja tinha fundo escuro. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(62% 62% at 50% 38%, black 0%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(62% 62% at 50% 38%, black 0%, transparent 100%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[42rem] w-[60rem] -translate-x-1/2 -translate-y-1/3 rounded-full bg-white/[0.06] blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 h-[26rem] w-[26rem] translate-x-1/3 translate-y-1/3 rounded-full bg-fluxo/[0.35] blur-3xl"
      />

      <Container className="relative flex flex-1 flex-col justify-center">
        <div className="animar-surgir mb-8 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.2em]">
          <span className="rounded-full border border-white/30 bg-white/[0.08] px-3 py-1 font-medium text-white">
            R. Feitosa Group
          </span>
          <span className="rounded bg-fluxo px-2.5 py-1 font-mono font-medium text-white">
            Ecossistema Atlas
          </span>
        </div>

        <h1 className="animar-surgir max-w-5xl text-balance font-display text-[clamp(2.6rem,7vw,6.5rem)] font-light leading-[0.98] tracking-tight text-white/90">
          Vários sistemas.
          <br />
          <span className="text-white/40 line-through decoration-4 decoration-fluxo/50">
            Nenhum falava com o outro.
          </span>
          <br />
          <span className="font-light text-white/90">Agora, um só </span>
          <span className="font-bold text-white">Atlas.</span>
        </h1>

        <p
          className="animar-surgir mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-white/70 sm:text-xl"
          style={{ animationDelay: '120ms' }}
        >
          O problema era claro: cada aplicação tinha seu próprio banco, seus
          próprios cadastros, sua própria versão da verdade. A remodelagem
          criou o <strong className="font-semibold text-white">Atlas</strong>:
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

/** Sobre o navy do Hero, o navy e o bordo escuros ficam ilegiveis — as
 * mesmas cores da marca aqui usam variantes claras, como o rf-group faz
 * em `.numbers` (periwinkle claro para navy, rosa claro para bordo). */
const COR_METRICA = {
  hub: 'text-[#c9cdf0]',
  fluxo: 'text-[#e5a0a6]',
  comercial: 'text-white',
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
      <p className="mt-2 text-sm font-medium text-white/60">{rotulo}</p>
    </div>
  )
}
