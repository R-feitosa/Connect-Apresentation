import type { CSSProperties } from 'react'
import { MODULOS } from '@/content/ecossistema'
import { LogoGrupo } from '@/components/ui/LogoGrupo'
import { LogoSistema } from '@/components/ui/LogoSistema'

// As logos mais largas (Tributario, Consult) ficam na orbita externa: nas
// laterais, onde as duas orbitas ficam lado a lado, a soma das meias
// larguras cabe no vao entre os raios e as pilulas nao se sobrepoem.
const INTERNOS = ['crm', 'rf_ops', 'rh', 'legal_ops', 'cash']
const doCodigo = (c: string) => MODULOS.find((m) => m.codigo === c)!
const EXTERNOS = MODULOS.filter((m) => !INTERNOS.includes(m.codigo))

/**
 * Versao em CSS do palco do Hero (fallback do Palco3D quando nao ha
 * WebGL): o logo do grupo no centro e as logos de todos os
 * sistemas girando em duas orbitas, em sentidos opostos. So transform,
 * composto na GPU. O raio
 * vem em `cqw` (largura do proprio palco), entao as orbitas acompanham o
 * tamanho em qualquer tela e dentro dos slides escalados do modo estande.
 */
export function PalcoOrbita() {
  return (
    <div className="palco relative mx-auto aspect-square w-[78%] max-w-[540px] sm:w-full" style={{ containerType: 'inline-size' }}>
      <div className="orbe" />
      <div className="anel a1" />
      <div className="anel a2" />

      <Orbita modulos={INTERNOS.map(doCodigo)} raio="26cqw" duracao="70s" />
      <Orbita modulos={EXTERNOS} raio="48cqw" duracao="95s" inversa deslocamento={30} />

      <div className="absolute left-1/2 top-1/2 w-[46%] -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_0_30px_rgba(201,205,240,0.35)]">
        <LogoGrupo variante="mono" className="h-auto w-full text-white" />
      </div>
    </div>
  )
}

function Orbita({
  modulos,
  raio,
  duracao,
  inversa = false,
  deslocamento = 0,
}: {
  modulos: readonly (typeof MODULOS)[number][]
  raio: string
  duracao: string
  inversa?: boolean
  deslocamento?: number
}) {
  return (
    <div className={inversa ? 'orbita inversa' : 'orbita'} style={{ '--dur': duracao } as CSSProperties}>
      {modulos.map((m, i) => (
        <div
          key={m.codigo}
          className="orbita-item"
          style={{ '--a': `${deslocamento + (360 / modulos.length) * i}deg`, '--r': raio } as CSSProperties}
        >
          <div>
            <span className="flex h-[9cqw] items-center rounded-full bg-white px-[2.2cqw] shadow-[0_8px_24px_-10px_rgba(0,0,0,0.5)]">
              <LogoSistema codigo={m.codigo} nome={m.nome} imediato somenteMarca className="h-[5.2cqw] max-w-none" />
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
