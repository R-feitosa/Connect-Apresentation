import type { ParComparativo } from '@/types/ecossistema'

/**
 * Antes x depois, em pares.
 *
 * Pares, e nao duas listas soltas: cada linha da direita responde a linha
 * da esquerda. Duas listas independentes deixam o leitor procurando a
 * correspondencia sozinho.
 */
export const COMPARATIVO: readonly ParComparativo[] = [
  {
    antes: 'Cada operação mantinha seu próprio cadastro e processo',
    depois: 'Toda aplicação lê a mesma fonte e compartilha a mesma realidade',
  },
  {
    antes: 'O mesmo cliente aparecia de forma diferente em cada sistema',
    depois: 'A identidade é única e reconhecida em todo o ecossistema',
  },
  {
    antes: 'Informações eram copiadas e reconcilhadas à mão',
    depois: 'O dado circula sem duplicação nem retrabalho manual',
  },
  {
    antes: 'Dados divergiam entre comercial, jurídico e financeiro',
    depois: 'As áreas chegam ao mesmo número e à mesma origem',
  },
  {
    antes: 'Uma mudança exigia atualizar vários ambientes',
    depois: 'Atualiza uma vez e todas as soluções enxergam a mesma versão',
  },
  {
    antes: 'Um novo sistema começava do zero, recriando regras',
    depois: 'Novo módulo nasce sobre o ecossistema que já existe',
  },
]
