export function TituloSecao({
  etiqueta,
  titulo,
  descricao,
}: {
  etiqueta: string
  titulo: string
  descricao?: string
}) {
  return (
    <header className="mb-12 max-w-3xl sm:mb-16">
      <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-hub">
        {etiqueta}
      </p>
      <h2 className="text-balance text-3xl font-semibold leading-tight tracking-tight text-texto sm:text-4xl">
        {titulo}
      </h2>
      {descricao && (
        <p className="mt-5 text-pretty text-base leading-relaxed text-texto-suave sm:text-lg">
          {descricao}
        </p>
      )}
    </header>
  )
}
