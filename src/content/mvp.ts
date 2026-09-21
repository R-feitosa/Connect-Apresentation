import type { PassoMvp } from '@/types/ecossistema'

/**
 * A esteira de um MVP novo.
 *
 * `reaproveita` separa visualmente o que o time NAO precisa mais
 * construir do unico passo que ainda e trabalho de verdade. E o
 * argumento de escalabilidade em uma olhada.
 */
export const PASSOS_MVP: readonly PassoMvp[] = [
  {
    titulo: 'Ideia de MVP',
    detalhe: 'Um produto novo, uma área nova, uma demanda de cliente.',
    reaproveita: false,
  },
  {
    titulo: 'Consulta o HUB',
    detalhe: 'Pergunta o que já existe antes de modelar qualquer coisa.',
    reaproveita: true,
  },
  {
    titulo: 'Reaproveita o mestre',
    detalhe: 'Pessoas, empresas, papéis, grupos, acessos e cargos já estão prontos.',
    reaproveita: true,
  },
  {
    titulo: 'Cria só o específico',
    detalhe: 'Escreve apenas as tabelas da própria regra de negócio.',
    reaproveita: false,
  },
  {
    titulo: 'Entra no ecossistema',
    detalhe: 'Nasce já integrado, com login único e visão compartilhada.',
    reaproveita: true,
  },
]
