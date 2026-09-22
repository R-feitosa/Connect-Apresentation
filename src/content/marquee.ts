/**
 * Frases das duas faixas corridas da pagina.
 *
 * Ficam aqui (e nao soltas dentro de `Hero.tsx`/`page.tsx`) porque o
 * modo estande (`ModoEstande.tsx`) precisa da mesma frase de
 * fechamento pra remontar o ultimo slide — sem um lugar comum, as duas
 * listas iam divergir na primeira mudanca de texto.
 */
export const FRASES_MARQUEE_HERO = [
  'Sistemas isolados',
  'Dados fragmentados',
  'Um ecossistema',
  'Uma única fonte de verdade',
]

export const FRASES_MARQUEE_ENCERRAMENTO = [
  'Um ecossistema',
  'Uma base',
  'Novas possibilidades',
]
