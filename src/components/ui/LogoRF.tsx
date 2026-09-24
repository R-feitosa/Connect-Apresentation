/**
 * Marca do grupo: a ampulheta de 4 triangulos do manual de marca oficial,
 * nas 3 cores do logo (navy, bordo, cinza — a quarta face repete o navy
 * em tom mais claro para dar profundidade sem inventar uma quarta cor).
 */
export function LogoRF({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <polygon points="50,8 18,50 50,50" fill="var(--color-hub)" />
      <polygon points="50,8 82,50 50,50" fill="var(--color-fluxo)" />
      <polygon points="50,92 18,50 50,50" fill="var(--color-texto-fraco)" />
      <polygon points="50,92 82,50 50,50" fill="var(--color-hub-suave)" />
    </svg>
  )
}
