import type { StaticImageData } from 'next/image'
import hub from '@/assets/logos/hub.png'
import hubMarca from '@/assets/logos/hub-marca.png'
import crm from '@/assets/logos/crm.png'
import rh from '@/assets/logos/rh.png'
import legalOps from '@/assets/logos/legal-ops.png'
import juris from '@/assets/logos/juris.png'
import rfOps from '@/assets/logos/rf-ops.png'
import consult from '@/assets/logos/consult.png'
import tributario from '@/assets/logos/tributario.png'
import cash from '@/assets/logos/cash.png'
import type { MARCAS_EMPRESAS } from './marcas-empresas'

/**
 * Identidade visual de cada sistema.
 *
 * Tres origens, na ordem de preferencia:
 *  1. `logo` oficial do manual de marca (pagina "Logos Apps"): HUB, Atlas
 *     CRM, Atlas RH, Legal Ops e Atlas Juris — extraidos do PDF, nao
 *     redesenhados.
 *  2. `empresa`: sistemas que levam o nome de uma empresa do grupo usam a
 *     medalha oficial dela (Connect Valley, Connect Academy, Feitosa Imoveis).
 *  3. `logo` gerado no mesmo padrao: R. Feitosa Ops, Atlas Consult, Atlas
 *     Tributario e Atlas Cash nao tem logo no manual; foram montados com a
 *     marca-base real (anel + traco) recortada do logo do HUB, um icone no
 *     anel e o nome na mesma tipografia.
 *
 * `cor` e a cor de identidade do app (a do proprio logo).
 */
export interface VisualSistema {
  readonly cor: string
  readonly logo?: StaticImageData
  readonly empresa?: keyof typeof MARCAS_EMPRESAS
}

export const VISUAL_SISTEMA: Record<string, VisualSistema> = {
  crm: { cor: '#50883f', logo: crm },
  rh: { cor: '#6326dc', logo: rh },
  legal_ops: { cor: '#ff8b69', logo: legalOps },
  juris: { cor: '#5f0006', logo: juris },
  rf_ops: { cor: '#0e8a8c', logo: rfOps },
  consult: { cor: '#b0306a', logo: consult },
  tributario: { cor: '#d99a00', logo: tributario },
  cash: { cor: '#212965', logo: cash },
  valley: { cor: '#14193c', empresa: 'valley' },
  academy: { cor: '#c9a227', empresa: 'academy' },
  imoveis: { cor: '#212965', empresa: 'imoveis' },
}

export const LOGO_HUB = hub
export const MARCA_HUB = hubMarca
