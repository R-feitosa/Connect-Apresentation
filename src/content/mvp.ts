import type { PassoMvp } from '@/types/ecossistema'

/**
 * A esteira de um MVP novo. `reaproveita` separa o que ja vem pronto do
 * que ainda e trabalho de verdade — o argumento de escala numa olhada.
 */
export const PASSOS_MVP: readonly PassoMvp[] = [
  { titulo: 'Ideia', detalhe: 'Produto, área ou demanda nova.', reaproveita: false },
  { titulo: 'Consulta o HUB', detalhe: 'Vê o que já existe antes de modelar.', reaproveita: true },
  { titulo: 'Reaproveita', detalhe: 'Pessoas, papéis e acessos prontos.', reaproveita: true },
  { titulo: 'Cria o específico', detalhe: 'Só as tabelas da própria regra.', reaproveita: false },
  { titulo: 'Já nasce integrado', detalhe: 'Login único e visão compartilhada.', reaproveita: true },
]
