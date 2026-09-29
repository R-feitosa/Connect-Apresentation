import { MODULOS } from './ecossistema'

/**
 * Frases das duas faixas corridas. Num lugar so porque o modo estande
 * (`ModoEstande.tsx`) remonta a faixa de fechamento no ultimo slide.
 */

/** A faixa do Hero lista os proprios sistemas — o que o Atlas conecta. */
export const FRASES_MARQUEE_HERO = ['Atlas HUB', ...MODULOS.map((m) => m.nome)]

export const FRASES_MARQUEE_ENCERRAMENTO = [
  'Um ecossistema',
  'Uma base',
  'Uma fonte de verdade',
  'Novas possibilidades',
]
