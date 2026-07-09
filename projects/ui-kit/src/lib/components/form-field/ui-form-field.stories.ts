import { Component, input, OnInit } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UiButtonComponent } from '../button/ui-button.component';
import { UiCheckboxComponent } from '../checkbox/ui-checkbox.component';
import { UiFormFieldComponent } from './ui-form-field.component';
import { UiInputComponent } from '../input/ui-input.component';
import { UiSelectComponent, UiSelectOption } from '../select/ui-select.component';

@Component({
  selector: 'ui-form-field-playground',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    UiFormFieldComponent,
    UiInputComponent,
    UiSelectComponent,
    UiCheckboxComponent,
    UiButtonComponent,
  ],
  template: `
    <form class="ui-form-field-demo" [formGroup]="form" (ngSubmit)="submit()">
      <ui-form-field
        label="E-mail"
        controlId="email"
        hint="Usaremos este e-mail para login."
        [errorMessage]="fieldError('email')"
        [showError]="!!fieldError('email')"
      >
        <ui-input
          id="email"
          formControlName="email"
          type="email"
          placeholder="seu@email.com"
          [hideLabel]="true"
          [hideError]="true"
        />
      </ui-form-field>

      <ui-form-field
        label="Senha"
        controlId="password"
        [errorMessage]="fieldError('password')"
        [showError]="!!fieldError('password')"
      >
        <ui-input
          id="password"
          formControlName="password"
          type="password"
          placeholder="********"
          [hideLabel]="true"
          [hideError]="true"
        />
      </ui-form-field>

      <ui-form-field
        label="Como nos conheceu?"
        controlId="referralSource"
        labelTooltip="Ajuda a entender de onde veio o cadastro."
        [errorMessage]="fieldError('referralSource')"
        [showError]="!!fieldError('referralSource')"
      >
        <ui-select
          id="referralSource"
          formControlName="referralSource"
          placeholder="Selecione"
          [options]="referralOptions"
          [hideLabel]="true"
          [hideError]="true"
        />
      </ui-form-field>

      <ui-form-field
        [errorMessage]="fieldError('termsAccepted')"
        [showError]="!!fieldError('termsAccepted')"
      >
        <ui-checkbox
          id="termsAccepted"
          formControlName="termsAccepted"
          label="Aceito os termos de uso"
          linkLabel="Ler termos"
          linkUrl="#"
          [hideError]="true"
        />
      </ui-form-field>

      <ui-button type="submit" label="Entrar" color="primary" />
    </form>
  `,
  styles: [
    `
      .ui-form-field-demo {
        display: grid;
        gap: var(--ui-space-4);
        width: 100%;
        max-width: 420px;
      }
    `,
  ],
})
class UiFormFieldPlaygroundComponent implements OnInit {
  submitted = input(false);
  private localSubmitted = false;

  referralOptions: UiSelectOption[] = [
    { label: 'Indicação', value: 'INDICACAO' },
    { label: 'Redes sociais', value: 'REDES_SOCIAIS' },
    { label: 'Google', value: 'PESQUISA_GOOGLE' },
  ];

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    referralSource: new FormControl('', Validators.required),
    termsAccepted: new FormControl(false, Validators.requiredTrue),
  });

  ngOnInit(): void {
    if (this.submitted()) {
      this.form.markAllAsTouched();
    }
  }

  fieldError(field: 'email' | 'password' | 'referralSource' | 'termsAccepted'): string | null {
    const control = this.form.get(field);

    if (!control) {
      return null;
    }

    const show =
      this.submitted() || this.localSubmitted || control.dirty || control.touched;

    if (!show || !control.errors) {
      return null;
    }

    if (control.errors['required'] || control.errors['requiredTrue']) {
      return '*Campo obrigatório';
    }

    if (control.errors['email']) {
      return '*E-mail inválido';
    }

    if (control.errors['minlength']) {
      return '*Mínimo de 8 caracteres';
    }

    return '*Valor inválido';
  }

  submit(): void {
    this.localSubmitted = true;
    this.form.markAllAsTouched();
  }
}

@Component({
  selector: 'ui-form-field-label-tooltip-demo',
  standalone: true,
  imports: [UiFormFieldComponent, UiInputComponent, UiSelectComponent],
  template: `
    <div class="ui-form-field-demo">
      <ui-form-field
        label="Alimentação"
        controlId="feeding-form-field"
        labelTooltip="Nome da ração ou descrição de comida natural"
        [showOptionalText]="false"
      >
        <ui-input
          id="feeding-form-field"
          placeholder="Nome da ração ou alimentação habitual"
          [hideLabel]="true"
          [hideError]="true"
        />
      </ui-form-field>

      <ui-form-field
        label="Ambiente de vida"
        controlId="livingEnvironment-form-field"
        labelTooltip="Onde o animal passa a maior parte do tempo."
        [showOptionalText]="false"
      >
        <ui-select
          id="livingEnvironment-form-field"
          placeholder="Selecione"
          [options]="livingEnvironmentOptions"
          [hideLabel]="true"
          [hideError]="true"
        />
      </ui-form-field>

      <ui-input
        label="Observações"
        id="notes-standalone"
        placeholder="Informações adicionais"
        labelTooltip="Texto livre para detalhes que não se encaixam nos outros campos."
        [showOptionalText]="false"
      />
    </div>
  `,
  styles: [
    `
      .ui-form-field-demo {
        display: grid;
        gap: var(--ui-space-4);
        width: 100%;
        max-width: 420px;
      }
    `,
  ],
})
class UiFormFieldLabelTooltipDemoComponent {
  livingEnvironmentOptions: UiSelectOption[] = [
    { label: 'Indoor — dentro de casa apenas', value: 'indoor_only' },
    { label: 'Outdoor — quintal', value: 'outdoor_yard_only' },
    { label: 'Misto — dentro e fora de casa', value: 'mixed_no_street_access' },
  ];
}

const meta: Meta<UiFormFieldPlaygroundComponent> = {
  title: 'Components/Form Field',
  component: UiFormFieldPlaygroundComponent,
  tags: ['autodocs'],
  includeStories: /^(PlaygroundCompleto|Default|WithErrors|WithLabelTooltip)$/,
  decorators: [
    moduleMetadata({
      imports: [UiFormFieldPlaygroundComponent],
    }),
    (story) => ({
      ...story(),
      styles: [
        `
        :host {
          display: block;
          padding: var(--ui-space-4);
        }
        `,
      ],
    }),
  ],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Wrapper de formulário que centraliza label, hint, tooltip no label, erro e acessibilidade para `ui-input`, `ui-select` e `ui-checkbox`.\n\n' +
          '**Uso:** envolva o controle filho e passe `label`, `controlId`, `labelTooltip`, `errorMessage` e `showError`. No controle filho, use `[hideLabel]="true"` e `[hideError]="true"`.',
      },
    },
  },
  argTypes: {
    submitted: {
      control: 'boolean',
      table: { category: 'Estado' },
      description: 'Simula envio do formulário para exibir erros.',
    },
  },
  args: {
    submitted: false,
  },
};

export default meta;

type Story = StoryObj<UiFormFieldPlaygroundComponent>;

export const PlaygroundCompleto: Story = {
  name: 'Playground completo',
  args: { submitted: false },
};

export const Default: Story = {
  args: { submitted: false },
};

export const WithErrors: Story = {
  name: 'Com erros',
  args: { submitted: true },
};

export const WithLabelTooltip: StoryObj<UiFormFieldLabelTooltipDemoComponent> = {
  name: 'Com tooltip no label',
  render: () => ({
    template: `<ui-form-field-label-tooltip-demo />`,
  }),
  decorators: [
    moduleMetadata({
      imports: [UiFormFieldLabelTooltipDemoComponent],
    }),
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Exemplos de `labelTooltip` no wrapper `ui-form-field` (input e select) e no `ui-input` standalone.',
      },
    },
  },
};
