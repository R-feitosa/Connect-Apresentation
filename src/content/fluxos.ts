import type { FluxoCadastro } from '@/types/ecossistema'

/**
 * Os caminhos que um cadastro percorre.
 *
 * O ponto de todos eles e o mesmo, e por isso a secao alterna entre
 * varios: muda QUEM chega e muda ONDE o dado e usado, mas o segundo
 * passo — "nasce no HUB" — nunca muda. E essa repeticao que sustenta a
 * tese da pagina.
 */
export const FLUXOS: readonly FluxoCadastro[] = [
  {
    codigo: 'cliente',
    rotulo: 'Cliente',
    papel: 'cliente',
    passos: [
      { titulo: 'Chega', detalhe: 'Empresa fecha contrato de consultoria.' },
      { titulo: 'Nasce no HUB', detalhe: 'Identidade, CNPJ e contatos gravados uma vez.' },
      { titulo: 'Ganha papel', detalhe: 'Papel cliente, modalidade mensal, com data de início.' },
      { titulo: 'Aparece nos módulos', detalhe: 'Vira carteira no CRM, cobrança no Cash, projeto no Consult.' },
    ],
    destinos: ['crm', 'cash', 'consult'],
  },
  {
    codigo: 'colaborador',
    rotulo: 'Colaborador',
    papel: 'colaborador',
    passos: [
      { titulo: 'Chega', detalhe: 'Pessoa é contratada pelo grupo.' },
      { titulo: 'Nasce no HUB', detalhe: 'Mesma tabela do cliente: é uma pessoa, não um "funcionário".' },
      { titulo: 'Ganha papel', detalhe: 'Papel colaborador, aberto pelo contrato ativo no RH.' },
      { titulo: 'Aparece nos módulos', detalhe: 'Folha e ponto no RH, acesso e cargo nos sistemas que usa.' },
    ],
    destinos: ['rh', 'rf_ops'],
  },
  {
    codigo: 'empresa',
    rotulo: 'Empresa',
    papel: 'empresa',
    passos: [
      { titulo: 'Chega', detalhe: 'PJ entra como prospecção ou por indicação.' },
      { titulo: 'Nasce no HUB', detalhe: 'CNPJ normalizado barra a duplicata na hora do cadastro.' },
      { titulo: 'Ganha perfil', detalhe: 'Porte, regime e CNAE no perfil empresarial; grupo econômico se houver.' },
      { titulo: 'Aparece nos módulos', detalhe: 'Análise no Tributário, funil no CRM, compliance no Consult.' },
    ],
    destinos: ['tributario', 'crm', 'consult'],
  },
  {
    codigo: 'participante',
    rotulo: 'Participante',
    papel: 'participante',
    passos: [
      { titulo: 'Chega', detalhe: 'Pessoa se inscreve num evento do grupo.' },
      { titulo: 'Nasce no HUB', detalhe: 'Se já existir como cliente, reaproveita — não cria outra ficha.' },
      { titulo: 'Ganha papel', detalhe: 'Papel participante, que convive com os papéis que ela já tinha.' },
      { titulo: 'Aparece nos módulos', detalhe: 'Ingresso no Valley, trilha na Academy, histórico no CRM.' },
    ],
    destinos: ['valley', 'academy', 'crm'],
  },
]
