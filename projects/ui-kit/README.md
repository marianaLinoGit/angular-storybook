# @marianaLinoGit/model-ui-kit

Biblioteca Angular com os componentes reutilizáveis do Model UI Kit.

Versão atual: ver `package.json` neste diretório.

---

## Build

```bash
ng build ui-kit
```

Resultado: `dist/ui-kit/`

---

## Gerar pacote instalável

```bash
cd dist/ui-kit
npm pack
```

Gera: `marianaLinoGit-model-ui-kit-x.x.x.tgz`

---

## Instalação

### Arquivo local

Após `npm pack` em `dist/ui-kit`:

```bash
npm install ./marianaLinoGit-model-ui-kit-0.0.97.tgz
```

(Substitua a versão pelo arquivo gerado.)

### GitHub Packages

`.npmrc` do projeto consumidor:

```txt
@marianaLinoGit:registry=https://npm.pkg.github.com
```

```bash
npm install @marianaLinoGit/model-ui-kit@^0.0.97
```

---

## Estilos globais

Obrigatório para que tokens e tipografia funcionem:

```scss
/* src/styles.scss */
@use "@marianaLinoGit/model-ui-kit/styles/index";
```

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

### Table (projeção de linhas)

```ts
import {
  UiTableComponent,
  UiTableColumn,
} from '@marianaLinoGit/model-ui-kit';
```

```html
<ui-table
  [columns]="columns"
  [total]="total"
  [pageIndex]="page"
  [pageSize]="pageSize"
  (pageIndexChange)="onPageChange($event)"
>
  @for (row of rows; track row.id) {
    <tr>
      <td>{{ row.name }}</td>
    </tr>
  }
</ui-table>
```

Helpers exportados: `resolveUiTableBadge`, `getUiTableBodyCellClasses`.

---

## Public API

Exports centralizados em:

```txt
src/public-api.ts
```

Ao criar um novo componente:

1. Implementar em `src/lib/components/`
2. Criar `*.stories.ts`
3. Adicionar export em `public-api.ts`
4. Executar `ng build ui-kit`

---

## Atualizando versão

1. Alterar `"version"` em `package.json`
2. `ng build ui-kit`
3. `cd dist/ui-kit && npm pack` (ou publicar)

---

## Requisitos

- Angular >= 18.2 < 21
- Standalone Components
- TypeScript 5.5+
