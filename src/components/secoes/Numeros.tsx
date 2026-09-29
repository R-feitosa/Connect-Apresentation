import { Secao } from '@/components/layout/Secao'
import { Revelar, Sobretitulo } from '@/components/anim/Revelar'
import { Contador } from '@/components/anim/Contador'
import { ENTIDADES_MESTRES, MODULOS } from '@/content/ecossistema'

/** Numeros reais do catalogo (`hub.sistemas` e concessoes ativas). */
const NUMEROS = [
  { valor: MODULOS.length, rotulo: 'sistemas conectados' },
  { valor: ENTIDADES_MESTRES.length, rotulo: 'entidades mestras' },
  { valor: MODULOS.reduce((t, m) => t + (m.usuarios ?? 0), 0), rotulo: 'acessos concedidos' },
  { valor: 1, rotulo: 'fonte de verdade' },
]

/** O Atlas em numeros: a secao escura do meio da pagina, como no site institucional. */
export function Numeros() {
  return (
    <Secao id="numeros" tom="escuro">
      <div
        aria-hidden
        // Inteiro dentro da secao: no modo estande a secao e encolhida para
        // caber, e um brilho vazando da borda apareceria cortado em retangulo.
        className="pointer-events-none absolute -right-24 top-1/2 h-[44rem] w-[44rem] -translate-y-1/2 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(95,0,6,.55), transparent 60%)' }}
      />
      <Revelar className="relative">
        <Sobretitulo>O Atlas em números</Sobretitulo>
        <h2 className="titulo-marca mt-5 max-w-2xl">
          Uma base, <strong>resultados que se somam.</strong>
        </h2>
      </Revelar>

      <div className="relative mt-14 grid grid-cols-2 border-l border-t border-white/15 lg:grid-cols-4">
        {NUMEROS.map((n, i) => (
          <Revelar key={n.rotulo} atraso={i * 0.1} className="border-b border-r border-white/15 bg-navy-fundo p-8 hover:bg-hub-suave sm:p-11">
            <Contador valor={n.valor} className="block font-display text-[clamp(2.6rem,4.8vw,3.9rem)] font-bold leading-none tracking-tight" />
            <span className="mt-3 block text-[0.74rem] uppercase tracking-[0.18em] text-white/60">{n.rotulo}</span>
          </Revelar>
        ))}
      </div>
    </Secao>
  )
}
