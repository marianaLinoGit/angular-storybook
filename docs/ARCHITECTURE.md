# Architecture

## Overview

O Model UI Kit é dividido em duas responsabilidades principais:

1. Storybook
2. Angular Library

O Storybook é responsável pela documentação visual e validação dos componentes.

A Angular Library é responsável pela distribuição e reutilização dos componentes em aplicações externas.

---

## High Level Architecture

```txt
Design Tokens
      ↓

UI Components
      ↓

Storybook Documentation
      ↓

Angular Library
      ↓

Consumer Applications
```

---

## Storybook

Localização:

```txt
src/stories
```

Responsabilidades:

- Documentação visual
- Desenvolvimento isolado
- Demonstração de componentes
- Design System
- Guias de uso

Estrutura:

```txt
Introduction

Design System
Documentation
Components
```

---

## Angular Library

Localização:

```txt
projects/ui-kit
```

Responsabilidades:

- Exportação dos componentes
- Distribuição para outros projetos
- Versionamento
- Empacotamento

---

## Components

Localização:

```txt
projects/ui-kit/src/lib/components
```

Estrutura recomendada:

```txt
button/
├── ui-button.component.ts
├── ui-button.component.html
├── ui-button.component.scss
├── ui-button.stories.ts
```

---

## Design Tokens

Localização:

```txt
projects/ui-kit/src/lib/styles
```

Tokens disponíveis:

- Colors
- Typography
- Spacing
- Border Radius
- Shadows

---

## Public API

Todos os exports da library devem ser registrados em:

```txt
projects/ui-kit/src/public-api.ts
```

---

## Development Flow

```txt
Criar componente
       ↓
Criar Storybook
       ↓
Validar visualmente
       ↓
Exportar no public-api.ts
       ↓
Build da Library
       ↓
Uso em projetos externos
```

---

## Distribution Flow

```txt
ng build ui-kit
      ↓
npm pack
      ↓
model-ui-kit-x.x.x.tgz
      ↓
npm install
```
