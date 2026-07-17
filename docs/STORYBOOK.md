# Storybook

## Objetivo

O Storybook documenta, valida e testa componentes isoladamente — sem depender de uma aplicação host.

---

## Executando localmente

```bash
npm run storybook
```

```txt
http://localhost:6006
```

---

## Build estático

```bash
npm run build-storybook
```

Resultado: `storybook-static/`

---

## Testes de interação

As stories **Playground completo** incluem funções `play` que simulam uso real (cliques, digitação, abertura de dropdowns).

Helpers centralizados em:

```txt
projects/ui-kit/src/lib/storybook/play.helpers.ts
```

### Rodar via Test Runner

Terminal 1:

```bash
npm run storybook
```

Terminal 2:

```bash
npm run test-storybook
```

---

## Onde ficam as stories

| Tipo | Local |
| ---- | ----- |
| Componentes | `projects/ui-kit/src/lib/components/**/*.stories.ts` |
| MDX (tokens, guias) | `src/stories/**/*.mdx` |

Configuração: `.storybook/main.ts`

---

## Addons

| Addon | Função |
| ----- | ------ |
| `@storybook/addon-docs` | Autodocs, descrições, MDX |
| `@storybook/addon-a11y` | Auditoria de acessibilidade |
| `@storybook/addon-themes` | Tema claro/escuro |

Controles, actions e viewport vêm do pacote `@storybook/angular` / docs no Storybook 9 (sem `addon-essentials` / `addon-interactions` separados).

---

## Compodoc

O autodocs usa Compodoc para enriquecer a API dos componentes. A geração aponta para a library:

```txt
projects/ui-kit/tsconfig.lib.json
```

Configurado em `angular.json` → target `storybook` / `build-storybook`.

Se aparecer *"Component not found in compodoc JSON"*, reinicie o Storybook para regenerar `documentation.json`.

---

## Estrutura no painel lateral

```txt
Introduction

Design Tokens
  Border Radius
  Colors
  Shadows
  Spacing
  Typography

Guidelines
  Accessibility
  Component API
  Roadmap
  Usage Guidelines

Components
  Accordion
  Accordion Panel
  Alert
  Badge
  Breadcrumb
  Button
  Card
  Checkbox
  Divider
  Empty State
  Field Error
  File Upload
  Form Field
  Icon
  Input
  Label
  Loading
  Modal
  Page Title
  Pagination
  Radio Group
  Select
  Stat Card
  Stat Card Grid
  Switch
  Table
  Tabs
  Textarea
  Toast
  Tooltip
```

Ordem definida em `.storybook/preview.ts` → `storySort`.

---

## Criando novo componente

```txt
button/
├── ui-button.component.ts
├── ui-button.component.html
├── ui-button.component.scss
└── ui-button.stories.ts
```

Exportar em `projects/ui-kit/src/public-api.ts`.

---

## Convenção de stories (padronizada)

Cada componente deve seguir:

### 1. `playgroundDefaults`

Objeto com todos os args padrão do componente.

### 2. Story `PlaygroundCompleto`

Story principal com **todas** as opções nos controles + função `play`.

### 3. `argTypes` documentados

Cada arg com `description` e `table.category`:

- Conteúdo
- Aparência
- Estado
- Formulário
- Acessibilidade
- Events

### 4. `includeStories`

Regex para excluir galerias/comparações do autodocs principal (ex.: `AllColors`, `AllIcons`).

### 5. Decorator + layout

```typescript
parameters: { layout: 'padded' }
```

### 6. Descrição por story

```typescript
parameters: {
  docs: {
    description: {
      story: 'Texto explicando o cenário.',
    },
  },
},
```

### Exemplo mínimo

```typescript
import type { Meta, StoryObj } from '@storybook/angular';
import { buttonPlaygroundPlay } from '../../storybook/play.helpers';
import { UiButtonComponent } from './ui-button.component';

const playgroundDefaults = {
  label: 'Salvar',
  color: 'primary' as const,
  // …
};

const meta: Meta<UiButtonComponent> = {
  title: 'Components/Button',
  component: UiButtonComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Descrição do componente e **Uso:** …',
      },
    },
  },
  argTypes: { /* categorias + descriptions */ },
  args: { ...playgroundDefaults },
};

export default meta;
type Story = StoryObj<UiButtonComponent>;

export const PlaygroundCompleto: Story = {
  name: 'Playground completo',
  args: { ...playgroundDefaults },
  play: buttonPlaygroundPlay,
};
```

### Inputs com alias (ex.: `[value]`, `[checked]`)

Usar arg renomeado no Storybook + `render` customizado:

```typescript
type UiSelectStoryArgs = UiSelectComponent & {
  selectedValue: string | number | null;
};

// argTypes: selectedValue com name: 'value'
// render: [value]="selectedValue"
```

---

## Criando página MDX

```mdx
import { Meta } from "@storybook/addon-docs/blocks";

<Meta title="Design Tokens/Colors" />

# Colors
```

Salvar em `src/stories/Design Tokens/Colors.mdx`.

---

## Convenções de título

```txt
Components/Button
Components/Table
Design Tokens/Colors
Guidelines/Roadmap
```
