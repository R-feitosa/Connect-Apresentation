import type { FamiliaModulo } from '@/types/ecossistema'

/**
 * Cor por familia de modulo.
 *
 * Familia, e nao um tom por modulo: onze cores distintas viram arco-iris
 * e param de significar. Agrupar por area faz a cor CARREGAR informacao —
 * bate o olho e ve que Juris, Consult, Tributario e Legal Ops sao o mesmo
 * bloco.
 *
 * Os valores vivem aqui e nao no Tailwind porque tambem alimentam
 * atributos de SVG (stroke, fill), que nao aceitam classe utilitaria.
 *
 * Escurecidas em relacao a paleta original (calibrada para fundo
 * escuro): sobre o fundo claro atual, cada uma mantem contraste AA
 * (>=4.5:1) quando usada como texto/traço.
 */
export const COR_FAMILIA: Record<FamiliaModulo, string> = {
  comercial: '#966618',
  juridico: '#475DF5',
  pessoas: '#2A7E64',
  operacoes: '#1B72B4',
  eventos: '#CE3062',
}

export const ROTULO_FAMILIA: Record<FamiliaModulo, string> = {
  comercial: 'Comercial e financeiro',
  juridico: 'Jurídico e tributário',
  pessoas: 'Pessoas',
  operacoes: 'Operações',
  eventos: 'Eventos e educação',
}

/** Cor do nucleo. Navy da marca — e o unico elemento que a usa. */
export const COR_HUB = '#212965'
/** Cor do dado em movimento. Bordo da marca, reservada a animacao de fluxo. */
export const COR_FLUXO = '#6D0001'
