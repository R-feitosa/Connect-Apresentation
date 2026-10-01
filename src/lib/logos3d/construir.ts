import * as THREE from 'three'
import { SVGLoader } from 'three/addons/loaders/SVGLoader.js'
import type { Contorno, Logo3D } from './tipos'
import type { MarcaEmpresa } from '@/content/marcas-empresas'
import { LOGO_EITOSA, LOGO_GROUP, LOGO_MONO, LOGO_TRI, LOGO_VIEWBOX } from '@/content/logo-grupo'

/**
 * Montagem dos logos 3D (three.js). E o `buildLogo` do pacote de logos 3D
 * da RF Group, portado para TypeScript, mais duas pecas que o pacote nao
 * tinha: a medalha das empresas (disco + relevo) e o icone do Atlas Ponto
 * (tile arredondado com a arte do app na face).
 *
 * Materiais sao compartilhados por cor (um so por tom na cena inteira) e
 * clareados quando a cor oficial e escura demais para o fundo navy do Hero.
 */

export interface OpcoesLogo {
  /** Altura final, em unidades da cena. */
  altura?: number
  /** Espessura da extrusao, proporcional a altura. */
  espessura?: number
  /** Quanto o icone (nivel 1) salta alem da face do corpo. */
  saltoIcone?: number
  chanfro?: number
}

export class FabricaMateriais {
  private cache = new Map<string, THREE.MeshStandardMaterial>()

  /** `fiel`: usa a cor exata, sem o clareamento para fundo escuro. */
  cor(hex: string, fiel = false) {
    const chave = fiel ? hex + '!' : hex
    let m = this.cache.get(chave)
    if (!m) {
      const c = fiel ? new THREE.Color(hex) : paraFundoEscuro(new THREE.Color(hex))
      m = new THREE.MeshStandardMaterial({
        color: c,
        emissive: c,
        // Tons claros (letras do logo do grupo) brilham um pouco mais: sem
        // isso o branco le como cinza na sombra da cena.
        emissiveIntensity: c.getHSL({ h: 0, s: 0, l: 0 }).l > 0.85 ? 0.42 : 0.16,
        roughness: 0.3,
        metalness: 0.18,
      })
      this.cache.set(chave, m)
    }
    return m
  }

  descartar() {
    this.cache.forEach((m) => m.dispose())
    this.cache.clear()
  }
}

/** Sobe a luminosidade de tons muito escuros (navy da marca) para nao sumirem no fundo. */
function paraFundoEscuro(c: THREE.Color) {
  const hsl = { h: 0, s: 0, l: 0 }
  c.getHSL(hsl)
  if (hsl.l < 0.4) c.setHSL(hsl.h, Math.min(1, hsl.s * 1.05), 0.4 + (hsl.l * 0.25))
  return c
}

function extrudar(formas: THREE.Shape[], profundidade: number, chanfro: number) {
  const geo = new THREE.ExtrudeGeometry(formas, {
    depth: profundidade,
    curveSegments: 8,
    steps: 1,
    bevelEnabled: chanfro > 0,
    bevelThickness: chanfro,
    bevelSize: chanfro * 0.6,
    bevelSegments: 2,
  })
  geo.computeVertexNormals()
  return geo
}

/** Logo extrudado a partir dos contornos vetoriais. Centralizado na origem. */
export function construirLogo(logo: Logo3D, mats: FabricaMateriais, opcoes: OpcoesLogo = {}) {
  const altura = opcoes.altura ?? 1
  const esp = (opcoes.espessura ?? 0.07) * altura
  const salto = opcoes.saltoIcone ?? 0.6
  const chanfro = (opcoes.chanfro ?? 0.006) * altura
  const s = altura / logo.altura
  const cx = logo.largura / 2
  const cy = logo.altura / 2
  const v = ([x, y]: readonly [number, number]) => new THREE.Vector2((x - cx) * s, (cy - y) * s)
  const forma = (c: Contorno, furos: readonly Contorno[]) => {
    const f = new THREE.Shape(c.map(v))
    f.holes = furos.map((h) => new THREE.Path(h.map(v)))
    return f
  }

  const grupo = new THREE.Group()
  for (const camada of logo.camadas) {
    const porNivel = new Map<number, THREE.Shape[]>()
    for (const f of camada.formas) {
      const lista = porNivel.get(f.nivel) ?? []
      lista.push(forma(f.contorno, f.furos))
      porNivel.set(f.nivel, lista)
    }
    porNivel.forEach((formas, nivel) => {
      const geo = extrudar(formas, esp * (1 + nivel * salto), chanfro)
      geo.translate(0, 0, -esp / 2)
      grupo.add(new THREE.Mesh(geo, mats.cor(camada.cor)))
    })
  }
  return grupo
}

/**
 * Medalha de empresa (Connect Valley, Academy, Feitosa Imoveis): o disco
 * vira uma moeda com borda chanfrada e cada camada do desenho sobe em
 * relevo sobre a face. `diametro` em unidades da cena.
 */
export function construirMedalha(marca: MarcaEmpresa, mats: FabricaMateriais, diametro: number) {
  const r = diametro / 2
  const esp = diametro * 0.1
  const grupo = new THREE.Group()

  const disco = new THREE.Shape()
  disco.absarc(0, 0, r, 0, Math.PI * 2, false)
  const geoDisco = extrudar([disco], esp, esp * 0.35)
  geoDisco.translate(0, 0, -esp / 2)
  grupo.add(new THREE.Mesh(geoDisco, mats.cor(marca.disco)))

  for (const camada of marca.camadas) {
    const formas = formasDoCaminho(camada.d, r)
    if (!formas.length) continue
    const geo = extrudar(formas, esp * 0.45, esp * 0.08)
    geo.translate(0, 0, esp / 2 + esp * 0.2)
    grupo.add(new THREE.Mesh(geo, mats.cor(camada.cor)))
  }
  return grupo
}

/**
 * Converte um `d` de SVG feito so de M/L/Z (o formato de marcas-empresas)
 * em Shapes. Subcaminho dentro de um numero impar de outros e furo do
 * menor que o contem — a mesma regra `evenodd` com que o SVG e pintado.
 */
function formasDoCaminho(d: string, escala: number) {
  const polis = d
    .split('M')
    .map((t) => t.replace(/[LZ]/g, ' ').trim())
    .filter(Boolean)
    .map((t) => {
      const n = t.split(/\s+/).map(Number)
      const pts: THREE.Vector2[] = []
      for (let i = 0; i + 1 < n.length; i += 2) pts.push(new THREE.Vector2(n[i] * escala, -n[i + 1] * escala))
      return pts
    })
    .filter((p) => p.length > 2)

  const dentro = (p: THREE.Vector2, poli: THREE.Vector2[]) => {
    let ok = false
    for (let i = 0, j = poli.length - 1; i < poli.length; j = i++) {
      const a = poli[i]
      const b = poli[j]
      if (a.y > p.y !== b.y > p.y && p.x < ((b.x - a.x) * (p.y - a.y)) / (b.y - a.y) + a.x) ok = !ok
    }
    return ok
  }
  const area = (poli: THREE.Vector2[]) => Math.abs(THREE.ShapeUtils.area(poli))

  const pais = polis.map((p, i) => polis.filter((q, j) => j !== i && dentro(p[0], q)))
  const formas = new Map<THREE.Vector2[], THREE.Shape>()
  polis.forEach((p, i) => {
    if (pais[i].length % 2 === 0) formas.set(p, new THREE.Shape(p))
  })
  polis.forEach((p, i) => {
    if (pais[i].length % 2 === 1) {
      const pai = pais[i].filter((q) => formas.has(q)).sort((a, b) => area(a) - area(b))[0]
      if (pai) formas.get(pai)!.holes.push(new THREE.Path(p))
    }
  })
  return [...formas.values()]
}

/**
 * Atlas Ponto: tile arredondado (o icone do PWA) com a arte do app na
 * face, e o nome extrudado ao lado — no mesmo alinhamento do PNG.
 * `texto` e o contorno de "PONTO" (recortado do wordmark a partir de x=270).
 */
export function construirPonto(texto: Logo3D, textura: THREE.Texture, mats: FabricaMateriais, altura: number) {
  const u = altura / 303 // px do wordmark -> cena
  const lado = 250 * u
  const esp = lado * 0.12
  const grupo = new THREE.Group()

  const tile = new THREE.Shape()
  const h = lado / 2
  const r = lado * 0.19
  tile.moveTo(-h + r, -h)
  tile.lineTo(h - r, -h)
  tile.quadraticCurveTo(h, -h, h, -h + r)
  tile.lineTo(h, h - r)
  tile.quadraticCurveTo(h, h, h - r, h)
  tile.lineTo(-h + r, h)
  tile.quadraticCurveTo(-h, h, -h, h - r)
  tile.lineTo(-h, -h + r)
  tile.quadraticCurveTo(-h, -h, -h + r, -h)
  const geoTile = extrudar([tile], esp, esp * 0.3)
  geoTile.translate(0, 0, -esp / 2)
  const corpo = new THREE.Mesh(geoTile, mats.cor('#1b2448'))

  const face = new THREE.Mesh(
    new THREE.PlaneGeometry(lado, lado),
    new THREE.MeshStandardMaterial({ map: textura, transparent: true, roughness: 0.45, metalness: 0.05 }),
  )
  face.position.z = esp / 2 + esp * 0.3 + 0.002

  const icone = new THREE.Group()
  icone.add(corpo, face)
  // No PNG o tile ocupa x 0..250 e y 50..300 (de 303).
  icone.position.set(125 * u, (151.5 - 175) * u, 0)
  grupo.add(icone)

  const nome = construirLogo(texto, mats, { altura })
  nome.position.x = (270 + texto.largura / 2) * u
  grupo.add(nome)

  const largura = (270 + texto.largura) * u
  grupo.children.forEach((c) => (c.position.x -= largura / 2))
  return grupo
}

/**
 * Logo do RFEITOSA GROUP em 3D, a partir do mesmo vetor oficial do
 * cabecalho (logo-grupo.ts). O simbolo de triangulos e o mais espesso; o
 * monograma "R" salta um pouco alem dele, e "EITOSA"/"GROUP" ficam em
 * relevo mais baixo. Sobre o navy do Hero, as letras usam a versao clara
 * da marca (a mesma do rodape) e os triangulos, as cores oficiais
 * avivadas. Atras de cada triangulo vai uma placa lavanda um pouco maior,
 * que forma um contorno claro: sem ela o triangulo azul se confunde com
 * o fundo navy.
 */
export function construirLogoGrupo(mats: FabricaMateriais, altura: number) {
  const [, , vw, vh] = LOGO_VIEWBOX.split(' ').map(Number)
  const s = altura / vh
  const esp = altura * 0.1
  const corTri: Record<string, string> = { '#1a2253': '#5d6fd8', '#5f0006': '#b01c30' }
  const pecas: { d: string; cor: string; prof: number; z: number }[] = [
    ...LOGO_TRI.map((t) => ({ d: t.d, cor: corTri[t.color.toLowerCase()] ?? '#9a9a9a', prof: esp, z: 0 })),
    { d: LOGO_MONO, cor: '#ffffff', prof: esp * 1.2, z: 0 },
    { d: LOGO_EITOSA, cor: '#ffffff', prof: esp * 0.7, z: 0 },
    { d: 'M258 103.5H455V105.5H258Z', cor: '#ffffff', prof: esp * 0.5, z: 0 },
    { d: LOGO_GROUP, cor: '#ffffff', prof: esp * 0.5, z: 0 },
  ]
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${LOGO_VIEWBOX}">${pecas
    .map((p) => `<path fill="#000" fill-rule="evenodd" d="${p.d}"/>`)
    .join('')}</svg>`
  const { paths } = new SVGLoader().parse(svg)

  const grupo = new THREE.Group()
  paths.forEach((caminho, i) => {
    const p = pecas[i]
    const formas = caminho.toShapes()
    if (!formas.length) return
    const geo = extrudar(formas, p.prof, altura * 0.006)
    // SVG tem y para baixo: espelha e centraliza.
    geo.scale(s, -s, 1)
    geo.translate((-vw / 2) * s, (vh / 2) * s, -esp / 2)
    grupo.add(new THREE.Mesh(geo, mats.cor(p.cor, true)))

    if (i < LOGO_TRI.length) {
      const placa = extrudar(formas, esp * 0.4, 0)
      placa.scale(s, -s, 1)
      placa.translate((-vw / 2) * s, (vh / 2) * s, 0)
      placa.computeBoundingBox()
      const c = placa.boundingBox!.getCenter(new THREE.Vector3())
      const tam = placa.boundingBox!.getSize(new THREE.Vector3())
      const borda = altura * 0.035
      placa.translate(-c.x, -c.y, 0)
      placa.scale(1 + (2 * borda) / tam.x, 1 + (2 * borda) / tam.y, 1)
      placa.translate(c.x, c.y, -esp / 2 - esp * 0.45)
      grupo.add(new THREE.Mesh(placa, mats.cor('#c9cdf0', true)))
    }
  })
  return grupo
}

/** Libera geometrias e texturas de uma arvore (materiais ficam com a fabrica). */
export function descartarArvore(raiz: THREE.Object3D) {
  raiz.traverse((o) => {
    if (o instanceof THREE.Mesh || o instanceof THREE.Line) {
      o.geometry.dispose()
      const m = o.material as THREE.Material & { map?: THREE.Texture | null }
      if (m.map) {
        m.map.dispose()
        m.dispose()
      }
    }
  })
}
