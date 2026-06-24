# Storybook

## Objetivo

O Storybook é utilizado para documentar, validar e testar componentes isoladamente.

---

## Executando localmente

```bash
npm run storybook
```

Acessar:

```txt
http://localhost:6006
```

---

## Build estático

```bash
npm run build-storybook
```

Resultado:

```txt
storybook-static
```

---

## Estrutura recomendada

```txt
Introduction

Design System
  Accessibility
  Border Radius
  Colors
  Shadows
  Spacing
  Typography

Documentation
  Component API
  Roadmap
  Usage Guidelines

Components
  Accordion
  Alert
  Breadcrumb
  Button
  Card
  Empty State
  Loading
  Modal
  Tabs
  Toast
  Tooltip
```

---

## Criando novo componente

1. Criar componente Angular
2. Criar story
3. Adicionar documentação

Exemplo:

```txt
button/
├── ui-button.component.ts
├── ui-button.component.html
├── ui-button.component.scss
├── ui-button.stories.ts
```

---

## Criando página MDX

Exemplo:

```mdx
import { Meta } from "@storybook/addon-docs/blocks";

<Meta title="Design System/Colors" />

# Colors
```

---

## Convenções

### Componentes

```txt
Components/Button
Components/Card
Components/Modal
```

### Design System

```txt
Design System/Colors
Design System/Typography
```

### Documentação

```txt
Documentation/Roadmap
Documentation/Usage Guidelines
```
