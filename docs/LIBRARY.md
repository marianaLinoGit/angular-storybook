# Angular Library

## Objetivo

A library `@marianaLinoGit/model-ui-kit` contém todos os componentes reutilizáveis do Model UI Kit, prontos para instalação em aplicações Angular externas.

---

## Estrutura

```txt
projects/ui-kit/

src/
├── lib/
│   ├── components/      # 24 componentes standalone
│   ├── design-system/   # Tipos compartilhados (UiColor, UiSize…)
│   ├── storybook/       # Helpers de teste (não exportados)
│   └── styles/          # Design Tokens (SCSS)
│
├── public-api.ts        # Exports públicos
└── package.json         # Versão e peerDependencies
```

---

## Build

```bash
ng build ui-kit
```

Resultado: `dist/ui-kit/`

---

## Gerar pacote local

```bash
cd dist/ui-kit
npm pack
```

Resultado: `marianaLinoGit-model-ui-kit-x.x.x.tgz`

---

## Instalar em outro projeto

### Pacote local (.tgz)

```bash
npm install ./marianaLinoGit-model-ui-kit-0.0.36.tgz
```

### GitHub Packages

Pacote: `@marianaLinoGit/model-ui-kit`

Configure o registry no `.npmrc` do projeto consumidor:

```txt
@marianaLinoGit:registry=https://npm.pkg.github.com
```

```bash
npm install @marianaLinoGit/model-ui-kit
```

---

## Estilos globais

Os tokens SCSS são copiados para `styles/` no build. No projeto consumidor:

```scss
@use "@marianaLinoGit/model-ui-kit/styles/index";
```

Exemplo em `src/styles.scss`:

```scss
@use "@marianaLinoGit/model-ui-kit/styles/index";
```

> Sem os estilos globais, variáveis como `--ui-color-primary` e `--ui-space-*` não estarão disponíveis.

---

## Utilizando componentes

```ts
import { Component } from '@angular/core';
import { UiButtonComponent } from '@marianaLinoGit/model-ui-kit';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UiButtonComponent],
  template: `<ui-button label="Salvar" color="primary" />`,
})
export class AppComponent {}
```

### Exemplo: Table

```ts
import {
  UiTableComponent,
  UiTableColumn,
  resolveUiTableBadge,
  getUiTableBodyCellClasses,
} from '@marianaLinoGit/model-ui-kit';
```

```html
<ui-table [columns]="columns" [total]="total" [pageIndex]="page" …>
  @for (row of rows; track row.id) {
    <tr>…</tr>
  }
</ui-table>
```

O `thead` é gerado automaticamente; as linhas são projetadas via conteúdo.

---

## Public API

Todos os exports estão em:

```txt
projects/ui-kit/src/public-api.ts
```

Componentes exportados:

Accordion, Accordion Panel, Alert, Badge, Breadcrumb, Button, Card, Checkbox, Empty State, Icon, Input, Label, Loading, Modal, Page Title, Select, Stat Card, Stat Card Grid, Switch, Table, Tabs, Toast, Tooltip.

Tipos compartilhados: `@design-system/types/ui.types` (reexportados).

---

## Fluxo ao criar componente

1. Criar componente em `projects/ui-kit/src/lib/components/`
2. Criar story em `*.stories.ts`
3. Exportar em `public-api.ts`
4. `ng build ui-kit`
5. Publicar ou empacotar

---

## Atualizando versão

Editar `projects/ui-kit/package.json`:

```json
{
  "version": "0.0.37"
}
```

Depois:

```bash
ng build ui-kit
cd dist/ui-kit
npm pack
```

---

## Compatibilidade

| Requisito | Versão |
| --------- | ------ |
| Angular   | >= 18.2 < 21 |
| TypeScript | 5.5+ |
| Standalone | Obrigatório |

Peer dependencies definidas em `projects/ui-kit/package.json`.
