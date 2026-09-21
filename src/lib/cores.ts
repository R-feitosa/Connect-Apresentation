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
 */
export const COR_FAMILIA: Record<FamiliaModulo, string> = {
  comercial: '#E0A33E',
  juridico: '#7C8CF8',
  pessoas: '#4FC4A0',
  operacoes: '#5AA9E6',
  eventos: '#E07A9A',
}

export const ROTULO_FAMILIA: Record<FamiliaModulo, string> = {
  comercial: 'Comercial e financeiro',
  juridico: 'Jurídico e tributário',
  pessoas: 'Pessoas',
  operacoes: 'Operações',
  eventos: 'Eventos e educação',
}

/** Cor do nucleo. Dourado da marca — e o unico elemento que a usa. */
export const COR_HUB = '#D8B25F'
/** Cor do dado em movimento. Reservada a animacao de fluxo. */
export const COR_FLUXO = '#5FD4E8'
