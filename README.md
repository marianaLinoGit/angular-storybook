# Model UI Kit

Model UI Kit é um Design System criado com Angular, SCSS e Storybook.

O projeto foi desenvolvido como portfólio técnico para demonstrar a construção de componentes reutilizáveis, documentação visual, Design Tokens e distribuição através de Angular Library.

---

## Tecnologias

| Tecnologia                 | Versão   |
| -------------------------- | -------- |
| Angular                    | 20.3.x   |
| Angular CLI                | 20.3.x   |
| TypeScript                 | 5.8.x    |
| Storybook                  | 9.1.x    |
| Storybook Angular          | 9.1.x    |
| Storybook Docs / A11y / Themes | 9.1.x |
| Storybook Test Runner      | 0.23.x   |
| Compodoc                   | 1.2.x    |
| RxJS                       | 7.8.x    |
| Zone.js                    | 0.15.x   |
| SCSS                       | Latest   |

---

## Objetivos

Este projeto demonstra:

- Angular moderno com Standalone Components
- Angular Signals
- Storybook para documentação visual e testes de interação
- Design Tokens com CSS Variables
- Componentização reutilizável
- Design System
- Documentação técnica
- Distribuição através de Angular Library
- Integração em aplicações externas

---

## Componentes

Atualmente a library exporta **30 componentes**:

| Categoria   | Componentes |
| ----------- | ----------- |
| Layout      | Page Title, Stat Card, Stat Card Grid, Card, Divider |
| Formulário  | Input, Textarea, Select, Checkbox, Radio Group, Switch, Label, Form Field, Field Error, File Upload |
| Feedback    | Alert, Badge, Empty State, Loading, Toast, Tooltip |
| Navegação   | Breadcrumb, Tabs, Accordion, Accordion Panel, Pagination |
| Ação        | Button, Modal |
| Dados       | Table, Icon |

Todos possuem stories no Storybook com controles interativos, autodocs, descrição de args e story **Playground completo** com testes de interação (`play`).

---

## Estrutura do Projeto

```txt
model-ui-kit/

├── .storybook/              # Configuração do Storybook
├── docs/                    # Documentação técnica (.md)
├── projects/
│   └── ui-kit/              # Angular Library (@marianaLinoGit/model-ui-kit)
│       └── src/lib/
│           ├── components/  # Componentes + *.stories.ts
│           ├── design-system/
│           ├── storybook/   # Helpers de teste (play.helpers.ts)
│           └── styles/      # Design Tokens (SCSS)
├── src/stories/             # MDX (Introduction, Tokens, Guidelines)
└── README.md
```

---

## Executando Localmente

Instalar dependências:

```bash
npm install
```

Executar Storybook:

```bash
npm run storybook
```

Acessar:

```txt
http://localhost:6006
```

---

## Testes de Interação (Storybook)

Com o Storybook em execução, em outro terminal:

```bash
npm run test-storybook
```

Executa as funções `play` das stories (visibilidade, cliques, preenchimento de campos etc.).

---

## Executando a Aplicação Angular

```bash
npm start
```

Acessar:

```txt
http://localhost:4200
```

---

## Build da Angular Library

```bash
ng build ui-kit
```

Resultado:

```txt
dist/ui-kit
```

Pacote npm: `@marianaLinoGit/model-ui-kit` (ver `projects/ui-kit/package.json` para a versão atual).

---

## Build do Storybook

```bash
npm run build-storybook
```

Resultado:

```txt
storybook-static/
```

---

## Documentação

| Arquivo | Conteúdo |
| ------- | -------- |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Estrutura interna e fluxos |
| [docs/STORYBOOK.md](docs/STORYBOOK.md) | Convenções de stories, MDX e testes |
| [docs/LIBRARY.md](docs/LIBRARY.md) | Build, instalação e uso da library |
| [projects/ui-kit/README.md](projects/ui-kit/README.md) | Guia rápido da library |

---

## Storybook Online

GitHub Pages:

```txt
https://marianalinogit.github.io/angular-storybook/
```

---

## Funcionalidades Demonstradas

### Design System

- Colors, Typography, Spacing, Border Radius, Shadows
- Tema claro/escuro (`@storybook/addon-themes`)
- Acessibilidade (`@storybook/addon-a11y`)

### Documentation

- Component API, Usage Guidelines, Roadmap (MDX)
- Autodocs com Compodoc
- Categorias de args nos controles

### Components

- Variantes, estados, responsividade
- Testes de interação via `@storybook/test`
- Paginação, ordenação e empty states (Table)

---

## Autor

### Mariana Lino

Frontend Specialist • Angular • TypeScript • Design Systems • Storybook

GitHub: [marianaLinoGit](https://github.com/marianaLinoGit)

LinkedIn: [marianalino](https://linkedin.com/in/marianalino)
