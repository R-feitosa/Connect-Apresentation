import type { StaticImageData } from 'next/image'
import hub from '@/assets/logos/hub.png'
import hubMarca from '@/assets/logos/hub-marca.png'
import crm from '@/assets/logos/crm.png'
import rh from '@/assets/logos/rh.png'
import legalOps from '@/assets/logos/legal-ops.png'
import rfOps from '@/assets/logos/rf-ops.png'
import consult from '@/assets/logos/consult.png'
import tributario from '@/assets/logos/tributario.png'
import cash from '@/assets/logos/cash.png'
import ponto from '@/assets/logos/ponto.png'
import marcaCrm from '@/assets/logos/marcas/crm.png'
import marcaRh from '@/assets/logos/marcas/rh.png'
import marcaLegalOps from '@/assets/logos/marcas/legal-ops.png'
import marcaRfOps from '@/assets/logos/marcas/rf-ops.png'
import marcaConsult from '@/assets/logos/marcas/consult.png'
import marcaTributario from '@/assets/logos/marcas/tributario.png'
import marcaCash from '@/assets/logos/marcas/cash.png'
import marcaPonto from '@/assets/logos/marcas/ponto.png'
import type { MARCAS_EMPRESAS } from './marcas-empresas'

/**
 * Identidade visual de cada sistema.
 *
 * Tres origens, na ordem de preferencia:
 *  1. `logo` oficial do manual de marca (pagina "Logos Apps"): HUB, Atlas
 *     CRM, Atlas RH e Legal Ops — extraidos do PDF, nao redesenhados.
 *     Atlas Ponto usa o icone do proprio app (PWA) + o nome na tipografia
 *     dos demais.
 *  2. `empresa`: sistemas que levam o nome de uma empresa do grupo usam a
 *     medalha oficial dela (Connect Valley, Connect Academy, Feitosa Imoveis).
 *  3. `logo` gerado no mesmo padrao: R. Feitosa Ops, Atlas Consult, Atlas
 *     Tributario e Atlas Cash nao tem logo no manual; foram montados com a
 *     marca-base real (anel + traco) recortada do logo do HUB, um icone no
 *     anel e o nome na mesma tipografia.
 *
 * `cor` e a cor de identidade do app (a do proprio logo). `marca` e so o
 * simbolo (o anel com o icone, ou o icone do app), para espacos redondos
 * e pequenos como os nos do diagrama.
 */
export interface VisualSistema {
  readonly cor: string
  readonly logo?: StaticImageData
  readonly marca?: StaticImageData
  readonly empresa?: keyof typeof MARCAS_EMPRESAS
}

export const VISUAL_SISTEMA: Record<string, VisualSistema> = {
  crm: { cor: '#50883f', logo: crm, marca: marcaCrm },
  rh: { cor: '#6326dc', logo: rh, marca: marcaRh },
  legal_ops: { cor: '#ff8b69', logo: legalOps, marca: marcaLegalOps },
  rf_ops: { cor: '#0e8a8c', logo: rfOps, marca: marcaRfOps },
  consult: { cor: '#b0306a', logo: consult, marca: marcaConsult },
  tributario: { cor: '#d99a00', logo: tributario, marca: marcaTributario },
  cash: { cor: '#212965', logo: cash, marca: marcaCash },
  ponto: { cor: '#142b6e', logo: ponto, marca: marcaPonto },
  valley: { cor: '#14193c', empresa: 'valley' },
  academy: { cor: '#c9a227', empresa: 'academy' },
  imoveis: { cor: '#212965', empresa: 'imoveis' },
}

export const LOGO_HUB = hub
export const MARCA_HUB = hubMarca
