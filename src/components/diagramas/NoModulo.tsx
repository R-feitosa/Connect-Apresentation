'use client'

import type { Modulo } from '@/types/ecossistema'
import type { PosicaoNo } from '@/lib/geometria'
import { COR_FAMILIA } from '@/lib/cores'
import { VISUAL_SISTEMA } from '@/content/sistemas'
import { MARCAS_EMPRESAS } from '@/content/marcas-empresas'

/**
 * Um modulo no anel.
 *
 * E um `<g>` focavel, nao um circulo decorativo: quem navega por teclado
 * percorre os modulos na mesma ordem em que eles aparecem, e o foco
 * dispara a mesma revelacao que o mouse. Sem isso o diagrama seria
 * informacao acessivel so para quem usa mouse.
 *
 * O rotulo sai do lado de FORA do anel (`x` empurrado para longe do
 * centro conforme o sinal da posicao), para o texto nunca cair sobre as
 * conexoes.
 */
export function NoModulo({
  modulo,
  posicao,
  ativo,
  atenuado,
  aoFocar,
  aoSair,
}: {
  modulo: Modulo
  posicao: PosicaoNo
  ativo: boolean
  atenuado: boolean
  aoFocar: () => void
  aoSair: () => void
}) {
  const cor = COR_FAMILIA[modulo.familia]
  const ladoDireito = posicao.x > 1
  const noEixo = Math.abs(posicao.x) <= 1
  const deslocamentoRotulo = noEixo ? 0 : ladoDireito ? 13.5 : -13.5
  const ancora = noEixo ? 'middle' : ladoDireito ? 'start' : 'end'
  const deslocamentoY = noEixo ? (posicao.y < 0 ? -14.5 : 16.5) : 1.2

  return (
    <g
      role="button"
      tabIndex={0}
      aria-label={`${modulo.nome}: ${modulo.resumo}`}
      transform={`translate(${posicao.x} ${posicao.y})`}
      onMouseEnter={aoFocar}
      onMouseLeave={aoSair}
      onFocus={aoFocar}
      onBlur={aoSair}
      className="cursor-pointer outline-none"
      style={{ opacity: atenuado ? 0.25 : 1, transition: 'opacity 300ms' }}
    >
      {/* Area de acerto invisivel e generosa. Sem ela o alvo e o circulo
          de 9.5px: preciso demais no mouse e quase impossivel no toque.
          `fill="transparent"` participa do hit-test; `fill="none"` nao. */}
      <circle r={14} fill="transparent" />
      {ativo && <circle r={13.5} fill={cor} opacity={0.14} pointerEvents="none" />}
      <circle
        r={9.5}
        stroke={cor}
        strokeWidth={ativo ? 1.4 : 0.8}
        strokeOpacity={ativo ? 1 : 0.6}
        pointerEvents="none"
        style={{ fill: 'var(--color-superficie)', transition: 'stroke-width 250ms, stroke-opacity 250ms' }}
      />
      <MarcaNo codigo={modulo.codigo} sigla={modulo.sigla} cor={cor} />
      <text
        x={deslocamentoRotulo}
        y={deslocamentoY}
        textAnchor={ancora}
        fontSize={4}
        pointerEvents="none"
        style={{
          fill: ativo ? 'var(--color-texto)' : 'var(--color-texto-suave)',
          transition: 'fill 250ms',
        }}
      >
        {modulo.nome}
      </text>
    </g>
  )
}

/**
 * O simbolo do sistema dentro do no: o anel com o icone (apps), o icone
 * do app (Ponto) ou a medalha da empresa. A sigla so aparece se faltar
 * identidade visual para o codigo.
 */
function MarcaNo({ codigo, sigla, cor }: { codigo: string; sigla: string; cor: string }) {
  const v = VISUAL_SISTEMA[codigo]
  if (v?.marca) {
    if (codigo === 'ponto') {
      // Icone quadrado de app: ampliado e recortado no circulo, para o
      // fundo navy do proprio icone preencher o no inteiro.
      const l = 20
      return (
        <g pointerEvents="none">
          <clipPath id={`clip-no-${codigo}`}>
            <circle r={9.1} />
          </clipPath>
          <circle r={9.1} fill="#121a30" />
          <image href={v.marca.src} x={-l / 2} y={-l / 2} width={l} height={l} clipPath={`url(#clip-no-${codigo})`} />
        </g>
      )
    }
    const l = 13.2
    return <image href={v.marca.src} x={-l / 2} y={-l / 2 + 1.1} width={l} height={l} pointerEvents="none" />
  }
  if (v?.empresa) {
    const m = MARCAS_EMPRESAS[v.empresa]
    return (
      <g transform="scale(8.4)" pointerEvents="none">
        <circle r="1" fill={m.disco} />
        {m.camadas.map((c, i) => (
          <path key={i} d={c.d} fill={c.cor} />
        ))}
      </g>
    )
  }
  return (
    <text textAnchor="middle" y={2} fill={cor} fontSize={4.2} fontWeight={600} letterSpacing="0.04em" pointerEvents="none">
      {sigla}
    </text>
  )
}
