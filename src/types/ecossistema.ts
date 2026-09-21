/**
 * Tipos do ecossistema.
 *
 * Tudo o que a pagina desenha sai daqui. Um modulo novo, um fluxo novo ou
 * uma entidade nova do HUB entram em `content/` sem que nenhum componente
 * precise mudar — e o compilador cobra o que faltar.
 */

/** Familia visual do modulo. Decide a cor e a posicao no anel. */
export type FamiliaModulo =
  | 'comercial'
  | 'juridico'
  | 'pessoas'
  | 'operacoes'
  | 'eventos'

/** O que um modulo CONSOME do HUB e o que ele guarda de proprio. */
export interface Modulo {
  readonly codigo: string
  readonly nome: string
  readonly sigla: string
  readonly familia: FamiliaModulo
  /** Uma linha: o que o modulo faz. */
  readonly resumo: string
  /** Entidades mestres que ele LE do HUB (codigos de EntidadeMestre). */
  readonly consome: readonly string[]
  /** Dados da regra de negocio propria — o que so existe nele. */
  readonly proprio: readonly string[]
  /** Pessoas com acesso concedido hoje. Numero real, nao enfeite. */
  readonly usuarios?: number
}

/** Um dado mestre que vive no HUB e nao se duplica em lugar nenhum. */
export interface EntidadeMestre {
  readonly codigo: string
  readonly nome: string
  readonly descricao: string
  /** Tabela real no banco integrado — ancora a promessa em algo concreto. */
  readonly tabela: string
}

/** Um passo do fluxo de cadastro. */
export interface PassoFluxo {
  readonly titulo: string
  readonly detalhe: string
}

/** Um caminho completo: quem chega, e onde o cadastro vai parar. */
export interface FluxoCadastro {
  readonly codigo: string
  readonly rotulo: string
  readonly papel: string
  readonly passos: readonly PassoFluxo[]
  /** Codigos de modulo que passam a enxergar o cadastro. */
  readonly destinos: readonly string[]
}

export interface Beneficio {
  readonly titulo: string
  readonly descricao: string
  readonly icone: IconeBeneficio
}

export type IconeBeneficio =
  | 'deduplicacao'
  | 'consistencia'
  | 'integracao'
  | 'extensibilidade'
  | 'governanca'
  | 'escala'

/** Um par de linhas da comparacao antes x depois. */
export interface ParComparativo {
  readonly antes: string
  readonly depois: string
}

/** Um passo da esteira de um MVP novo. */
export interface PassoMvp {
  readonly titulo: string
  readonly detalhe: string
  /** true quando o passo REAPROVEITA em vez de criar. */
  readonly reaproveita: boolean
}
