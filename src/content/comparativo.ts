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
    antes: 'Cada sistema com seu próprio cadastro de clientes',
    depois: 'Um cadastro único, lido por todos',
  },
  {
    antes: 'A mesma empresa em três bases, com três grafias',
    depois: 'Documento normalizado recusa a duplicata na hora',
  },
  {
    antes: 'Integração feita à mão, planilha a planilha',
    depois: 'Os módulos leem a mesma fonte, sem exportação',
  },
  {
    antes: 'Números que não fecham entre as áreas',
    depois: 'Um número só, com a mesma origem para todo mundo',
  },
  {
    antes: 'Mudou o telefone: atualizar em cada sistema',
    depois: 'Atualiza no HUB e vale em todos',
  },
  {
    antes: 'Sistema novo começa do zero, recriando tudo',
    depois: 'Sistema novo nasce lendo o que já existe',
  },
]
