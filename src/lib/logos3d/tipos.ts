/** Um contorno fechado: pontos [x, y] em px, y para baixo. */
export type Contorno = readonly (readonly [number, number])[]

export interface Forma3D {
  /** 0 = corpo do logo; 1 = icone dentro do anel (salta alem da face). */
  readonly nivel: number
  readonly contorno: Contorno
  readonly furos: readonly Contorno[]
}

/** Logo vetorial pronto para extrusao: uma camada por cor. */
export interface Logo3D {
  readonly nome: string
  readonly largura: number
  readonly altura: number
  readonly camadas: readonly { readonly cor: string; readonly formas: readonly Forma3D[] }[]
}
