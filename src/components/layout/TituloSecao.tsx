export function TituloSecao({
  indice,
  etiqueta,
  titulo,
  descricao,
}: {
  /** Numero da secao, ex. "01". Editorial: ancora a leitura como capitulo. */
  indice?: string
  etiqueta: string
  titulo: string
  descricao?: string
}) {
  return (
    <header className="mb-12 flex flex-col gap-6 sm:mb-16 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-3xl">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-hub">
          {etiqueta}
        </p>
        <h2 className="text-balance font-display text-3xl font-medium leading-[1.05] tracking-tight text-texto sm:text-5xl">
          {titulo}
        </h2>
        {descricao && (
          <p className="mt-5 text-pretty text-base leading-relaxed text-texto-suave sm:text-lg">
            {descricao}
          </p>
        )}
      </div>
      {indice && (
        <span
          aria-hidden
          className="font-display text-6xl font-medium leading-none text-borda-forte/70 sm:text-8xl"
        >
          {indice}
        </span>
      )}
    </header>
  )
}
