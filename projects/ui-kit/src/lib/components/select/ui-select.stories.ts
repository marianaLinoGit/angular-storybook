import type { Meta, StoryObj } from '@storybook/angular';
import { selectPlaygroundPlay } from '../../storybook/play.helpers';
import type { UiSelectOption } from './ui-select.component';
import { UiSelectComponent } from './ui-select.component';

const referralOptions = [
  { value: 'INDICACAO', label: 'Indicação' },
  { value: 'REDES_SOCIAIS', label: 'Redes sociais' },
  { value: 'PESQUISA_GOOGLE', label: 'Pesquisa no Google' },
  { value: 'VETERINARIO', label: 'Veterinário' },
  { value: 'OUTRO', label: 'Outro' },
];

const tutorOptions: UiSelectOption[] = [
  { value: 'all', label: 'Todos os tutores', iconName: 'users' },
  { value: 'with-tutor', label: 'Com tutor', iconName: 'user' },
  { value: 'without-tutor', label: 'Sem tutor', iconName: 'paw' },
];

const playgroundDefaults = {
  label: 'Como conheceu?',
  ariaLabel: null as string | null,
  id: 'referralSource',
  name: 'referralSource',
  placeholder: 'Selecione',
  searchPlaceholder: 'Buscar...',
  emptyText: 'Nenhuma opção encontrada',
  options: referralOptions,
  selectedValue: null as string | number | null,
  size: 'md' as const,
  searchable: false,
  searchAriaLabel: 'Buscar opção',
  serverSearch: false,
  clearAriaLabel: 'Limpar seleção',
  allowClear: false,
  required: true,
  disabled: false,
  optionalText: 'Opcional',
  showOptionalText: true,
  labelTooltip: '',
  errorMessage: '*Campo obrigatório',
  showError: false,
  customClass: '',
};

type UiSelectStoryArgs = UiSelectComponent & {
  selectedValue: string | number | null;
};

const meta: Meta<UiSelectStoryArgs> = {
  title: 'Components/Select',
  component: UiSelectComponent,
  tags: ['autodocs'],
  includeStories:
    /^(PlaygroundCompleto|Default|Searchable|ServerSearch|WithIcons|AllowClear|RequiredWithError|Optional|Disabled|EmptyOptions|WithDisabledOption|WithoutVisibleLabel|WithLabelTooltip)$/,
  decorators: [
    (story) => ({
      ...story(),
      styles: [
        `
        :host {
          display: block;
          max-width: 420px;
          min-height: 420px;
          padding: var(--ui-space-4);
        }
        `,
      ],
    }),
  ],
  render: (args) => ({
    props: args,
    template: `
      <ui-select
        [label]="label"
        [ariaLabel]="ariaLabel"
        [id]="id"
        [name]="name"
        [placeholder]="placeholder"
        [searchPlaceholder]="searchPlaceholder"
        [emptyText]="emptyText"
        [options]="options"
        [value]="selectedValue"
        [size]="size"
        [searchable]="searchable"
        [searchAriaLabel]="searchAriaLabel"
        [serverSearch]="serverSearch"
        [clearAriaLabel]="clearAriaLabel"
        [allowClear]="allowClear"
        [required]="required"
        [disabled]="disabled"
        [optionalText]="optionalText"
        [showOptionalText]="showOptionalText"
        [labelTooltip]="labelTooltip"
        [errorMessage]="errorMessage"
        [showError]="showError"
        [customClass]="customClass"
        (valueChange)="valueChange($event)"
        (searchChange)="searchChange($event)"
      />
    `,
  }),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Select customizado com dropdown, busca opcional, ícones nas opções e suporte a limpar seleção.\n\n' +
          '**Uso:** informe `options` (array de `{ value, label }`) e vincule `[value]`. Use `labelTooltip` para ajuda contextual no label. Emite `valueChange` e `searchChange`.',
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      table: { category: 'Conteúdo' },
      description: 'Texto exibido como label do campo via `ui-label`.',
    },
    placeholder: {
      control: 'text',
      table: { category: 'Conteúdo' },
      description: 'Texto exibido quando nenhum valor está selecionado.',
    },
    searchPlaceholder: {
      control: 'text',
      table: { category: 'Conteúdo' },
      description: 'Placeholder do campo de busca interno do dropdown.',
    },
    emptyText: {
      control: 'text',
      table: { category: 'Conteúdo' },
      description: 'Texto exibido quando nenhuma opção corresponde à busca.',
    },
    options: {
      control: 'object',
      table: { category: 'Conteúdo' },
      description:
        'Lista de opções. Cada item possui `value`, `label` e opcionalmente `disabled`, `iconName` e `iconLabel`.',
    },
    optionalText: {
      control: 'text',
      table: { category: 'Conteúdo' },
      description: 'Texto exibido pelo label quando o campo é opcional.',
    },
    labelTooltip: {
      control: 'text',
      table: { category: 'Conteúdo' },
      description:
        'Texto de ajuda exibido no tooltip info ao lado do label integrado.',
    },
    errorMessage: {
      control: 'text',
      table: { category: 'Conteúdo' },
      description: 'Mensagem de erro exibida abaixo do campo.',
    },
    id: {
      control: 'text',
      table: { category: 'Formulário' },
      description: 'Identificador único do select.',
    },
    name: {
      control: 'text',
      table: { category: 'Formulário' },
      description: 'Nome do campo enviado em formulários HTML.',
    },
    selectedValue: {
      control: 'text',
      name: 'value',
      table: { category: 'Formulário' },
      description:
        'Valor atualmente selecionado. No uso real, vincule via `[value]`.',
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
      table: { category: 'Aparência' },
      description: 'Tamanho visual do select (`sm` ou `md`).',
    },
    customClass: {
      control: 'text',
      table: { category: 'Aparência' },
      description: 'Classe CSS adicional aplicada ao container.',
    },
    searchable: {
      control: 'boolean',
      table: { category: 'Estado' },
      description: 'Exibe campo de busca dentro do dropdown.',
    },
    serverSearch: {
      control: 'boolean',
      table: { category: 'Estado' },
      description:
        'Quando `true`, não filtra localmente e apenas emite `searchChange` para busca remota.',
    },
    allowClear: {
      control: 'boolean',
      table: { category: 'Estado' },
      description: 'Exibe botão para limpar a seleção atual.',
    },
    required: {
      control: 'boolean',
      table: { category: 'Estado' },
      description: 'Define se o campo é obrigatório.',
    },
    disabled: {
      control: 'boolean',
      table: { category: 'Estado' },
      description: 'Desabilita a interação com o select.',
    },
    showOptionalText: {
      control: 'boolean',
      table: { category: 'Estado' },
      description: 'Controla a exibição do texto opcional no label.',
    },
    showError: {
      control: 'boolean',
      table: { category: 'Estado' },
      description:
        'Força a exibição da mensagem de erro independentemente da validação.',
    },
    ariaLabel: {
      control: 'text',
      table: { category: 'Acessibilidade' },
      description:
        'Texto acessível utilizado quando o select não possui label visível.',
    },
    searchAriaLabel: {
      control: 'text',
      table: { category: 'Acessibilidade' },
      description: 'Texto acessível do campo de busca interno.',
    },
    clearAriaLabel: {
      control: 'text',
      table: { category: 'Acessibilidade' },
      description: 'Texto acessível do botão de limpar seleção.',
    },
    valueChange: {
      action: 'valueChange',
      table: { category: 'Events' },
      description: 'Evento disparado quando o valor selecionado muda.',
    },
    searchChange: {
      action: 'searchChange',
      table: { category: 'Events' },
      description: 'Evento disparado quando o usuário digita na busca.',
    },
  },
  args: { ...playgroundDefaults },
};

export default meta;

type Story = StoryObj<UiSelectStoryArgs>;

export const PlaygroundCompleto: Story = {
  name: 'Playground completo',
  parameters: {
    docs: {
      description: {
        story: 'Modelo interativo com **todas as opções** disponíveis nos controles.',
      },
    },
  },
  args: { ...playgroundDefaults },
  play: selectPlaygroundPlay,
};

export const Default: Story = {
  parameters: {
    docs: { description: { story: 'Select simples sem busca, com opções estáticas.' } },
  },
  args: { ...playgroundDefaults },
};

export const Searchable: Story = {
  parameters: {
    docs: { description: { story: 'Select com busca local nas opções.' } },
  },
  args: {
    ...playgroundDefaults,
    label: 'Tutor',
    id: 'tutor',
    name: 'tutor',
    placeholder: 'Selecione um tutor',
    searchPlaceholder: 'Buscar tutor...',
    options: tutorOptions,
    searchable: true,
    allowClear: true,
    required: false,
    showOptionalText: false,
  },
};

export const ServerSearch: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Busca remota: filtro local desativado, emite `searchChange` a cada digitação.',
      },
    },
  },
  args: {
    ...playgroundDefaults,
    label: 'Tutor',
    id: 'serverTutor',
    name: 'serverTutor',
    placeholder: 'Selecione um tutor',
    options: tutorOptions,
    searchable: true,
    serverSearch: true,
    allowClear: true,
    required: false,
    showOptionalText: false,
  },
};

export const WithIcons: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Opções com ícones (`iconName`) exibidos no dropdown.',
      },
    },
  },
  args: {
    ...playgroundDefaults,
    label: 'Tutor ou veterinário',
    id: 'withIcons',
    name: 'withIcons',
    placeholder: 'Selecione tutor ou veterinário',
    options: tutorOptions,
    searchable: true,
    allowClear: true,
    required: false,
    showOptionalText: false,
  },
};

export const AllowClear: Story = {
  parameters: {
    docs: { description: { story: 'Select opcional com botão para limpar seleção.' } },
  },
  args: {
    ...playgroundDefaults,
    label: 'Categoria',
    placeholder: 'Selecione uma categoria',
    allowClear: true,
    required: false,
  },
};

export const RequiredWithError: Story = {
  parameters: {
    docs: { description: { story: 'Campo obrigatório com mensagem de erro visível.' } },
  },
  args: {
    ...playgroundDefaults,
    showError: true,
  },
};

export const Optional: Story = {
  parameters: {
    docs: { description: { story: 'Campo opcional com texto "Opcional" no label.' } },
  },
  args: {
    ...playgroundDefaults,
    label: 'Categoria',
    required: false,
  },
};

export const Disabled: Story = {
  parameters: {
    docs: { description: { story: 'Select desabilitado sem interação.' } },
  },
  args: {
    ...playgroundDefaults,
    disabled: true,
  },
};

export const EmptyOptions: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Lista vazia exibindo `emptyText` ao abrir o dropdown.',
      },
    },
  },
  args: {
    ...playgroundDefaults,
    label: 'Tutor',
    placeholder: 'Selecione um tutor',
    options: [],
    searchable: true,
    allowClear: true,
    required: false,
  },
};

export const WithDisabledOption: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Opção individual desabilitada dentro da lista.',
      },
    },
  },
  args: {
    ...playgroundDefaults,
    label: 'Status',
    placeholder: 'Selecione um status',
    options: [
      { value: 'ACTIVE', label: 'Ativo' },
      { value: 'PENDING', label: 'Pendente' },
      { value: 'DISABLED', label: 'Desabilitado', disabled: true },
    ],
    allowClear: true,
    required: false,
  },
};

export const WithoutVisibleLabel: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Select sem label visível, usando `ariaLabel` para acessibilidade.',
      },
    },
  },
  args: {
    ...playgroundDefaults,
    label: '',
    ariaLabel: 'Selecione a origem do cadastro',
  },
};

export const WithLabelTooltip: Story = {
  name: 'Com tooltip no label',
  parameters: {
    docs: {
      description: {
        story:
          'Select com tooltip info no label via `labelTooltip`. O ícone info é exibido automaticamente.',
      },
    },
  },
  args: {
    ...playgroundDefaults,
    label: 'Ambiente de vida',
    id: 'livingEnvironment',
    placeholder: 'Selecione',
    required: false,
    showOptionalText: false,
    labelTooltip:
      'Descreva onde o animal passa a maior parte do tempo: dentro de casa, quintal ou rua.',
  },
};

export const IconsGallery: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Galeria de opções com diferentes ícones disponíveis.',
      },
    },
  },
  args: {
    ...playgroundDefaults,
    label: 'Ação',
    searchable: true,
    allowClear: true,
    required: false,
    options: [
      { value: 'download', label: 'Download', iconName: 'download' },
      { value: 'upload', label: 'Upload', iconName: 'upload' },
      { value: 'copy', label: 'Copy', iconName: 'copy' },
      { value: 'home', label: 'Home', iconName: 'home' },
      { value: 'filter', label: 'Filtro', iconName: 'filter' },
      { value: 'email', label: 'E-mail', iconName: 'email' },
      { value: 'phone', label: 'Telefone', iconName: 'phone' },
    ],
  },
};
