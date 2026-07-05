import type { Meta, StoryObj } from '@storybook/angular';
import { alertPlaygroundPlay } from '../../storybook/play.helpers';
import { UiAlertComponent } from './ui-alert.component';

const playgroundDefaults = {
  title: 'Informação',
  message: 'Mensagem informativa para o usuário.',
  closeAriaLabel: 'Fechar alerta',
  color: 'info' as const,
  variant: 'soft' as const,
  size: 'md' as const,
  showIcon: true,
  closable: true,
  fixed: false,
  position: 'top' as const,
  customClass: '',
};

const meta: Meta<UiAlertComponent> = {
  title: 'Components/Alert',
  component: UiAlertComponent,
  tags: ['autodocs'],
  includeStories: /^(PlaygroundCompleto|Info|Success|Warning|Danger|Solid|Outline|WithoutIcon|WithoutTitle|NotClosable|FixedTop|FixedBottom)$/,
  decorators: [
    (story) => ({
      ...story(),
      styles: [
        `
        :host {
          display: block;
          max-width: 480px;
          padding: var(--ui-space-4);
        }
        `,
      ],
    }),
  ],
  argTypes: {
    title: {
      control: 'text',
      table: { category: 'Conteúdo' },
      description: 'Título opcional do alerta.',
    },
    message: {
      control: 'text',
      table: { category: 'Conteúdo' },
      description: 'Mensagem principal exibida no alerta.',
    },
    closeAriaLabel: {
      control: 'text',
      table: { category: 'Acessibilidade' },
      description:
        'Texto acessível utilizado no botão de fechar para leitores de tela.',
    },
    color: {
      control: 'select',
      table: { category: 'Aparência' },
      options: ['success', 'warning', 'danger', 'info'],
      description:
        'Cor semântica do alerta, usada para representar sucesso, atenção, erro ou informação.',
    },
    variant: {
      control: 'select',
      table: { category: 'Aparência' },
      options: ['soft', 'solid', 'outline'],
      description: 'Variação visual aplicada ao alerta.',
    },
    size: {
      control: 'select',
      table: { category: 'Aparência' },
      options: ['sm', 'md', 'lg'],
      description: 'Tamanho visual do componente.',
    },
    showIcon: {
      control: 'boolean',
      table: { category: 'Estado' },
      description: 'Exibe ou oculta o ícone semântico do alerta.',
    },
    closable: {
      control: 'boolean',
      table: { category: 'Estado' },
      description: 'Exibe ou oculta o botão para fechar o alerta.',
    },
    fixed: {
      control: 'boolean',
      table: { category: 'Estado' },
      description:
        'Define se o alerta deve permanecer fixo na tela ou seguir o fluxo da página.',
    },
    position: {
      control: 'radio',
      table: { category: 'Estado' },
      options: ['top', 'bottom'],
      description:
        'Posição do alerta quando a propriedade fixed estiver habilitada.',
    },
    customClass: {
      control: 'text',
      table: { category: 'Aparência' },
      description: 'Classe CSS customizada adicionada ao componente.',
    },
    closed: {
      action: 'closed',
      table: {
        category: 'Events',
      },
      description:
        'Evento disparado quando o usuário fecha o alerta pelo botão de fechar.',
    },
  },
  args: { ...playgroundDefaults },
};

export default meta;

type Story = StoryObj<UiAlertComponent>;

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
  play: alertPlaygroundPlay,
};

export const Info: Story = {
  args: { ...playgroundDefaults },
};

export const Success: Story = {
  args: {
    title: 'Sucesso',
    message: 'Operação realizada com sucesso.',
    closeAriaLabel: 'Fechar alerta',
    color: 'success',
    variant: 'soft',
    size: 'md',
    showIcon: true,
    closable: true,
    fixed: false,
    position: 'top',
    customClass: '',
  },
};

export const Warning: Story = {
  args: {
    title: 'Atenção',
    message: 'Revise as informações antes de continuar.',
    closeAriaLabel: 'Fechar alerta',
    color: 'warning',
    variant: 'soft',
    size: 'md',
    showIcon: true,
    closable: true,
    fixed: false,
    position: 'top',
    customClass: '',
  },
};

export const Danger: Story = {
  args: {
    title: 'Erro',
    message: 'Não foi possível salvar os dados.',
    closeAriaLabel: 'Fechar alerta',
    color: 'danger',
    variant: 'soft',
    size: 'md',
    showIcon: true,
    closable: true,
    fixed: false,
    position: 'top',
    customClass: '',
  },
};

export const Solid: Story = {
  args: {
    title: 'Alerta sólido',
    message: 'Essa variação usa fundo preenchido.',
    closeAriaLabel: 'Fechar alerta',
    color: 'info',
    variant: 'solid',
    size: 'md',
    showIcon: true,
    closable: true,
    fixed: false,
    position: 'top',
    customClass: '',
  },
};

export const Outline: Story = {
  args: {
    title: 'Alerta outline',
    message: 'Essa variação usa borda e fundo neutro.',
    closeAriaLabel: 'Fechar alerta',
    color: 'success',
    variant: 'outline',
    size: 'md',
    showIcon: true,
    closable: true,
    fixed: false,
    position: 'top',
    customClass: '',
  },
};

export const WithoutIcon: Story = {
  args: {
    title: 'Sem ícone',
    message: 'Esse alerta é exibido sem ícone inicial.',
    closeAriaLabel: 'Fechar alerta',
    color: 'info',
    variant: 'soft',
    size: 'md',
    showIcon: false,
    closable: true,
    fixed: false,
    position: 'top',
    customClass: '',
  },
};

export const WithoutTitle: Story = {
  args: {
    title: '',
    message: 'Esse alerta possui apenas mensagem.',
    closeAriaLabel: 'Fechar alerta',
    color: 'warning',
    variant: 'soft',
    size: 'md',
    showIcon: true,
    closable: true,
    fixed: false,
    position: 'top',
    customClass: '',
  },
};

export const NotClosable: Story = {
  args: {
    title: 'Alerta fixo',
    message: 'Esse alerta não possui botão para fechar.',
    closeAriaLabel: 'Fechar alerta',
    color: 'danger',
    variant: 'soft',
    size: 'md',
    showIcon: true,
    closable: false,
    fixed: false,
    position: 'top',
    customClass: '',
  },
};

export const FixedTop: Story = {
  args: {
    title: 'Topo da tela',
    message: 'Alerta fixo no topo da tela.',
    closeAriaLabel: 'Fechar alerta',
    color: 'info',
    variant: 'soft',
    size: 'md',
    showIcon: true,
    closable: true,
    fixed: true,
    position: 'top',
    customClass: '',
  },
};

export const FixedBottom: Story = {
  args: {
    title: 'Rodapé da tela',
    message: 'Alerta fixo na parte inferior da tela.',
    closeAriaLabel: 'Fechar alerta',
    color: 'success',
    variant: 'soft',
    size: 'md',
    showIcon: true,
    closable: true,
    fixed: true,
    position: 'bottom',
    customClass: '',
  },
};
