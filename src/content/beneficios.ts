import type { Beneficio } from '@/types/ecossistema'

export const BENEFICIOS: readonly Beneficio[] = [
  { titulo: 'Sem duplicidade', descricao: 'CPF e CNPJ normalizados barram a ficha repetida.', icone: 'deduplicacao' },
  { titulo: 'Consistência', descricao: 'Corrigiu uma vez, corrigiu em toda parte.', icone: 'consistencia' },
  { titulo: 'Áreas conectadas', descricao: 'Cada área vê a mesma pessoa pela sua lente.', icone: 'integracao' },
  { titulo: 'Módulo novo em dias', descricao: 'Identidade, papéis e acessos já prontos.', icone: 'extensibilidade' },
  { titulo: 'Governança', descricao: 'Acesso por cargo e rastro de cada registro.', icone: 'governanca' },
  { titulo: 'Escala', descricao: 'Somar um sistema não custa mais que o anterior.', icone: 'escala' },
]
