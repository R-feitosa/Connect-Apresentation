import type { Beneficio } from '@/types/ecossistema'

export const BENEFICIOS: readonly Beneficio[] = [
  {
    titulo: 'Sem duplicidade',
    descricao:
      'O documento normalizado é a chave. Duas grafias do mesmo CNPJ deixam de virar dois clientes.',
    icone: 'deduplicacao',
  },
  {
    titulo: 'Consistência',
    descricao:
      'Nome, contato e endereço têm um lugar só. Corrigir uma vez corrige em toda parte.',
    icone: 'consistencia',
  },
  {
    titulo: 'Áreas conectadas',
    descricao:
      'Comercial, jurídico, RH e financeiro enxergam a mesma pessoa, cada um pela sua lente.',
    icone: 'integracao',
  },
  {
    titulo: 'Módulo novo em dias',
    descricao:
      'Quem entra depois reaproveita identidade, papéis e acessos. Só escreve a própria regra.',
    icone: 'extensibilidade',
  },
  {
    titulo: 'Governança',
    descricao:
      'Escrita por função, acesso por cargo e rastro de quem criou cada registro.',
    icone: 'governanca',
  },
  {
    titulo: 'Escala',
    descricao:
      'O custo de somar um sistema deixa de crescer com o número de sistemas que já existem.',
    icone: 'escala',
  },
]
