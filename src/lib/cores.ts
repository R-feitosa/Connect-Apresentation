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
 * A primeira leva de tons escuros (calibrada so para bater contraste
 * AA sobre fundo claro) manteve o azul e o rosa quase saturados como no
 * tema escuro anterior — ao lado do navy/bordo institucional do resto
 * do site, aquilo lia como neon de dashboard, nao como identidade de
 * marca. Aqui cada tom foi dessaturado na mesma luminosidade (ainda
 * >=4.5:1 sobre --color-fundo): juridico e operacoes viram variacoes de
 * navy, eventos vira uma variacao de bordo — a familia de cores fica
 * uma extensao da paleta da marca, nao um arco-iris a parte.
 */
export const COR_FAMILIA: Record<FamiliaModulo, string> = {
  comercial: '#7E6528',
  juridico: '#4A5580',
  pessoas: '#3F7462',
  operacoes: '#3B6B82',
  eventos: '#8C4053',
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
