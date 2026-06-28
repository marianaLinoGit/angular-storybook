import type { Meta, StoryObj } from '@storybook/angular';
import { UiCheckboxComponent } from './ui-checkbox.component';

const meta: Meta<UiCheckboxComponent> = {
  title: 'Components/Checkbox',
  component: UiCheckboxComponent,
  tags: ['autodocs'],
  argTypes: {
    id: {
      control: 'text',
      description:
        'Identificador único utilizado para associar o checkbox ao seu label.',
    },
    name: {
      control: 'text',
      description: 'Nome do campo enviado em formulários HTML.',
    },
    label: {
      control: 'text',
      description: 'Texto principal exibido ao lado do checkbox.',
    },
    ariaLabel: {
      control: 'text',
      description:
        'Texto acessível utilizado quando não houver um label visível.',
    },
    linkLabel: {
      control: 'text',
      description: 'Texto do link exibido após o label.',
    },
    linkUrl: {
      control: 'text',
      description: 'URL aberta ao clicar no link.',
    },
    linkTarget: {
      control: 'radio',
      options: ['_self', '_blank'],
      description:
        'Define se o link associado ao checkbox abre na mesma aba (_self) ou em uma nova aba (_blank).',
    },
    required: {
      control: 'boolean',
      description: 'Define se o campo é obrigatório.',
    },
    disabled: {
      control: 'boolean',
      description: 'Desabilita a interação com o componente.',
    },
    showError: {
      control: 'boolean',
      description:
        'Força a exibição da mensagem de erro, independentemente da validação do formulário.',
    },
    errorMessage: {
      control: 'text',
      description:
        'Mensagem de erro exibida abaixo do componente e associada via aria-describedby.',
    },
    customClass: {
      control: 'text',
      description: 'Classe CSS customizada.',
    },
    checkedChange: {
      action: 'checkedChange',
      table: {
        category: 'Events',
      },
      description: 'Evento disparado quando o estado do checkbox é alterado.',
    },
  },
};

export default meta;

type Story = StoryObj<UiCheckboxComponent>;

export const Default: Story = {
  args: {
    id: 'termsAccepted',
    name: 'termsAccepted',
    label: 'Li e aceito os',
    ariaLabel: null,
    linkLabel: 'termos de uso',
    linkUrl: '/termos-de-uso',
    linkTarget: '_blank',
    required: true,
    disabled: false,
    showError: false,
    errorMessage: '*Campo obrigatório',
    customClass: '',
  },
};

export const WithoutLink: Story = {
  args: {
    id: 'newsletter',
    name: 'newsletter',
    label: 'Desejo receber novidades por e-mail',
    ariaLabel: null,
    linkLabel: null,
    linkUrl: null,
    linkTarget: '_blank',
    required: false,
    disabled: false,
    showError: false,
    errorMessage: '*Campo obrigatório',
    customClass: '',
  },
};

export const RequiredWithError: Story = {
  args: {
    ...Default.args,
    showError: true,
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};

export const LabelOnly: Story = {
  args: {
    id: 'privacyAccepted',
    name: 'privacyAccepted',
    label: 'Aceito receber comunicações sobre novidades',
    ariaLabel: null,
    linkLabel: null,
    linkUrl: null,
    linkTarget: '_blank',
    required: false,
    disabled: false,
    showError: false,
    errorMessage: '*Campo obrigatório',
    customClass: '',
  },
};

export const AccessibleLabelOnly: Story = {
  args: {
    id: 'iconOnlyCheckbox',
    name: 'iconOnlyCheckbox',
    label: '',
    ariaLabel: 'Aceitar termos de uso',
    linkLabel: null,
    linkUrl: null,
    linkTarget: '_blank',
    required: true,
    disabled: false,
    showError: false,
    errorMessage: '*Campo obrigatório',
    customClass: '',
  },
};
