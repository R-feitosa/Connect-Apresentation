/**
 * Grade de fundo.
 *
 * Um plano cartesiano quase invisivel atras do hero. Serve a dois fins:
 * da a textura "tecnica" sem recorrer a imagem, e cria profundidade para
 * o diagrama flutuar sobre algo. A mascara radial apaga as bordas para a
 * grade nao encostar no texto.
 */
export function GradeFundo() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <svg className="h-full w-full opacity-[0.55]">
        <defs>
          <pattern id="grade" width="48" height="48" patternUnits="userSpaceOnUse">
            <path
              d="M 48 0 L 0 0 0 48"
              fill="none"
              stroke="#1C2740"
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
