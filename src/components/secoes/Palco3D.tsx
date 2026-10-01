'use client'

import { useEffect, useRef, useState } from 'react'
import iconePonto from '@/assets/logos/ponto-icone.png'
import { PalcoOrbita } from './PalcoOrbita'

/**
 * O palco do Hero em 3D: o logo do RFEITOSA GROUP no centro e os sistemas em orbita, com os
 * logos extrudados em three.js (pacote de logos 3D da RF Group).
 *
 * three.js so e baixado no navegador, depois da pagina pronta (import
 * dinamico), e o canvas aparece com fade quando o primeiro quadro sai.
 * Sem WebGL — ou se algo falhar — cai para a versao em CSS, com os
 * mesmos logos em 2D.
 */
// Testar WebGL cria um contexto: caro (sobretudo em PC fraco). Faz uma vez.
let temWebglCache: boolean | null = null
function temWebgl() {
  if (temWebglCache === null) {
    const teste = document.createElement('canvas')
    const gl = teste.getContext('webgl2') || teste.getContext('webgl')
    temWebglCache = !!gl
    gl?.getExtension('WEBGL_lose_context')?.loseContext()
  }
  return temWebglCache
}

export function Palco3D() {
  const host = useRef<HTMLDivElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const [estado, setEstado] = useState<'carregando' | 'pronto' | 'sem-3d'>('carregando')

  useEffect(() => {
    let desmontar: (() => void) | undefined
    let cancelado = false
    if (!temWebgl()) {
      queueMicrotask(() => setEstado('sem-3d'))
      return
    }
    // Sai do quadro da interacao (clique/tecla que montou o slide): o
    // palco so comeca depois que o navegador pintou a resposta.
    const depoisDoQuadro = () => new Promise<void>((r) => requestAnimationFrame(() => setTimeout(r, 0)))
    Promise.all([import('@/lib/logos3d/palco'), depoisDoQuadro()])
      .then(([{ montarPalco }]) => {
        if (cancelado || !host.current || !canvas.current) return
        desmontar = montarPalco(host.current, canvas.current, {
          texturaPonto: iconePonto.src,
          aoFicarPronto: () => setEstado('pronto'),
        })
      })
      .catch(() => !cancelado && setEstado('sem-3d'))
    return () => {
      cancelado = true
      desmontar?.()
    }
  }, [])

  if (estado === 'sem-3d') return <PalcoOrbita />

  return (
    <div className="palco relative mx-auto aspect-square w-[92%] max-w-[560px] sm:w-full">
      <div className="orbe" />
      <div className="anel a1" />
      <div className="anel a2" />
      <div ref={host} className="absolute -inset-[4%] sm:-inset-[18%]" aria-label="Logo do RFEITOSA GROUP no centro e os onze sistemas em órbita" role="img">
        <canvas
          ref={canvas}
          className="block h-full w-full transition-opacity duration-1000"
          style={{ opacity: estado === 'pronto' ? 1 : 0 }}
        />
      </div>
    </div>
  )
}
