import type { Meta, StoryObj } from '@storybook/angular';
import { UiSelectComponent } from './ui-select.component';

const referralOptions = [
  { value: 'INDICACAO', label: 'Indicação' },
  { value: 'REDES_SOCIAIS', label: 'Redes sociais' },
  { value: 'PESQUISA_GOOGLE', label: 'Pesquisa no Google' },
  { value: 'VETERINARIO', label: 'Veterinário' },
  { value: 'OUTRO', label: 'Outro' },
];

const tutorOptions = [
  { value: '1', label: 'Mariana Lino — mariana&#64;email.com' },
  { value: '2', label: 'João Silva — joao&#64;email.com' },
  { value: '3', label: 'Ana Souza — ana&#64;email.com' },
  { value: '4', label: 'Pedro Santos — pedro&#64;email.com' },
];

const meta: Meta<UiSelectComponent> = {
  title: 'Components/Select',
  component: UiSelectComponent,
  tags: ['autodocs'],
  decorators: [
    (story) => ({
      ...story(),
      styles: [
        `
          :host {
            display: block;
            min-height: 150px;
            padding: 24px 24px 300px;
            max-width: 420px;
          }
        `,
      ],
    }),
  ],
  argTypes: {
    label: {
      control: 'text',
      description: 'Texto exibido como label do campo.',
    },
    ariaLabel: {
      control: 'text',
      description:
        'Texto acessível utilizado quando o select não possui label visível.',
    },
    id: {
      control: 'text',
      description: 'Identificador único do select.',
    },
    name: {
      control: 'text',
      description: 'Nome do campo enviado em formulários HTML.',
    },
    placeholder: {
      control: 'text',
      description: 'Texto exibido quando nenhum valor está selecionado.',
    },
    searchPlaceholder: {
      control: 'text',
      description: 'Placeholder do campo de busca interno.',
    },
    emptyText: {
      control: 'text',
      description: 'Texto exibido quando nenhuma opção é encontrada.',
    },
    options: {
      control: 'object',
      description:
        'Lista de opções do select. Cada opção possui label, value e opcionalmente disabled.',
    },
    searchable: {
      control: 'boolean',
      description: 'Exibe campo de busca dentro do dropdown.',
    },
    serverSearch: {
      control: 'boolean',
      description:
        'Quando true, não filtra localmente e apenas emite searchChange.',
    },
    allowClear: {
      control: 'boolean',
      description: 'Permite limpar o valor selecionado.',
    },
    required: {
      control: 'boolean',
      description: 'Define se o campo é obrigatório.',
    },
    disabled: {
      control: 'boolean',
      description: 'Desabilita a interação com o select.',
    },
    optionalText: {
      control: 'text',
      description:
        'Texto exibido pelo componente Label quando o campo é opcional.',
    },
    showOptionalText: {
      control: 'boolean',
      description: 'Controla a exibição do texto opcional.',
    },
    errorMessage: {
      control: 'text',
      description: 'Mensagem de erro exibida e associada via aria-describedby.',
    },
    showError: {
      control: 'boolean',
      description:
        'Força a exibição da mensagem de erro independentemente da validação do formulário.',
    },
    customClass: {
      control: 'text',
      description: 'Classe CSS customizada.',
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
};

export default meta;

type Story = StoryObj<UiSelectComponent>;

export const Default: Story = {
  args: {
    label: 'Como conheceu?',
    ariaLabel: null,
    id: 'referralSource',
    name: 'referralSource',
    placeholder: 'Selecione',
    searchPlaceholder: 'Buscar...',
    emptyText: 'Nenhuma opção encontrada',
    options: referralOptions,
    searchable: false,
    serverSearch: false,
    allowClear: false,
    required: true,
    disabled: false,
    optionalText: 'Opcional',
    showOptionalText: true,
    errorMessage: '*Campo obrigatório',
    showError: false,
    customClass: '',
  },
};

export const Searchable: Story = {
  args: {
    ...Default.args,
    label: 'Tutor',
    id: 'tutor',
    name: 'tutor',
    placeholder: 'Selecione um tutor',
    searchPlaceholder: 'Buscar tutor...',
    options: tutorOptions,
    searchable: true,
    serverSearch: false,
    allowClear: true,
    required: false,
    showOptionalText: false,
  },
};

export const ServerSearch: Story = {
  args: {
    ...Searchable.args,
    id: 'serverTutor',
    name: 'serverTutor',
    searchable: true,
    serverSearch: true,
    allowClear: true,
  },
};

export const AllowClear: Story = {
  args: {
    ...Default.args,
    label: 'Categoria',
    placeholder: 'Selecione uma categoria',
    allowClear: true,
    required: false,
  },
};

export const RequiredWithError: Story = {
  args: {
    ...Default.args,
    showError: true,
  },
};

export const Optional: Story = {
  args: {
    ...Default.args,
    label: 'Categoria',
    required: false,
    optionalText: 'Opcional',
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};

export const EmptyOptions: Story = {
  args: {
    ...Default.args,
    label: 'Tutor',
    placeholder: 'Selecione um tutor',
    searchPlaceholder: 'Buscar tutor...',
    emptyText: 'Nenhum tutor encontrado',
    options: [],
    searchable: true,
    allowClear: true,
    required: false,
  },
};

export const WithDisabledOption: Story = {
  args: {
    ...Default.args,
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
  args: {
    ...Default.args,
    label: '',
    ariaLabel: 'Selecione a origem do cadastro',
  },
};
