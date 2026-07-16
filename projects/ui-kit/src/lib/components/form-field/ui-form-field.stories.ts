import { Component, input, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { UiButtonComponent } from '../button/ui-button.component';
import { UiCheckboxComponent } from '../checkbox/ui-checkbox.component';
import { UiInputComponent } from '../input/ui-input.component';
import {
  UiRadioGroupComponent,
  type UiRadioOption,
} from '../radio-group/ui-radio-group.component';
import {
  UiSelectComponent,
  UiSelectOption,
} from '../select/ui-select.component';
import { UiFormFieldComponent } from './ui-form-field.component';

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
        label="Microchip"
        controlId="microchip"
        [errorMessage]="fieldError('microchip')"
        [showError]="!!fieldError('microchip')"
      >
        <ui-input
          id="microchip"
          formControlName="microchip"
          placeholder="985141000123456"
          [hideLabel]="true"
          [hideError]="true"
        />
        <ui-checkbox
          uiFormFieldAddon
          formControlName="microchipAbsent"
          label="Este pet não possui microchip"
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
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    microchip: new FormControl(''),
    microchipAbsent: new FormControl(false),
    referralSource: new FormControl('', Validators.required),
    termsAccepted: new FormControl(false, Validators.requiredTrue),
  });

  ngOnInit(): void {
    if (this.submitted()) {
      this.form.markAllAsTouched();
    }
  }

  fieldError(
    field:
      | 'email'
      | 'password'
      | 'microchip'
      | 'referralSource'
      | 'termsAccepted',
  ): string | null {
    const control = this.form.get(field);

    if (!control) {
      return null;
    }

    const show =
      this.submitted() ||
      this.localSubmitted ||
      control.dirty ||
      control.touched;

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

@Component({
  selector: 'ui-form-field-layout-situations-demo',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    UiFormFieldComponent,
    UiInputComponent,
    UiCheckboxComponent,
    UiRadioGroupComponent,
    UiButtonComponent,
  ],
  template: `
    <div class="ui-form-field-situations" [formGroup]="form">
      <section class="ui-form-field-situations__section">
        <h3>Situação 1 — Addon com checkbox</h3>
        <p>
          Conteúdo relacionado ao input via
          <code>uiFormFieldAddon</code> (abaixo do campo, mesma largura).
        </p>
        <div class="ui-form-field-grid">
          <ui-form-field label="Microchip" controlId="sit1-microchip">
            <ui-input
              id="sit1-microchip"
              formControlName="microchip"
              placeholder="985141000123456"
              [hideLabel]="true"
              [hideError]="true"
            />
            <ui-checkbox
              uiFormFieldAddon
              formControlName="microchipAbsent"
              label="Este pet não possui microchip"
              [hideError]="true"
            />
          </ui-form-field>

          <ui-form-field label="Nº registro" controlId="sit1-registry">
            <ui-input
              id="sit1-registry"
              formControlName="registry"
              placeholder="REG-001"
              [hideLabel]="true"
              [hideError]="true"
            />
          </ui-form-field>
        </div>
      </section>

      <section class="ui-form-field-situations__section">
        <h3>Situação 2 — Addon com radio group</h3>
        <p>
          Flags exclusivas (LO/HI) com
          <code>ui-radio-group</code> no addon. <code>allowClear</code> permite
          desmarcar.
        </p>
        <div class="ui-form-field-grid">
          <ui-form-field label="Glicemia" controlId="sit2-glucose">
            <ui-input
              id="sit2-glucose"
              type="number"
              formControlName="glucose"
              placeholder="118"
              [hideLabel]="true"
              [hideError]="true"
            />
            <ui-radio-group
              uiFormFieldAddon
              formControlName="glucoseFlag"
              [options]="glucoseFlagOptions"
              orientation="horizontal"
              [allowClear]="true"
              [hideLabel]="true"
              [hideError]="true"
              ariaLabel="Flag de glicemia"
            />
          </ui-form-field>

          <ui-form-field label="Dose (UI)" controlId="sit2-dose">
            <ui-input
              id="sit2-dose"
              type="number"
              formControlName="dose"
              placeholder="2"
              [hideLabel]="true"
              [hideError]="true"
            />
          </ui-form-field>
        </div>
      </section>

      <section class="ui-form-field-situations__section">
        <h3>Situação 3 — Alinhamento no grid com addon</h3>
        <p>
          Use <code>ui-form-field-grid</code> (ou
          <code>align-items: start</code>). Labels e inputs ficam na mesma
          linha; o addon só alonga o campo que precisa. Ações irmãs usam
          <code>ui-form-field-row__action</code> /
          <code>--ui-form-field-control-offset</code>.
        </p>
        <div class="ui-form-field-grid">
          <ui-form-field label="Peso (kg)" controlId="sit3-weight">
            <ui-input
              id="sit3-weight"
              type="number"
              formControlName="weight"
              placeholder="12.5"
              [hideLabel]="true"
              [hideError]="true"
            />
          </ui-form-field>

          <ui-form-field label="Temperatura (°C)" controlId="sit3-temp">
            <ui-input
              id="sit3-temp"
              type="number"
              formControlName="temp"
              placeholder="38.5"
              [hideLabel]="true"
              [hideError]="true"
            />
            <ui-checkbox
              uiFormFieldAddon
              formControlName="tempLo"
              label="LOW/LO (sem temperatura)"
              [hideError]="true"
            />
          </ui-form-field>

          <ui-form-field label="FC (bpm)" controlId="sit3-hr">
            <ui-input
              id="sit3-hr"
              type="number"
              formControlName="heartRate"
              placeholder="90"
              [hideLabel]="true"
              [hideError]="true"
            />
          </ui-form-field>

          <div class="ui-form-field-row">
            <ui-form-field label="Horário" controlId="sit3-time">
              <ui-input
                id="sit3-time"
                type="time"
                formControlName="measuredAt"
                [hideLabel]="true"
                [hideError]="true"
              />
            </ui-form-field>
            <div class="ui-form-field-row__action">
              <ui-button
                type="button"
                color="primary"
                size="sm"
                [outline]="true"
                label="Agora"
              />
            </div>
          </div>
        </div>
      </section>

      <section class="ui-form-field-situations__section">
        <h3>Situação 4 — Campo sem label alinhado ao vizinho com label</h3>
        <p>
          Sem <code>label</code>, o field recebe
          <code>ui-form-field--no-label</code>. No
          <code>ui-form-field-grid</code> que também tem campos com label, o
          campo sem label ganha
          <code>padding-top: var(--ui-form-field-control-offset)</code> para o
          input ficar na mesma linha do input vizinho. Fora do grid, use a
          classe opt-in <code>ui-form-field--align-control</code> (via
          <code>customClass</code>).
        </p>

        <div class="ui-form-field-grid">
          <div class="ui-form-field-row">
            <ui-form-field label="Horário" controlId="sit4-time-labeled">
              <ui-input
                id="sit4-time-labeled"
                type="time"
                formControlName="timeLabeled"
                [hideLabel]="true"
                [hideError]="true"
              />
            </ui-form-field>
            <div class="ui-form-field-row__action">
              <ui-button
                type="button"
                color="primary"
                size="sm"
                [outline]="true"
                label="Agora"
              />
            </div>
          </div>

          <div class="ui-form-field-row">
            <ui-form-field controlId="sit4-time-unlabeled">
              <ui-input
                id="sit4-time-unlabeled"
                type="time"
                formControlName="timeUnlabeled"
                ariaLabel="Horário da medição"
                [hideLabel]="true"
                [hideError]="true"
              />
            </ui-form-field>
            <div class="ui-form-field-row__action">
              <ui-button
                type="button"
                color="primary"
                size="sm"
                [outline]="true"
                label="Agora"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [
    `
      /* Story desktop: 2 situações (grids) por linha */
      .ui-form-field-situations {
        display: grid;
        gap: var(--ui-space-6) var(--ui-space-5);
        width: 100%;
        max-width: 1200px;
      }

      .ui-form-field-situations__section {
        display: grid;
        gap: var(--ui-space-3);
        min-width: 0;
        align-content: start;
      }

      /* Dentro de cada situação, 2 campos por linha (versão desktop) */
      .ui-form-field-situations__section .ui-form-field-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .ui-form-field-situations__section h3 {
        margin: 0;
        font-family: var(--ui-font-family-title);
        font-size: var(--ui-font-size-lg);
        color: var(--ui-color-text);
      }

      .ui-form-field-situations__section h4 {
        margin: 0 0 var(--ui-space-2);
        font-family: var(--ui-font-family-text);
        font-size: var(--ui-font-size-sm);
        font-weight: var(--ui-font-weight-semibold);
        color: var(--ui-color-muted);
      }

      .ui-form-field-situations__section p {
        margin: 0;
        font-size: var(--ui-font-size-sm);
        color: var(--ui-color-muted);
        line-height: 1.45;
      }

      .ui-form-field-situations__section code {
        font-size: var(--ui-font-size-xs);
        color: var(--ui-color-text);
      }
    `,
  ],
})
class UiFormFieldLayoutSituationsDemoComponent {
  glucoseFlagOptions: UiRadioOption[] = [
    { label: 'LO', value: 'LO' },
    { label: 'HI', value: 'HI' },
  ];

  form = new FormGroup({
    microchip: new FormControl('985141000123456'),
    microchipAbsent: new FormControl(false),
    registry: new FormControl('REG-001'),
    glucose: new FormControl<number | null>(118),
    glucoseFlag: new FormControl<'LO' | 'HI' | null>(null),
    dose: new FormControl<number | null>(2),
    weight: new FormControl<number | null>(12.5),
    temp: new FormControl<number | null>(38.5),
    tempLo: new FormControl(false),
    heartRate: new FormControl<number | null>(90),
    measuredAt: new FormControl('10:30'),
    timeLabeled: new FormControl('10:30'),
    timeUnlabeled: new FormControl('10:30'),
  });
}

const meta: Meta<UiFormFieldPlaygroundComponent> = {
  title: 'Components/Form Field',
  component: UiFormFieldPlaygroundComponent,
  tags: ['autodocs'],
  includeStories:
    /^(PlaygroundCompleto|Default|WithErrors|WithLabelTooltip|LayoutSituations)$/,
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
          'Wrapper de formulário que centraliza label, hint, tooltip no label, erro e acessibilidade para `ui-input`, `ui-select`, `ui-checkbox` e `ui-radio-group`.\n\n' +
          '**Uso:** envolva o controle filho e passe `label`, `controlId`, `labelTooltip`, `errorMessage` e `showError`. No controle filho, use `[hideLabel]="true"` e `[hideError]="true"`.\n\n' +
          '**Addon (`uiFormFieldAddon`):** conteúdo relacionado fica logo abaixo do input, na largura do campo (checkbox “não possui”, radios LO/HI, etc.).\n\n' +
          '**Layout:**\n' +
          '- Grid: `ui-form-field-grid` (ou `align-items: start`) para manter labels/inputs alinhados quando um campo tem addon.\n' +
          '- Ação irmã: `ui-form-field-row` + `ui-form-field-row__action` (usa `--ui-form-field-control-offset`).\n' +
          '- Sem label ao lado de campos com label: o field ganha `ui-form-field--no-label` e, no `ui-form-field-grid`, recebe o mesmo offset no topo para o input alinhar com o vizinho. Opt-in fora do grid: `customClass="ui-form-field--align-control"`.',
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

export const WithLabelTooltip: StoryObj<UiFormFieldLabelTooltipDemoComponent> =
  {
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

export const LayoutSituations: StoryObj<UiFormFieldLayoutSituationsDemoComponent> =
  {
    name: 'Layouts (situações 1–4)',
    render: () => ({
      template: `<ui-form-field-layout-situations-demo />`,
    }),
    decorators: [
      moduleMetadata({
        imports: [UiFormFieldLayoutSituationsDemoComponent],
      }),
      (story) => ({
        ...story(),
        styles: [
          `
          :host {
            display: block;
            width: 100%;
            min-width: 1100px;
            padding: var(--ui-space-4);
            box-sizing: border-box;
          }
          `,
        ],
      }),
    ],
    parameters: {
      layout: 'fullscreen',
      docs: {
        description: {
          story:
            'Desktop: **2 `ui-form-field-grid` por linha** (situações 1|2 e 3|4). Dentro de cada grid, também 2 campos lado a lado.\n\n**1** Addon checkbox · **2** Addon radio · **3** Grid com addon + ação · **4** Campo sem label alinhado ao vizinho com label.',
        },
      },
    },
  };
