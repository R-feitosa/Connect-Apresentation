import { Container } from '@/components/layout/Container'

export function Rodape() {
  return (
    <footer className="border-t border-borda py-12">
      <Container className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-texto-fraco">
          Ecossistema Atlas — R. Feitosa Group
        </p>
        <p className="font-mono text-xs text-texto-fraco">
          Apresentação da arquitetura · sem conexão com o banco de produção
        </p>
      </Container>
    </footer>
  )
}
