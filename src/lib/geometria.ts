/**
 * Geometria do diagrama radial.
 *
 * Fica separado do componente de proposito: e a unica parte do diagrama
 * que tem resposta certa ou errada, e assim da para conferir sem abrir o
 * navegador. O componente so desenha o que sai daqui.
 *
 * Convencao: o SVG tem viewBox quadrado com origem no centro
 * (-META..+META nos dois eixos), entao o nucleo fica em (0,0) e nao
 * depende do tamanho renderizado.
 */

export interface Ponto {
  readonly x: number
  readonly y: number
}

export interface PosicaoNo extends Ponto {
  readonly indice: number
  /** Angulo em graus, 0 = topo, crescendo no sentido horario. */
  readonly angulo: number
}

/** Metade do lado do viewBox. O desenho todo cabe em -100..100. */
export const META = 100

/**
 * Distribui `quantidade` nos sobre uma elipse.
 *
 * Comeca no TOPO (-90 graus) porque o olho entra pelo topo, e um no
 * exatamente em cima do nucleo ancora a leitura. `raioX` maior que
 * `raioY` acomoda telas largas sem esticar o nucleo.
 */
export function distribuirEmElipse(
  quantidade: number,
  raioX: number,
  raioY: number,
): readonly PosicaoNo[] {
  if (quantidade <= 0) return []
  const passo = 360 / quantidade
  return Array.from({ length: quantidade }, (_, indice) => {
    const angulo = indice * passo
    const rad = ((angulo - 90) * Math.PI) / 180
    return {
      indice,
      angulo,
      x: Math.cos(rad) * raioX,
      y: Math.sin(rad) * raioY,
    }
  })
}

/**
 * Caminho do nucleo ate um no, curvado.
 *
 * Reta ligando tudo ao centro vira estrela e polui. A curva sai do
 * centro, desvia levemente e chega no no — o desvio e perpendicular ao
 * raio, entao curvas vizinhas nunca se sobrepoem.
 */
export function caminhoParaNo(destino: Ponto, curvatura = 0.18): string {
  const meioX = destino.x / 2
  const meioY = destino.y / 2
  // Perpendicular ao segmento centro->destino.
  const controleX = meioX - destino.y * curvatura
  const controleY = meioY + destino.x * curvatura
  return `M 0 0 Q ${controleX.toFixed(2)} ${controleY.toFixed(2)} ${destino.x.toFixed(2)} ${destino.y.toFixed(2)}`
}

/** Distancia do centro ate o ponto. Usada para sincronizar a animacao. */
export function distanciaDoCentro({ x, y }: Ponto): number {
  return Math.hypot(x, y)
}
