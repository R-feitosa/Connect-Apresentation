/** Junta classes ignorando falsy. Evita template strings com buracos. */
export function cn(...partes: Array<string | false | null | undefined>): string {
  return partes.filter(Boolean).join(' ')
}
