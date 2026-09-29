import type { FluxoCadastro } from '@/types/ecossistema'

/**
 * Os caminhos que um cadastro percorre. Muda quem chega e onde o dado
 * e usado; o segundo passo — "nasce no HUB" — nunca muda. E essa
 * repeticao que sustenta a tese da pagina.
 */
export const FLUXOS: readonly FluxoCadastro[] = [
  {
    codigo: 'cliente',
    rotulo: 'Cliente',
    papel: 'cliente',
    passos: [
      { titulo: 'Chega', detalhe: 'Fecha um contrato de consultoria.' },
      { titulo: 'Nasce no HUB', detalhe: 'CNPJ e contatos gravados uma vez.' },
      { titulo: 'Ganha papel', detalhe: 'Cliente mensal, com data de início.' },
      { titulo: 'Aparece nos sistemas', detalhe: 'Carteira, cobrança e projeto.' },
    ],
    destinos: ['crm', 'cash', 'consult'],
  },
  {
    codigo: 'colaborador',
    rotulo: 'Colaborador',
    papel: 'colaborador',
    passos: [
      { titulo: 'Chega', detalhe: 'É contratado pelo grupo.' },
      { titulo: 'Nasce no HUB', detalhe: 'Mesma tabela do cliente: é uma pessoa.' },
      { titulo: 'Ganha papel', detalhe: 'Colaborador, aberto pelo contrato no RH.' },
      { titulo: 'Aparece nos sistemas', detalhe: 'Folha, ponto e acessos.' },
    ],
    destinos: ['rh', 'rf_ops'],
  },
  {
    codigo: 'empresa',
    rotulo: 'Empresa',
    papel: 'empresa',
    passos: [
      { titulo: 'Chega', detalhe: 'Entra por prospecção ou indicação.' },
      { titulo: 'Nasce no HUB', detalhe: 'CNPJ normalizado barra a duplicata.' },
      { titulo: 'Ganha perfil', detalhe: 'Porte, regime, CNAE e grupo econômico.' },
      { titulo: 'Aparece nos sistemas', detalhe: 'Análise fiscal, funil e compliance.' },
    ],
    destinos: ['tributario', 'crm', 'consult'],
  },
  {
    codigo: 'participante',
    rotulo: 'Participante',
    papel: 'participante',
    passos: [
      { titulo: 'Chega', detalhe: 'Se inscreve num evento do grupo.' },
      { titulo: 'Nasce no HUB', detalhe: 'Se já é cliente, reaproveita a ficha.' },
      { titulo: 'Ganha papel', detalhe: 'Participante, junto dos papéis que já tinha.' },
      { titulo: 'Aparece nos sistemas', detalhe: 'Ingresso, trilha e histórico.' },
    ],
    destinos: ['valley', 'academy', 'crm'],
  },
]
