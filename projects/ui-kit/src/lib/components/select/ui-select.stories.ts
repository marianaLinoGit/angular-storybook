import type { Meta, StoryObj } from '@storybook/angular';
import { UiSelectComponent } from './ui-select.component';

const referralOptions = [
  { value: 'INDICACAO', label: 'Indicação' },
  { value: 'REDES_SOCIAIS', label: 'Redes sociais' },
  { value: 'PESQUISA_GOOGLE', label: 'Pesquisa no Google' },
  { value: 'VETERINARIO', label: 'Veterinário' },
  { value: 'OUTRO', label: 'Outro' },
];

const meta: Meta<UiSelectComponent> = {
  title: 'Components/Select',
  component: UiSelectComponent,
  tags: ['autodocs'],
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
      description: 'Opção inicial exibida antes da seleção.',
    },
    options: {
      control: 'object',
      description:
        'Lista de opções do select. Cada opção possui label, value e opcionalmente disabled.',
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
    options: referralOptions,
    required: true,
    disabled: false,
    optionalText: 'Opcional',
    showOptionalText: true,
    errorMessage: '*Campo obrigatório',
    showError: false,
    customClass: '',
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

export const WithoutVisibleLabel: Story = {
  args: {
    ...Default.args,
    label: '',
    ariaLabel: 'Selecione a origem do cadastro',
  },
};
