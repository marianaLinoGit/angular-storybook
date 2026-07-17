import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Component, input } from '@angular/core';
import { UiFormFieldComponent } from '../form-field/ui-form-field.component';
import { UiInputComponent } from '../input/ui-input.component';
import {
  UiRadioGroupComponent,
  type UiRadioOption,
} from './ui-radio-group.component';

type UiRadioGroupStoryArgs = {
  id: string;
  name: string;
  label: string;
  ariaLabel: string | null;
  hideLabel: boolean;
  hideError: boolean;
  options: UiRadioOption[];
  orientation: 'horizontal' | 'vertical';
  allowClear: boolean;
  required: boolean;
  disabled: boolean;
  showError: boolean;
  errorMessage: string;
  customClass: string;
  value: string | null;
  valueChange?: (value: string | null) => void;
};

const glucoseOptions: UiRadioOption[] = [
  { label: 'LO', value: 'LO' },
  { label: 'HI', value: 'HI' },
];

const speciesOptions: UiRadioOption[] = [
  { label: 'Cão', value: 'dog' },
  { label: 'Gato', value: 'cat' },
  { label: 'Outro', value: 'other' },
];

const playgroundDefaults = {
  id: 'glucoseFlag',
  name: 'glucoseFlag',
  label: 'Faixa do medidor',
  ariaLabel: null as string | null,
  hideLabel: false,
  hideError: false,
  options: glucoseOptions,
  orientation: 'horizontal' as const,
  allowClear: true,
  required: false,
  disabled: false,
  showError: false,
  errorMessage: '',
  customClass: '',
  value: null as string | null,
};

@Component({
  selector: 'ui-radio-group-form-field-demo',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    UiFormFieldComponent,
    UiInputComponent,
    UiRadioGroupComponent,
  ],
  template: `
    <form class="demo" [formGroup]="form">
      <ui-form-field
        label="Glicemia"
        controlId="glucose"
        [errorMessage]="error()"
        [showError]="!!error()"
      >
        <ui-input
          id="glucose"
          type="number"
          formControlName="glucoseMgDl"
          placeholder="118"
          [min]="0"
          [hideLabel]="true"
          [hideError]="true"
        />
        <ui-radio-group
          uiFormFieldAddon
          formControlName="glucoseFlag"
          [options]="options"
          orientation="horizontal"
          [allowClear]="true"
          [hideLabel]="true"
          [hideError]="true"
          ariaLabel="LO ou HI"
        />
      </ui-form-field>
    </form>
  `,
  styles: [
    `
      .demo {
        display: grid;
        gap: var(--ui-space-4);
        max-width: 360px;
      }
    `,
  ],
})
class UiRadioGroupFormFieldDemoComponent {
  options = glucoseOptions;
  showError = input(false);

  form = new FormGroup({
    glucoseMgDl: new FormControl<number | null>(null),
    glucoseFlag: new FormControl<string | null>(null),
  });

  error(): string | null {
    if (!this.showError()) return null;
    const flag = this.form.controls.glucoseFlag.value;
    const value = this.form.controls.glucoseMgDl.value;
    if (flag || (value != null && Number.isFinite(Number(value)))) return null;
    return 'Informe a glicemia ou selecione LO/HI.';
  }
}

const meta: Meta<UiRadioGroupStoryArgs> = {
  title: 'Components/RadioGroup',
  component: UiRadioGroupComponent,
  tags: ['autodocs'],
  includeStories:
    /^(PlaygroundCompleto|Default|Vertical|WithValue|AllowClear|Disabled|WithDisabledOption|HideLabel|EmptyOptions|RequiredWithError|InsideFormField)$/,
  decorators: [
    (story) => ({
      ...story(),
      styles: [
        `
        :host {
          display: block;
          padding: var(--ui-space-4);
          max-width: 480px;
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
          'Grupo de opções mutuamente exclusivas (radio). Suporta orientação horizontal/vertical, limpar seleção e composição abaixo de um input via `uiFormFieldAddon`.\n\n' +
          '**Uso:** vincule `formControlName` ou `[value]` + `(valueChange)`. Passe `options` com `{ label, value }`.',
      },
    },
  },
  args: playgroundDefaults,
  argTypes: {
    id: { table: { category: 'Acessibilidade' } },
    name: { table: { category: 'Formulário' } },
    label: { control: 'text', table: { category: 'Conteúdo' } },
    ariaLabel: { control: 'text', table: { category: 'Acessibilidade' } },
    hideLabel: { control: 'boolean', table: { category: 'Aparência' } },
    hideError: { control: 'boolean', table: { category: 'Aparência' } },
    options: { control: 'object', table: { category: 'Conteúdo' } },
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
      table: { category: 'Aparência' },
    },
    allowClear: {
      control: 'boolean',
      description: 'Permite desmarcar a opção ativa ao clicar nela novamente.',
      table: { category: 'Formulário' },
    },
    required: { control: 'boolean', table: { category: 'Formulário' } },
    disabled: { control: 'boolean', table: { category: 'Estado' } },
    showError: { control: 'boolean', table: { category: 'Estado' } },
    errorMessage: { control: 'text', table: { category: 'Estado' } },
    customClass: { control: 'text', table: { category: 'Aparência' } },
    value: { control: 'text', table: { category: 'Formulário' } },
    valueChange: { action: 'valueChange', table: { category: 'Events' } },
  },
  render: (args) => ({
    props: args,
    template: `
      <ui-radio-group
        [id]="id"
        [name]="name"
        [label]="label"
        [ariaLabel]="ariaLabel"
        [hideLabel]="hideLabel"
        [hideError]="hideError"
        [options]="options"
        [orientation]="orientation"
        [allowClear]="allowClear"
        [required]="required"
        [disabled]="disabled"
        [showError]="showError"
        [errorMessage]="errorMessage"
        [customClass]="customClass"
        [value]="value"
        (valueChange)="value = $event; valueChange($event)"
      />
    `,
  }),
};

export default meta;
type Story = StoryObj<UiRadioGroupStoryArgs>;

export const PlaygroundCompleto: Story = {};

export const Default: Story = {
  args: {
    label: 'Espécie',
    options: speciesOptions,
    allowClear: false,
  },
};

export const Vertical: Story = {
  args: {
    label: 'Espécie',
    options: speciesOptions,
    orientation: 'vertical',
  },
};

export const WithValue: Story = {
  args: {
    label: 'Faixa do medidor',
    options: glucoseOptions,
    value: 'LO',
    allowClear: true,
  },
};

export const AllowClear: Story = {
  args: {
    label: 'Faixa do medidor',
    options: glucoseOptions,
    value: 'HI',
    allowClear: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Faixa do medidor',
    options: glucoseOptions,
    value: 'LO',
    disabled: true,
  },
};

export const WithDisabledOption: Story = {
  name: 'Opção desabilitada',
  parameters: {
    docs: {
      description: {
        story: 'Uma opção individual com `disabled: true` dentro de `options`.',
      },
    },
  },
  args: {
    label: 'Espécie',
    options: [
      { label: 'Cão', value: 'dog' },
      { label: 'Gato', value: 'cat' },
      { label: 'Outro', value: 'other', disabled: true },
    ],
    allowClear: true,
  },
};

export const HideLabel: Story = {
  name: 'Sem label visível',
  parameters: {
    docs: {
      description: {
        story:
          'Com `hideLabel=true`, use `ariaLabel` para manter o nome acessível do grupo.',
      },
    },
  },
  args: {
    label: 'Faixa do medidor',
    hideLabel: true,
    ariaLabel: 'Faixa do medidor LO ou HI',
    options: glucoseOptions,
    allowClear: true,
  },
};

export const EmptyOptions: Story = {
  name: 'Sem opções',
  parameters: {
    docs: {
      description: {
        story: 'Grupo renderizado com `options` vazio (estado de carregamento ou sem dados).',
      },
    },
  },
  args: {
    label: 'Espécie',
    options: [],
    allowClear: false,
  },
};

export const RequiredWithError: Story = {
  args: {
    label: 'Espécie',
    options: speciesOptions,
    required: true,
    showError: true,
    errorMessage: 'Selecione uma opção.',
  },
};

export const InsideFormField: Story = {
  decorators: [
    moduleMetadata({
      imports: [UiRadioGroupFormFieldDemoComponent],
    }),
  ],
  render: () => ({
    template: `<ui-radio-group-form-field-demo [showError]="true" />`,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Composição recomendada: input + `ui-radio-group` com atributo `uiFormFieldAddon` dentro de `ui-form-field`.',
      },
    },
  },
};
