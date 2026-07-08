import type { Meta, StoryObj } from '@storybook/angular';
import { modalPlaygroundPlay } from '../../storybook/play.helpers';
import { UiModalComponent } from './ui-modal.component';

const playgroundDefaults = {
  open: true,
  type: 'informative' as const,
  title: 'Informação importante',
  description:
    'Esse modal exibe uma mensagem informativa com apenas um botão.',
  icon: 'info' as const,
  confirmLabel: 'Confirmar',
  cancelLabel: 'Cancelar',
  closeLabel: 'Entendi',
  closeAriaLabel: 'Fechar modal',
  size: 'md' as const,
  showCloseButton: true,
  closeOnBackdrop: true,
  closeOnEscape: true,
  presentationMode: 'inline' as const,
  customClass: '',
};

const meta: Meta<UiModalComponent> = {
  title: 'Components/Modal',
  component: UiModalComponent,
  tags: ['autodocs'],
  includeStories:
    /^(PlaygroundCompleto|Informative|Confirmation|Delete|Content|WithoutIcon)$/,
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: {
        height: '640px',
      },
    },
  },
  argTypes: {
    open: {
      control: 'boolean',
      table: { category: 'Estado' },
      description: 'Controla se o modal deve iniciar aberto.',
    },
    type: {
      control: 'select',
      options: ['informative', 'confirmation', 'delete', 'content'],
      table: { category: 'Comportamento' },
      description:
        'Define o comportamento: informativo (1 botão), confirmação (cancelar + confirmar), exclusão (ícone delete + botão danger) ou conteúdo (sem footer).',
    },
    title: {
      control: 'text',
      table: { category: 'Conteúdo' },
      description:
        'Título principal do modal. Também é usado como referência acessível via aria-labelledby.',
    },
    description: {
      control: 'text',
      table: { category: 'Conteúdo' },
      description:
        'Descrição opcional do modal. Quando informada, é associada via aria-describedby.',
    },
    icon: {
      control: 'text',
      table: { category: 'Conteúdo' },
      description:
        'Ícone ao lado do título. Ignorado quando type="delete" (usa ícone delete automaticamente).',
    },
    confirmLabel: {
      control: 'text',
      table: { category: 'Conteúdo' },
      description: 'Texto do botão de confirmação ou exclusão.',
    },
    cancelLabel: {
      control: 'text',
      table: { category: 'Conteúdo' },
      description: 'Texto do botão de cancelamento.',
    },
    closeLabel: {
      control: 'text',
      table: { category: 'Conteúdo' },
      description: 'Texto do botão principal em modais informativos.',
    },
    closeAriaLabel: {
      control: 'text',
      table: { category: 'Acessibilidade' },
      description: 'Texto acessível do botão de fechar no cabeçalho.',
    },
    showCloseButton: {
      control: 'boolean',
      table: { category: 'Comportamento' },
      description: 'Exibe ou oculta o botão de fechar no cabeçalho.',
    },
    closeOnBackdrop: {
      control: 'boolean',
      table: { category: 'Comportamento' },
      description: 'Permite fechar o modal ao clicar fora do conteúdo.',
    },
    closeOnEscape: {
      control: 'boolean',
      table: { category: 'Comportamento' },
      description: 'Permite fechar o modal pressionando a tecla Escape.',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      table: { category: 'Aparência' },
      description: 'Tamanho visual do modal.',
    },
    presentationMode: {
      control: 'radio',
      options: ['inline', 'fixed'],
      table: { category: 'Aparência' },
      description:
        'Modo de apresentação. Use inline para documentação e fixed para uso real em tela.',
    },
    customClass: {
      control: 'text',
      table: { category: 'Aparência' },
      description: 'Classe CSS customizada.',
    },
    confirmed: {
      action: 'confirmed',
      table: { category: 'Events' },
      description: 'Evento disparado ao confirmar uma ação.',
    },
    cancelled: {
      action: 'cancelled',
      table: { category: 'Events' },
      description: 'Evento disparado ao cancelar uma ação.',
    },
    closed: {
      action: 'closed',
      table: { category: 'Events' },
      description: 'Evento disparado ao fechar o modal.',
    },
  },
  args: { ...playgroundDefaults },
};

export default meta;

type Story = StoryObj<UiModalComponent>;

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
  play: modalPlaygroundPlay,
};

export const Informative: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Modal informativo: um botão principal (`closeLabel`) e ícone opcional.',
      },
    },
  },
  args: {
    ...playgroundDefaults,
  },
};

export const Confirmation: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Modal de confirmação: cancelar + confirmar com botão primary. Ícone customizável.',
      },
    },
  },
  args: {
    ...playgroundDefaults,
    type: 'confirmation',
    presentationMode: 'fixed',
    title: 'Confirmar ação',
    description: 'Tem certeza que deseja continuar? Revise as informações antes de confirmar.',
    icon: 'warning',
    confirmLabel: 'Confirmar',
    cancelLabel: 'Cancelar',
  },
};

export const Delete: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Modal de exclusão: usa sempre o ícone `delete`, cancelar + botão de ação em `danger`. O input `icon` é ignorado.',
      },
    },
  },
  args: {
    ...playgroundDefaults,
    type: 'delete',
    presentationMode: 'fixed',
    title: 'Excluir registro?',
    description:
      'Essa ação não pode ser desfeita. O registro será removido permanentemente.',
    icon: 'warning',
    confirmLabel: 'Excluir',
    cancelLabel: 'Cancelar',
  },
};

export const Content: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Modal de conteúdo: sem footer, ideal para formulários ou conteúdo projetado.',
      },
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <ui-modal
        [open]="open"
        [type]="type"
        [title]="title"
        [description]="description"
        [icon]="icon"
        [confirmLabel]="confirmLabel"
        [cancelLabel]="cancelLabel"
        [closeLabel]="closeLabel"
        [closeAriaLabel]="closeAriaLabel"
        [size]="size"
        [showCloseButton]="showCloseButton"
        [closeOnBackdrop]="closeOnBackdrop"
        [closeOnEscape]="closeOnEscape"
        [presentationMode]="presentationMode"
        [customClass]="customClass"
      >
        <div style="display: grid; gap: 12px; margin-top: 16px;">
          <strong>Conteúdo customizado via ng-content</strong>
          <p>Esse espaço pode receber formulários, listas, imagens ou qualquer outro conteúdo.</p>
          <input placeholder="Exemplo de campo" style="padding: 10px; border: 1px solid #ddd; border-radius: 8px;" />
        </div>
      </ui-modal>
    `,
  }),
  args: {
    ...playgroundDefaults,
    type: 'content',
    title: 'Modal de conteúdo',
    description: 'Modal sem footer, ideal para conteúdo customizado.',
    icon: 'package',
    size: 'lg',
  },
};

export const WithoutIcon: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Modal informativo sem ícone ao lado do título (`icon=null`).',
      },
    },
  },
  args: {
    ...playgroundDefaults,
    title: 'Modal sem ícone',
    description: 'Esse exemplo não possui ícone ao lado do título.',
    icon: null,
    closeLabel: 'Fechar',
  },
};
