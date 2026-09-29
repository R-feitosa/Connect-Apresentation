import * as THREE from 'three'
import { LOGOS_3D } from './dados'
import { FabricaMateriais, construirLogo, construirMedalha, construirPonto, descartarArvore } from './construir'
import { MARCAS_EMPRESAS } from '@/content/marcas-empresas'

/**
 * A cena do palco do Hero: o HUB em 3D no centro e os sistemas em duas
 * orbitas inclinadas, em sentidos opostos, como um atomo. Os logos ficam
 * sempre de frente para a camera, balancando o suficiente para mostrar a
 * espessura; o que passa por tras do HUB e escondido por ele de verdade.
 *
 * Feita para a TV do estande (PC fraco, ligada o dia todo):
 *  - um renderer so, DPR limitado a 1.5, sem sombras nem pos-processamento;
 *  - geometria montada uma vez; por quadro so mudam transformacoes;
 *  - para quando sai da tela, quando a aba some e quando o modo estande
 *    cobre a pagina (so a copia de dentro do slide anima);
 *  - com movimento reduzido, desenha um quadro parado.
 */

const INTERNA = ['crm', 'rh', 'legal_ops', 'rf_ops', 'cash']
const EXTERNA = ['consult', 'valley', 'ponto', 'tributario', 'academy', 'imoveis']
const ALTURA_ITEM = 0.46
const DIAMETRO_MEDALHA = 0.62

export interface OpcoesPalco {
  texturaPonto: string
  aoFicarPronto: () => void
}

export function montarPalco(host: HTMLElement, canvas: HTMLCanvasElement, opcoes: OpcoesPalco) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'low-power' })
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5))
  renderer.setClearColor(0x000000, 0)

  const cena = new THREE.Scene()
  cena.fog = new THREE.Fog(0x141a45, 13, 26)
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 60)
  camera.position.set(0, 0.6, 14.2)
  camera.lookAt(0, 0, 0)

  cena.add(new THREE.HemisphereLight(0xffffff, 0x2a2f66, 1.5))
  const chave = new THREE.DirectionalLight(0xffffff, 2.4)
  chave.position.set(3, 4, 8)
  const contra = new THREE.DirectionalLight(0xc9cdf0, 1.6)
  contra.position.set(-5, 2, -4)
  const baixo = new THREE.DirectionalLight(0xe5a0a6, 0.5)
  baixo.position.set(0, -6, 3)
  cena.add(chave, contra, baixo)

  const mats = new FabricaMateriais()
  const tudo = new THREE.Group()
  cena.add(tudo)

  // Nucleo
  const hub = construirLogo(LOGOS_3D.hub, mats, { altura: 1.25, espessura: 0.09 })
  tudo.add(hub)

  // Orbitas
  const texturaPonto = new THREE.TextureLoader().load(opcoes.texturaPonto, () => desenharUmaVez())
  texturaPonto.colorSpace = THREE.SRGBColorSpace
  texturaPonto.anisotropy = 4

  const item = (codigo: string): THREE.Object3D => {
    if (codigo === 'ponto') return construirPonto(LOGOS_3D.ponto_texto, texturaPonto, mats, ALTURA_ITEM)
    if (codigo in MARCAS_EMPRESAS) {
      return construirMedalha(MARCAS_EMPRESAS[codigo as keyof typeof MARCAS_EMPRESAS], mats, DIAMETRO_MEDALHA)
    }
    return construirLogo(LOGOS_3D[codigo], mats, { altura: ALTURA_ITEM })
  }

  const matTrilho = new THREE.LineBasicMaterial({ color: 0xc9cdf0, transparent: true, opacity: 0.22, fog: true })
  const orbitas = [
    criarOrbita(INTERNA, 1.95, 0.46, -0.3, 1, 70),
    criarOrbita(EXTERNA, 3.05, 0.36, 0.22, -1, 95),
  ]

  function criarOrbita(codigos: string[], raio: number, tiltX: number, tiltZ: number, sentido: number, segundos: number) {
    const inclinacao = new THREE.Group()
    inclinacao.rotation.set(tiltX, 0, tiltZ)
    const giro = new THREE.Group()
    inclinacao.add(giro)

    const pts = Array.from({ length: 129 }, (_, i) => {
      const a = (i / 128) * Math.PI * 2
      return new THREE.Vector3(Math.cos(a) * raio, 0, Math.sin(a) * raio)
    })
    inclinacao.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), matTrilho))

    const itens = codigos.map((c, i) => {
      const obj = item(c)
      const a = (i / codigos.length) * Math.PI * 2 + (sentido < 0 ? 0.5 : 0)
      obj.position.set(Math.cos(a) * raio, 0, Math.sin(a) * raio)
      giro.add(obj)
      return { obj, fase: i * 1.7 }
    })
    tudo.add(inclinacao)
    return { inclinacao, giro, itens, velocidade: (sentido * Math.PI * 2) / segundos }
  }

  // Estado de animacao
  const reduzir = matchMedia('(prefers-reduced-motion: reduce)').matches
  const noSlide = host.closest('[data-estande]') !== null
  let visivel = false
  let raf = 0
  let t0 = performance.now()
  let tempo = 0
  let ritmo = 1
  let ritmoAlvo = 1
  const alvo = { x: 0, y: 0 }
  const q = new THREE.Quaternion()
  const balanco = new THREE.Quaternion()
  const eixoY = new THREE.Vector3(0, 1, 0)
  let pronto = false

  function posicionar(seg: number) {
    hub.rotation.y = Math.sin(seg / 2.2) * 0.45
    hub.position.y = Math.sin(seg / 1.6) * 0.04
    tudo.rotation.y += (alvo.x * 0.28 - tudo.rotation.y) * 0.05
    tudo.rotation.x += (alvo.y * 0.16 - tudo.rotation.x) * 0.05
    for (const o of orbitas) {
      o.giro.rotation.y = seg * o.velocidade
      // Cada item desfaz a rotacao dos pais (fica de frente) e ganha um
      // balanco proprio, para a espessura aparecer.
      o.giro.updateWorldMatrix(true, false)
      o.giro.getWorldQuaternion(q).invert()
      for (const { obj, fase } of o.itens) {
        balanco.setFromAxisAngle(eixoY, Math.sin(seg / 2.4 + fase) * 0.4)
        obj.quaternion.copy(q).multiply(balanco)
      }
    }
  }

  function desenhar() {
    renderer.render(cena, camera)
    if (!pronto) {
      pronto = true
      opcoes.aoFicarPronto()
    }
  }

  function desenharUmaVez() {
    posicionar(tempo)
    desenhar()
  }

  function quadro(agora: number) {
    raf = 0
    if (!visivel || document.hidden) return
    const dt = Math.min(0.05, (agora - t0) / 1000)
    t0 = agora
    if (!noSlide && document.body.classList.contains('estande')) {
      raf = requestAnimationFrame(quadro)
      return
    }
    ritmo += (ritmoAlvo - ritmo) * 0.06
    tempo += dt * ritmo
    posicionar(tempo)
    desenhar()
    raf = requestAnimationFrame(quadro)
  }

  function iniciar() {
    if (reduzir) return desenharUmaVez()
    if (!raf) {
      t0 = performance.now()
      raf = requestAnimationFrame(quadro)
    }
  }

  function medir() {
    const { width, height } = host.getBoundingClientRect()
    if (!width || !height) return
    renderer.setSize(width, height, false)
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    desenharUmaVez()
  }

  const ro = new ResizeObserver(medir)
  ro.observe(host)
  const io = new IntersectionObserver(([e]) => {
    visivel = e.isIntersecting
    if (visivel) iniciar()
  })
  io.observe(host)

  const aoMover = (e: PointerEvent) => {
    const r = host.getBoundingClientRect()
    alvo.x = ((e.clientX - r.left) / r.width - 0.5) * 2
    alvo.y = ((e.clientY - r.top) / r.height - 0.5) * 2
  }
  const aoEntrar = () => (ritmoAlvo = 0.25)
  const aoSair = () => {
    ritmoAlvo = 1
    alvo.x = 0
    alvo.y = 0
  }
  const aoVoltar = () => {
    if (!document.hidden && visivel) iniciar()
  }
  if (!reduzir) {
    host.addEventListener('pointermove', aoMover)
    host.addEventListener('pointerenter', aoEntrar)
    host.addEventListener('pointerleave', aoSair)
  }
  document.addEventListener('visibilitychange', aoVoltar)

  medir()

  return () => {
    cancelAnimationFrame(raf)
    ro.disconnect()
    io.disconnect()
    host.removeEventListener('pointermove', aoMover)
    host.removeEventListener('pointerenter', aoEntrar)
    host.removeEventListener('pointerleave', aoSair)
    document.removeEventListener('visibilitychange', aoVoltar)
    descartarArvore(cena)
    matTrilho.dispose()
    mats.descartar()
    renderer.dispose()
  }
}
