import type { EntidadeMestre, Modulo } from '@/types/ecossistema'

/**
 * As entidades mestres do HUB.
 *
 * O que mora uma vez so no banco integrado e e lido por todos os
 * sistemas. Sem nome de tabela: a pagina e para o publico de um evento.
 */
export const ENTIDADES_MESTRES: readonly EntidadeMestre[] = [
  {
    codigo: 'pessoas',
    nome: 'Pessoas e empresas',
    descricao: 'Identidade única de cada pessoa física ou jurídica.',
  },
  {
    codigo: 'documentos',
    nome: 'Documentos',
    descricao: 'CPF, CNPJ, RG e afins, normalizados — a chave da deduplicação.',
  },
  {
    codigo: 'papeis',
    nome: 'Papéis',
    descricao: 'Cliente, lead, fornecedor, parceiro, colaborador — com vigência.',
  },
  {
    codigo: 'canais',
    nome: 'Canais de contato',
    descricao: 'E-mail, telefone e WhatsApp, com o principal marcado.',
  },
  {
    codigo: 'enderecos',
    nome: 'Endereços',
    descricao: 'Principal, cobrança, entrega e fiscal, no mesmo formato.',
  },
  {
    codigo: 'grupos',
    nome: 'Grupos econômicos',
    descricao: 'Holdings e carteiras que amarram várias empresas.',
  },
  {
    codigo: 'perfil',
    nome: 'Perfil empresarial',
    descricao: 'Porte, regime, CNAE, segmento e faturamento das PJ.',
  },
  {
    codigo: 'acessos',
    nome: 'Acessos e cargos',
    descricao: 'Quem entra em qual sistema, com qual cargo.',
  },
]

/**
 * Os modulos do ecossistema.
 *
 * A lista e a do catalogo real de sistemas (`hub.sistemas`), nao um
 * conjunto ilustrativo: e a mesma tabela que a concessao de acesso
 * referencia. `usuarios` e a contagem de concessoes ativas.
 */
export const MODULOS: readonly Modulo[] = [
  {
    codigo: 'crm',
    nome: 'Atlas CRM',
    sigla: 'CRM',
    familia: 'comercial',
    resumo: 'Funil comercial, negócios e follow-ups.',
    consome: ['pessoas', 'documentos', 'papeis', 'canais', 'enderecos', 'grupos'],
    proprio: ['Negócios e estágio do funil', 'Atividades e follow-ups', 'Propostas de honorários'],
    usuarios: 50,
  },
  {
    codigo: 'rf_ops',
    nome: 'R. Feitosa Ops',
    sigla: 'OPS',
    familia: 'operacoes',
    resumo: 'Operação diária, tarefas e atendimento.',
    consome: ['pessoas', 'acessos'],
    proprio: ['Filas de atendimento', 'Tarefas operacionais', 'Conversas de WhatsApp'],
    usuarios: 41,
  },
  {
    codigo: 'consult',
    nome: 'Atlas Consult',
    sigla: 'ACO',
    familia: 'juridico',
    resumo: 'Compliance, projetos e eixos de consultoria.',
    consome: ['pessoas', 'documentos', 'grupos', 'acessos'],
    proprio: ['Projetos e tarefas', 'Eixos e entregáveis', 'Documentos de compliance'],
    usuarios: 25,
  },
  {
    codigo: 'rh',
    nome: 'Atlas RH',
    sigla: 'RH',
    familia: 'pessoas',
    resumo: 'Vínculos, ponto e folha dos colaboradores.',
    consome: ['pessoas', 'documentos', 'canais', 'enderecos'],
    proprio: ['Contratos e vínculos', 'Jornada e ponto', 'Férias e afastamentos'],
    usuarios: 6,
  },
  {
    codigo: 'valley',
    nome: 'Connect Valley',
    sigla: 'CV',
    familia: 'eventos',
    resumo: 'Eventos, inscrições e patrocínios.',
    consome: ['pessoas', 'canais', 'papeis'],
    proprio: ['Edições e ingressos', 'Inscrições e check-in', 'Cotas de patrocínio'],
    usuarios: 6,
  },
  {
    codigo: 'tributario',
    nome: 'Atlas Tributário',
    sigla: 'ATR',
    familia: 'juridico',
    resumo: 'Análises de NCM e reforma tributária.',
    consome: ['pessoas', 'documentos', 'perfil'],
    proprio: ['Análises fiscais', 'Linhas de produto e NCM', 'Cenários de reforma'],
    usuarios: 5,
  },
  {
    codigo: 'legal_ops',
    nome: 'Legal Ops',
    sigla: 'LOP',
    familia: 'juridico',
    resumo: 'Rotina jurídica e controle de prazos.',
    consome: ['pessoas', 'documentos', 'acessos'],
    proprio: ['Prazos e agenda', 'Controle de peças'],
    usuarios: 4,
  },
  {
    codigo: 'cash',
    nome: 'Atlas Cash',
    sigla: 'CSH',
    familia: 'comercial',
    resumo: 'Financeiro, recebimentos e repasses.',
    consome: ['pessoas', 'documentos', 'grupos'],
    proprio: ['Lançamentos', 'Contas a pagar e receber', 'Conciliação'],
    usuarios: 3,
  },
  {
    codigo: 'ponto',
    nome: 'Atlas Ponto',
    sigla: 'PTO',
    familia: 'pessoas',
    resumo: 'App PWA de ponto, integrado ao Atlas RH.',
    consome: ['pessoas', 'acessos'],
    proprio: ['Marcações de ponto', 'Justificativas e ajustes'],
  },
  {
    codigo: 'academy',
    nome: 'Connect Academy',
    sigla: 'ACA',
    familia: 'eventos',
    resumo: 'Cursos, turmas e certificados.',
    consome: ['pessoas', 'canais'],
    proprio: ['Turmas e matriculas', 'Trilhas de conteúdo', 'Certificados'],
    usuarios: 2,
  },
  {
    codigo: 'imoveis',
    nome: 'R. Feitosa Imóveis',
    sigla: 'IMO',
    familia: 'operacoes',
    resumo: 'Carteira de imóveis e locações.',
    consome: ['pessoas', 'documentos', 'enderecos'],
    proprio: ['Imóveis e unidades', 'Contratos de locação'],
    usuarios: 2,
  },
]

/** Busca rapida por codigo, para o diagrama nao varrer o array a cada hover. */
export const MODULO_POR_CODIGO = new Map(MODULOS.map((m) => [m.codigo, m]))
export const ENTIDADE_POR_CODIGO = new Map(ENTIDADES_MESTRES.map((e) => [e.codigo, e]))
