import { Revelar, Sobretitulo } from '@/components/anim/Revelar'
import { cn } from '@/lib/cn'

/**
 * Cabecalho de secao no padrao da marca: sobretitulo com traco, titulo
 * fino com a parte final em negrito, e no maximo uma linha de apoio.
 */
export function TituloSecao({
  sobretitulo,
  titulo,
  destaque,
  descricao,
  className,
}: {
  sobretitulo: string
  titulo: string
  destaque: string
  descricao?: string
  className?: string
}) {
  return (
    <Revelar as="header" className={cn('mb-14 max-w-3xl sm:mb-16', className)}>
      <Sobretitulo>{sobretitulo}</Sobretitulo>
      <h2 className="titulo-marca mt-5">
        {titulo} <strong>{destaque}</strong>
      </h2>
      {descricao && <p className="mt-5 max-w-xl text-lg leading-relaxed text-texto-suave">{descricao}</p>}
    </Revelar>
  )
}
