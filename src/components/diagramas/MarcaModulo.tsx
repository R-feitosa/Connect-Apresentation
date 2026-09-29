/**
 * O icone de "duas flechas" usado no manual de marca para cada app do
 * ecossistema (HUB, Atlas RH, Legal Ops, Atlas CRM, Atlas Juris, Connect
 * Valley...): duas flechas apontando uma para a outra, formando uma
 * ampulheta com um vao de diamante no meio — o mesmo traco do logo do
 * Connect, so recolorido por app.
 *
 * Reconstruido a partir do print do manual (nao ha arquivo vetorial
 * original disponivel aqui), entao a curvatura exata pode diferir um
 * pouco do original — a forma e a proporcao foram mantidas fieis.
 */
export function MarcaModulo({ cor }: { cor: string }) {
  return (
    <g stroke={cor} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" fill="none">
      <path d="M -2.7 -4.3 L 1.9 0 L -2.7 4.3" />
      <path d="M 2.7 -4.3 L -1.9 0 L 2.7 4.3" />
    </g>
  )
}
