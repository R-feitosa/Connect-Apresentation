import Image from 'next/image'
import { Container } from '@/components/layout/Container'
import { LogoGrupo } from '@/components/ui/LogoGrupo'
import { LOGO_HUB } from '@/content/sistemas'

export function Rodape() {
  return (
    <footer className="border-t border-white/10 bg-navy-fundo pb-9 pt-16 text-white/70">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-8 border-b border-white/10 pb-10">
          <LogoGrupo variante="mono" className="h-10 w-auto text-white" />
          <div className="flex items-center gap-3 rounded-full bg-white px-4 py-2">
            <Image src={LOGO_HUB} alt="Atlas HUB" className="h-7 w-auto" sizes="120px" />
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 pt-6 text-sm">
          <p>Ecossistema Atlas — R. Feitosa Group</p>
          <a
            href="https://github.com/brnz4n"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 rounded-full border border-white/15 py-1.5 pl-3 pr-4 font-mono text-xs transition-colors hover:border-white/40 hover:text-white"
          >
            <span className="text-lavanda">&lt;/&gt;</span>
            <span>desenvolvido por</span>
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current text-white" aria-hidden>
              <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.34-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.7 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
            </svg>
            <span className="font-semibold text-white group-hover:underline">brnz4n</span>
          </a>
        </div>
      </Container>
    </footer>
  )
}
