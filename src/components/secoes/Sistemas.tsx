import type { CSSProperties } from 'react'
import { Secao } from '@/components/layout/Secao'
import { TituloSecao } from '@/components/layout/TituloSecao'
import { Revelar } from '@/components/anim/Revelar'
import { Contador } from '@/components/anim/Contador'
import { LogoSistema } from '@/components/ui/LogoSistema'
import { MODULOS } from '@/content/ecossistema'
import { VISUAL_SISTEMA } from '@/content/sistemas'
import { SetaDireita } from './Hero'

/**
 * A vitrine dos sistemas: uma celula por app, com a logo oficial sobre um
 * halo na cor da propria marca. A grade de 1px entre as celulas e o
 * mesmo recurso das grades do site institucional.
 */
export function Sistemas() {
  return (
    <Secao id="sistemas">
      <TituloSecao sobretitulo="Os sistemas" titulo="Onze frentes," destaque="um só cadastro." />

      <div className="grid border-l border-t border-borda sm:grid-cols-2 lg:grid-cols-4">
        {MODULOS.map((m, i) => (
          <Revelar
            key={m.codigo}
            de="escala"
            atraso={(i % 4) * 0.08}
            className="tilt cartao-sistema relative border-b border-r border-borda flex min-h-[15.5rem] flex-col bg-fundo p-7 hover:z-10 hover:bg-white"
          >
            <div className="relative mb-6 flex h-24 items-center" style={{ '--c': VISUAL_SISTEMA[m.codigo]?.cor } as CSSProperties}>
              <div className="halo-logo" />
              <LogoSistema codigo={m.codigo} nome={m.nome} className="relative h-14 max-w-full" />
            </div>
            <p className="text-[0.95rem] leading-snug text-texto-suave">{m.resumo}</p>
            {m.usuarios !== undefined ? (
              <p className="mt-auto flex items-baseline gap-2 border-t border-borda pt-4">
                <Contador valor={m.usuarios} className="font-display text-2xl font-bold text-hub" />
                <span className="text-[0.7rem] uppercase tracking-[0.16em] text-texto-fraco">com acesso</span>
              </p>
            ) : (
              <p className="mt-auto flex items-baseline gap-2 border-t border-borda pt-4">
                <span className="font-display text-2xl font-bold text-hub">PWA</span>
                <span className="text-[0.7rem] uppercase tracking-[0.16em] text-texto-fraco">no celular</span>
              </p>
            )}
          </Revelar>
        ))}

        <Revelar de="escala" atraso={0.24} className="relative flex min-h-[15.5rem] flex-col justify-between border-b border-r border-borda bg-hub p-7 text-white">
          <span className="text-xs font-semibold tracking-[0.2em] text-lavanda">12 / O PRÓXIMO</span>
          <p className="font-display text-2xl font-light leading-tight text-lavanda">
            O próximo sistema <strong className="font-bold text-white">já nasce integrado.</strong>
          </p>
          <a href="#escala" className="btn btn-claro mag self-start px-5 py-3">
            <span>Ver como</span>
            <SetaDireita />
          </a>
        </Revelar>
      </div>
    </Secao>
  )
}
