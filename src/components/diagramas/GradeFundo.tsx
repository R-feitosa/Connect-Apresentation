/**
 * Grade de fundo.
 *
 * Um plano cartesiano quase invisivel atras do hero. Serve a dois fins:
 * da a textura "tecnica" sem recorrer a imagem, e cria profundidade para
 * o diagrama flutuar sobre algo. A mascara radial apaga as bordas para a
 * grade nao encostar no texto.
 *
 * Em fundo escuro a grade usava um traco quase-branco em baixa opacidade;
 * sobre o fundo claro atual isso ficaria invisivel (ou estourado se
 * virasse branco puro), entao o traco e um cinza-escuro (borda-forte) e a
 * opacidade geral do SVG cai bastante — um traco escuro "pesa" mais na
 * leitura do que um traco claro pesava sobre o fundo escuro anterior.
 */
export function GradeFundo() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <svg className="h-full w-full opacity-[0.35]">
        <defs>
          <pattern id="grade" width="48" height="48" patternUnits="userSpaceOnUse">
            <path
              d="M 48 0 L 0 0 0 48"
              fill="none"
              style={{ stroke: 'var(--color-borda-forte)' }}
              strokeWidth="1"
            />
          </pattern>
          <radialGradient id="mascara-grade" cx="50%" cy="38%" r="62%">
            <stop offset="0%" stopColor="white" stopOpacity="0.85" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="aplicar-mascara">
            <rect width="100%" height="100%" fill="url(#mascara-grade)" />
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="url(#grade)" mask="url(#aplicar-mascara)" />
      </svg>
    </div>
  )
}
