# Angular Library

## Objetivo

A library contém todos os componentes reutilizáveis do Model UI Kit.

---

## Estrutura

```txt
projects/ui-kit

src/
├── lib
│   ├── components
│   ├── design-system
│   └── styles
│
├── public-api.ts
└── package.json
```

---

## Build

Gerar build da library:

```bash
ng build ui-kit
```

Resultado:

```txt
dist/ui-kit
```

---

## Gerar pacote local

Após o build:

```bash
cd dist/ui-kit

npm pack
```

Resultado:

```txt
model-ui-kit-0.0.1.tgz
```

---

## Instalar em outro projeto

```bash
npm install ../model-ui-kit-0.0.1.tgz
```

---

## Utilizando componentes

```ts
import { UiButtonComponent } from "model-ui-kit";
```

```ts
@Component({
  standalone: true,
  imports: [UiButtonComponent],
})
export class AppComponent {}
```

```html
<ui-button label="Salvar" />
```

---

## Utilizando estilos

```scss
@use "model-ui-kit/src/lib/styles/index";
```

---

## Atualizando versão

Editar:

```txt
projects/ui-kit/package.json
```

```json
{
  "version": "0.0.2"
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

- Angular 18+
- Standalone Components
- TypeScript 5.5+
