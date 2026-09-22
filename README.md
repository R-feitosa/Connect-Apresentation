# Ecossistema Atlas — apresentação da arquitetura

Landing page institucional que explica visualmente como os sistemas do
R. Feitosa Group compartilham um cadastro único, com o **Atlas Hub** no
centro dos dados mestres.

É uma peça de **apresentação**. Não se conecta a banco nenhum, não lê
API e não tem estado de servidor: todo o conteúdo é estático, em
`src/content/`.

## Rodando

```bash
npm install
npm run dev        # http://localhost:3000
```

Outros comandos:

```bash
npm run build      # build de produção (inclui checagem de tipos)
npm start          # serve o build
npm run lint
npm test           # testes da geometria do diagrama
```

Requer Node 20 ou superior (o projeto foi montado no Node 22).

## Modo estande (loop de TV)

Para deixar a página rodando sozinha numa TV, abra com `?tv=1` na URL
(ex.: `https://.../?tv=1`). Ela avança de seção em seção automaticamente
e volta ao topo ao terminar, sem precisar de ninguém rolando a tela. O
mesmo comportamento pode ser ligado a qualquer momento pelo botão
"Modo estande" no canto inferior direito.

## Como o conteúdo muda

Nenhum componente precisa ser tocado para mudar o que a página diz:

| Quero mudar | Mexo em |
|---|---|
| Um módulo novo no diagrama | `src/content/ecossistema.ts` → `MODULOS` |
| O que um módulo lê do HUB | mesma entrada, campo `consome` |
| As entidades mestres | `src/content/ecossistema.ts` → `ENTIDADES_MESTRES` |
| Um fluxo de cadastro novo | `src/content/fluxos.ts` |
| Antes × depois | `src/content/comparativo.ts` |
| Benefícios | `src/content/beneficios.ts` |
| Esteira de MVP | `src/content/mvp.ts` |
| Cores por família | `src/lib/cores.ts` |
| Ordem das seções | `src/app/page.tsx` |

Os tipos em `src/types/ecossistema.ts` obrigam o preenchimento: um módulo
sem `consome` ou uma família sem cor não compilam.

## Estrutura

```
src/
├── app/                     layout, página e tokens de tema
├── content/                 TODO o texto e os dados da página
├── types/                   contratos do domínio
├── lib/                     geometria do diagrama, cores, utilitários
└── components/
    ├── layout/              Container, Seção, TítuloSeção, Navegação, Marquee, ModoEstande
    ├── ui/                  Cartão, Etiqueta, ícones
    ├── diagramas/           órbita, fluxo, esteira de MVP, grade
    └── secoes/              uma por bloco da página
testes/                      geometria (node --test, sem dependências)
```

## Decisões que valem saber

**O diagrama é SVG montado por componente, não imagem.** Posições,
curvas e cores saem de dados; trocar um módulo redesenha tudo sozinho.

**A geometria é um módulo puro** (`src/lib/geometria.ts`) e tem teste.
É a única parte do desenho com resposta certa ou errada — um erro de
sinal ali apareceria como "o diagrama ficou torto", que é difícil de
depurar no olho.

**Ao focar um módulo, os outros são atenuados** em vez de o escolhido
ser realçado. Em fundo escuro, empurrar um item para cima estoura;
puxar o resto para baixo isola sem distorcer.

**O segundo passo do fluxo é sempre "Nasce no HUB"**, nos quatro
cenários. A imobilidade dessa coluna é o argumento da seção.

**Movimento respeita `prefers-reduced-motion`.** A página continua
legível parada, então desligar a animação não custa informação.
