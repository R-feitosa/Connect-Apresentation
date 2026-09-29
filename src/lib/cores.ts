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

/**
 * Cor de identidade de cada app — nao a da familia (essa agrupa; esta
 * distingue). O manual de marca da um icone proprio para cada app do
 * ecossistema (a mesma marca de "duas flechas", recolorida por app); as
 * quatro primeiras aqui saem direto do manual (Atlas RH, Legal Ops, Atlas
 * CRM, Atlas Juris — que usa o proprio bordo da marca). Os sete apps sem
 * icone no manual (`rf_ops`, `consult`, `valley`, `tributario`, `cash`,
 * `academy`, `imoveis`) ganharam uma cor nova seguindo o mesmo padrao:
 * uma cor propria, nao repetida, que nao precisa bater contraste AA
 * (e so a cor de um traco pequeno dentro de um circulo claro, nunca
 * texto corrido).
 */
export const COR_MODULO: Record<string, string> = {
  // Do manual de marca
  rh: '#7C5CD1',
  legal_ops: '#F2916A',
  crm: '#4FAE63',
  juris: '#6D0001',
  // Novos, no mesmo padrao
  rf_ops: '#2AA9A0',
  consult: '#4A5FBF',
  valley: '#D4A62A',
  tributario: '#8B5E2B',
  cash: '#2E9B6B',
  academy: '#E08E3D',
  imoveis: '#3B6FA0',
}
