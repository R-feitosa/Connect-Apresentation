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
        <div className="flex flex-wrap justify-between gap-3 pt-6 text-sm">
          <p>Ecossistema Atlas — R. Feitosa Group</p>
          <p className="font-mono text-xs">Apresentação da arquitetura · sem conexão com o banco de produção</p>
        </div>
      </Container>
    </footer>
  )
}
