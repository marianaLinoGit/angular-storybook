import type { Meta, StoryObj } from '@storybook/angular';
import { UiInputComponent } from './ui-input.component';

const meta: Meta<UiInputComponent> = {
  title: 'Components/Input',
  component: UiInputComponent,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Texto exibido como label do campo.',
    },
    ariaLabel: {
      control: 'text',
      description:
        'Texto acessível utilizado quando o campo não possui label visível.',
    },
    id: {
      control: 'text',
      description: 'Identificador único do campo.',
    },
    name: {
      control: 'text',
      description: 'Nome do campo enviado em formulários HTML.',
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
      description: 'Tipo nativo do elemento input.',
    },
    placeholder: {
      control: 'text',
      description: 'Texto de exemplo exibido quando o campo está vazio.',
    },
    autocomplete: {
      control: 'text',
      description:
        'Valor do atributo autocomplete para auxiliar o preenchimento automático do navegador.',
    },
    inputMode: {
      control: 'text',
      description:
        'Sugere o tipo de teclado em dispositivos móveis (text, email, numeric, tel etc.).',
    },
    required: {
      control: 'boolean',
      description: 'Define se o campo é obrigatório.',
    },
    readonly: {
      control: 'boolean',
      description: 'Permite visualizar o valor sem possibilitar edição.',
    },
    disabled: {
      control: 'boolean',
      description: 'Desabilita a interação com o campo.',
    },
    optionalText: {
      control: 'text',
      description:
        'Texto exibido pelo componente Label quando o campo é opcional.',
    },
    showOptionalText: {
      control: 'boolean',
      description: 'Controla a exibição do texto de campo opcional.',
    },
    errorMessage: {
      control: 'text',
      description:
        'Mensagem exibida quando o campo está inválido. Também é utilizada por leitores de tela através de aria-describedby.',
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
      table: {
        category: 'Events',
      },
      description: 'Evento disparado sempre que o valor do campo é alterado.',
    },
  },
};

export default meta;

type Story = StoryObj<UiInputComponent>;

export const Default: Story = {
  args: {
    label: 'Nome completo',
    ariaLabel: null,
    id: 'fullName',
    name: 'fullName',
    type: 'text',
    placeholder: 'Seu nome',
    autocomplete: 'name',
    inputMode: null,
    required: true,
    readonly: false,
    disabled: false,
    optionalText: 'Opcional',
    showOptionalText: true,
    errorMessage: '*Campo obrigatório',
    showError: false,
    customClass: '',
  },
};

export const Email: Story = {
  args: {
    ...Default.args,
    label: 'E-mail',
    id: 'email',
    name: 'email',
    type: 'email',
    placeholder: 'seu@email.com',
    autocomplete: 'email',
    inputMode: 'email',
  },
};

export const Password: Story = {
  args: {
    ...Default.args,
    label: 'Senha',
    id: 'password',
    name: 'password',
    type: 'password',
    placeholder: 'Mínimo 8 caracteres',
    autocomplete: 'new-password',
  },
};

export const Optional: Story = {
  args: {
    ...Default.args,
    label: 'Nome preferido',
    id: 'preferredName',
    name: 'preferredName',
    placeholder: 'Como deseja ser chamado',
    required: false,
    optionalText: 'Opcional',
    showOptionalText: true,
  },
};

export const RequiredWithError: Story = {
  args: {
    ...Default.args,
    showError: true,
    errorMessage: '*Campo obrigatório',
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};

export const ReadOnly: Story = {
  args: {
    ...Default.args,
    readonly: true,
    label: 'Código do usuário',
    placeholder: '',
  },
};

export const Search: Story = {
  args: {
    ...Default.args,
    label: 'Pesquisar',
    id: 'search',
    name: 'search',
    type: 'search',
    placeholder: 'Buscar...',
    autocomplete: 'off',
    inputMode: 'search',
    required: false,
  },
};

export const WithoutVisibleLabel: Story = {
  args: {
    ...Default.args,
    label: '',
    ariaLabel: 'Pesquisar componentes',
    id: 'searchComponents',
    name: 'searchComponents',
    type: 'search',
    placeholder: 'Buscar...',
    autocomplete: 'off',
    inputMode: 'search',
    required: false,
  },
};
