# Model UI Kit Library

Biblioteca Angular contendo os componentes reutilizáveis do Design System.

---

# Build

Gerar build da library:

```bash
ng build ui-kit
```

Resultado:

```txt
dist/ui-kit
```

---

# Gerar pacote instalável

Após o build:

```bash
cd dist/ui-kit
npm pack
```

Será gerado:

```txt
model-ui-kit-0.0.1.tgz
```

---

# Instalação em outro projeto

Instalar o pacote:

```bash
npm install ./model-ui-kit-0.0.1.tgz
```

ou

```bash
npm install ../path/model-ui-kit-0.0.1.tgz
```

---

# Importando estilos globais

No projeto consumidor:

```scss
@use "model-ui-kit/styles/index";
```

Exemplo:

```scss
/* src/styles.scss */

@use "model-ui-kit/styles/index";
```

---

# Utilizando componentes

Exemplo:

```ts
import { Component } from "@angular/core";

import { UiButtonComponent } from "model-ui-kit";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [UiButtonComponent],
  templateUrl: "./app.component.html",
})
export class AppComponent {}
```

---

Template:

```html
<ui-button label="Salvar" variant="primary" />
```

---

# Public API

Todos os exports da library são centralizados em:

```txt
projects/ui-kit/src/public-api.ts
```

Ao criar um novo componente:

1. Criar componente
2. Exportar no public-api.ts
3. Executar build novamente

---

# Atualizando versão

Alterar:

```json
{
  "version": "0.0.1"
}
```

em:

```txt
projects/ui-kit/package.json
```

Depois:

```bash
ng build ui-kit

cd dist/ui-kit

npm pack
```

Gerará um novo pacote:

```txt
model-ui-kit-0.0.2.tgz
```

---

# Requisitos

Compatível com:

- Angular 18+
- Standalone Components
- TypeScript 5.5+

```

```
