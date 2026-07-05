# Architecture

## Overview

O Model UI Kit é dividido em duas responsabilidades principais:

1. **Storybook** — documentação visual, validação e testes de interação
2. **Angular Library** — distribuição dos componentes para apps externas

---

## High Level Architecture

```txt
Design Tokens (SCSS / CSS Variables)
              ↓
       UI Components
              ↓
   Storybook (stories + MDX)
              ↓
      Angular Library (public-api.ts)
              ↓
     Consumer Applications
```

---

## Storybook

### Localização

| Conteúdo | Caminho |
| -------- | ------- |
| Config | `.storybook/` |
| Stories TS | `projects/ui-kit/src/lib/components/**/*.stories.ts` |
| MDX | `src/stories/` |
| Play helpers | `projects/ui-kit/src/lib/storybook/play.helpers.ts` |

### Responsabilidades

- Documentação visual e autodocs (Compodoc)
- Controles interativos por componente
- Testes de interação (`play` + Test Runner)
- Design Tokens e Guidelines (MDX)
- Auditoria de acessibilidade

### Seções do painel

```txt
Introduction → Design Tokens → Guidelines → Components
```

---

## Angular Library

### Localização

```txt
projects/ui-kit/
```

### Responsabilidades

- Exportação via `public-api.ts`
- Build com `ng-packagr` → `dist/ui-kit/`
- Publicação npm (`@marianaLinoGit/model-ui-kit`)
- Versionamento semântico

---

## Components

### Localização

```txt
projects/ui-kit/src/lib/components/
```

### Estrutura por componente

```txt
button/
├── ui-button.component.ts
├── ui-button.component.html
├── ui-button.component.scss
└── ui-button.stories.ts
```

### Padrões técnicos

- **Standalone** — sem NgModules
- **Signals** — `input()`, `output()`, `computed()`
- **OnPush** — change detection otimizada
- **Tokens** — estilos via `--ui-*` (sem valores hardcoded)
- **ViewEncapsulation.None** — apenas quando necessário (ex.: Table com projeção de `<tr>`)

---

## Design Tokens

### Localização

```txt
projects/ui-kit/src/lib/styles/
├── tokens.scss
├── typography.scss
├── reset.scss
└── index.scss
```

### Tokens disponíveis

- `--ui-color-*` (cores semânticas)
- `--ui-space-*` (espaçamento)
- `--ui-font-size-*`, `--ui-font-weight-*`
- `--ui-radius-*`
- `--ui-shadow-*`

Documentados visualmente em `src/stories/Design Tokens/*.mdx`.

---

## Public API

Registro central:

```txt
projects/ui-kit/src/public-api.ts
```

Regra: **todo componente ou tipo consumível externamente** deve ser exportado aqui.

---

## Development Flow

```txt
Criar / alterar componente
         ↓
Criar / atualizar *.stories.ts (PlaygroundCompleto + play)
         ↓
Validar no Storybook (visual + Interactions)
         ↓
Exportar em public-api.ts
         ↓
ng build ui-kit
         ↓
npm pack / publicar
         ↓
Consumir em app externa
```

---

## Distribution Flow

```txt
ng build ui-kit
      ↓
dist/ui-kit/
      ↓
npm pack  →  .tgz local
      ou
npm publish  →  GitHub Packages
      ↓
npm install @marianaLinoGit/model-ui-kit
```

---

## Testes

| Tipo | Ferramenta | Comando |
| ---- | ---------- | ------- |
| Interação (stories) | `@storybook/test` + Test Runner | `npm run test-storybook` |
| Unitários (app) | Karma + Jasmine | `npm test` |

Os testes de interação vivem nas funções `play` das stories, reutilizando helpers em `play.helpers.ts`.
