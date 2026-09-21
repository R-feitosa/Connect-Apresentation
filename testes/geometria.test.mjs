/**
 * Testes da geometria do diagrama.
 *
 * E a unica parte do desenho com resposta certa ou errada, e por isso
 * mora num modulo puro. Sem isto, um erro de sinal no seno so apareceria
 * como "o diagrama ficou torto" — que ninguem consegue depurar olhando.
 *
 * Roda sem dependencia nenhuma: node --test.
 */
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { distribuirEmElipse, caminhoParaNo, distanciaDoCentro } from '../src/lib/geometria.ts'

test('o primeiro no fica no TOPO, nao a direita', () => {
  // Trigonometria comeca em 0 graus = leste. Se alguem tirar o -90, o
  // diagrama gira 90 graus e o rotulo do topo passa a colidir com o
  // painel lateral. O sintoma seria estetico; a causa, aritmetica.
  const [primeiro] = distribuirEmElipse(4, 100, 100)
  assert.ok(Math.abs(primeiro.x) < 1e-9, `x deveria ser ~0, veio ${primeiro.x}`)
  assert.ok(primeiro.y < 0, 'y negativo e para cima no SVG')
})

test('distribui em volta inteira, sem sobrepor', () => {
  const nos = distribuirEmElipse(12, 80, 60)
  assert.equal(nos.length, 12)
  const angulos = nos.map((n) => n.angulo)
  assert.deepEqual(angulos, [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330])
  assert.equal(new Set(angulos).size, 12, 'nenhum angulo repetido')
})

test('respeita os dois raios da elipse', () => {
  const nos = distribuirEmElipse(4, 90, 50)
  const topo = nos[0]
  const direita = nos[1]
  assert.ok(Math.abs(Math.abs(topo.y) - 50) < 1e-9, 'topo usa o raio Y')
  assert.ok(Math.abs(Math.abs(direita.x) - 90) < 1e-9, 'lateral usa o raio X')
})

test('quantidade zero ou negativa devolve lista vazia', () => {
  // A pagina renderiza a partir de um array de conteudo; se ele vier
  // vazio o diagrama some, mas nao pode estourar.
  assert.deepEqual(distribuirEmElipse(0, 10, 10), [])
  assert.deepEqual(distribuirEmElipse(-3, 10, 10), [])
})

test('o caminho sai do centro e termina no no', () => {
  const d = caminhoParaNo({ x: 60, y: -40 })
  assert.ok(d.startsWith('M 0 0 Q'), `deveria comecar no centro: ${d}`)
  assert.ok(d.endsWith('60.00 -40.00'), `deveria terminar no no: ${d}`)
})

test('a curva desvia do segmento reto, senao vira estrela', () => {
  // Com curvatura 0 o ponto de controle cai no meio exato e o caminho
  // e uma reta. O desvio e o que impede onze linhas retas saindo do
  // mesmo ponto — que e o visual que a curvatura existe para evitar.
  const destino = { x: 100, y: 0 }
  const curvo = caminhoParaNo(destino)
  const reto = caminhoParaNo(destino, 0)
  assert.notEqual(curvo, reto)
  assert.ok(reto.includes('Q 50.00 0.00'), `sem curvatura o controle e o meio: ${reto}`)
})

test('distanciaDoCentro e euclidiana', () => {
  assert.equal(distanciaDoCentro({ x: 3, y: 4 }), 5)
  assert.equal(distanciaDoCentro({ x: 0, y: 0 }), 0)
})
