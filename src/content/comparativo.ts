import type { ParComparativo } from '@/types/ecossistema'

/**
 * As dores do "antes", cada uma com a resposta do Atlas.
 * Curtas de proposito: sao lidas numa TV, a alguns metros.
 */
export const COMPARATIVO: readonly ParComparativo[] = [
  {
    titulo: 'Cadastros duplicados',
    antes: 'O mesmo cliente, de um jeito em cada sistema.',
    depois: 'Uma identidade única em todo o ecossistema.',
  },
  {
    titulo: 'Números divergentes',
    antes: 'Comercial, jurídico e financeiro sem bater.',
    depois: 'Todas as áreas leem a mesma origem.',
  },
  {
    titulo: 'Retrabalho manual',
    antes: 'Dado copiado e conferido à mão.',
    depois: 'Atualiza uma vez, vale para todos.',
  },
  {
    titulo: 'Recomeço a cada projeto',
    antes: 'Todo sistema novo remodelava do zero.',
    depois: 'Módulo novo nasce sobre o que já existe.',
  },
]
