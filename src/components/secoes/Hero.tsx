import { Container } from '@/components/layout/Container'
import { Marquee } from '@/components/layout/Marquee'
import { RedeParticulas } from '@/components/anim/RedeParticulas'
import { Palco3D } from './Palco3D'
import { FRASES_MARQUEE_HERO } from '@/content/marquee'

// Padrao da marca: palavra fina + palavra em negrito.
const PALAVRAS: [string, boolean][] = [
  ['Vários', false],
  ['sistemas,', false],
  ['um', true],
  ['só', true],
  ['Atlas.', true],
]

/**
 * Hero escuro no padrao do site institucional: degrade navy, rede de
 * particulas, titulo que sobe palavra por palavra quando o preloader sai,
 * e o palco com o logo do grupo no centro e os sistemas em orbita.
 */
export function Hero() {
  return (
    <header id="hero" className="hero escuro hero-fundo relative isolate flex min-h-[100svh] flex-col overflow-hidden pt-20 text-white">
      <RedeParticulas />

      <Container className="grid flex-1 items-center gap-12 py-14 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="sobretitulo surge" style={{ color: 'var(--color-lavanda)' }}>
            R. Feitosa Group · Ecossistema Atlas
          </p>
          <h1
            aria-label="Vários sistemas, um só Atlas."
            className="mb-7 mt-6 font-display text-[clamp(2.8rem,6vw,5.2rem)] font-light leading-[0.98] tracking-[-0.03em] text-lavanda"
          >
            {PALAVRAS.map(([p, forte], i) => (
              <span key={p}>
                <span className="palavra" aria-hidden>
                  <i style={{ transitionDelay: `${0.5 + i * 0.12}s` }}>{forte ? <b className="font-bold text-white">{p}</b> : p}</i>
                </span>
                {i === 1 ? <br /> : ' '}
              </span>
            ))}
          </h1>
          <p className="surge max-w-md text-lg font-light leading-relaxed text-white/75" style={{ transitionDelay: '1.2s' }}>
            Um cadastro único. Onze sistemas lendo a mesma base — e evoluindo juntos a partir dela.
          </p>
          <div className="surge mt-10 flex flex-wrap gap-4" style={{ transitionDelay: '1.4s' }}>
            <a href="#sistemas" className="btn btn-claro mag">
              <span>Ver os sistemas</span>
              <SetaDireita />
            </a>
            <a href="#ecossistema" className="btn btn-claro mag" style={{ borderColor: 'rgba(255,255,255,.3)' }}>
              <span>Como funciona</span>
            </a>
          </div>
        </div>

        <div className="surge" style={{ transitionDelay: '0.8s' }}>
          <Palco3D />
        </div>
      </Container>

      <div className="rolar-dica mb-6 hidden flex-col items-center gap-3 text-[0.66rem] uppercase tracking-[0.3em] text-white/60 lg:flex">
        <span>Role para explorar</span>
        <i />
      </div>

      <Marquee itens={FRASES_MARQUEE_HERO} />
    </header>
  )
}

export function SetaDireita() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  )
}
