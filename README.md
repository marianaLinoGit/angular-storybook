# Model UI Kit

Model UI Kit é um Design System criado com Angular, SCSS e Storybook.

O projeto foi desenvolvido como portfólio técnico para demonstrar a construção de componentes reutilizáveis, documentação visual, Design Tokens e distribuição através de Angular Library.

---

## Tecnologias

| Tecnologia        | Versão  |
| ----------------- | ------- |
| Angular           | 18.2.x  |
| Angular CLI       | 18.2.21 |
| TypeScript        | 5.5.x   |
| Storybook         | 8.6.14  |
| Storybook Angular | 8.6.14  |
| Storybook Docs    | 8.6.14  |
| Storybook A11y    | 8.6.14  |
| RxJS              | 7.8.x   |
| Zone.js           | 0.14.x  |
| SCSS              | Latest  |

---

## Objetivos

Este projeto demonstra:

- Angular moderno com Standalone Components
- Angular Signals
- Storybook para documentação visual
- Design Tokens com CSS Variables
- Componentização reutilizável
- Design System
- Documentação técnica
- Distribuição através de Angular Library
- Integração em aplicações externas

---

## Componentes

Atualmente o projeto possui os seguintes componentes:

- Accordion
- Alert
- Breadcrumb
- Button
- Card
- Empty State
- Loading
- Modal
- Tabs
- Toast
- Tooltip

Todos os componentes possuem documentação visual, exemplos de uso, controles interativos e demonstrações de estados através do Storybook.

---

## Estrutura do Projeto

```txt
model-ui-kit/

├── .storybook/
│
├── docs/
│   ├── ARCHITECTURE.md
│   ├── LIBRARY.md
│   └── STORYBOOK.md
│
├── projects/
│   └── ui-kit/
│
├── src/
│   └── stories/
│
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

Gerar build da library:

```bash
ng build ui-kit
```

Resultado:

```txt
dist/ui-kit
```

---

## Build do Storybook

Gerar versão estática:

```bash
npm run build-storybook
```

Resultado:

```txt
storybook-static/
```

---

## Documentação

### Arquitetura

Documentação da estrutura interna do projeto:

```txt
docs/ARCHITECTURE.md
```

---

### Storybook

Organização da documentação visual:

```txt
docs/STORYBOOK.md
```

---

### Angular Library

Distribuição e utilização da library:

```txt
docs/LIBRARY.md
```

---

## Storybook Online

GitHub Pages:

```txt
https://marianalinogit.github.io/angular-storybook/
```

---

## Funcionalidades Demonstradas

### Design System

- Colors
- Typography
- Spacing
- Border Radius
- Shadows
- Accessibility

### Documentation

- Component API
- Usage Guidelines
- Roadmap

### Components

- Componentes reutilizáveis
- Estados visuais
- Variantes
- Responsividade
- Acessibilidade
- Documentação MDX

---

## Autor

### Mariana Lino

Frontend Specialist • Angular • TypeScript • Design Systems • Storybook

GitHub:

```txt
https://github.com/marianaLinoGit
```

LinkedIn:

```txt
https://linkedin.com/in/marianalino
```
