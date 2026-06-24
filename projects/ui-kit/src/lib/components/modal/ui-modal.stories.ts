import type { Meta, StoryObj } from '@storybook/angular';
import { UiModalComponent } from './ui-modal.component';

const meta: Meta<UiModalComponent> = {
  title: 'Components/Modal',
  component: UiModalComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: {
        height: '640px',
      },
    },
  },
  argTypes: {
    open: { control: 'boolean' },
    type: {
      control: 'select',
      options: ['confirmation', 'informative', 'content'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    presentationMode: {
      control: 'radio',
      options: ['inline'],
    },
    title: { control: 'text' },
    description: { control: 'text' },
    icon: { control: 'text' },
    confirmLabel: { control: 'text' },
    cancelLabel: { control: 'text' },
    closeLabel: { control: 'text' },
    showCloseButton: { control: 'boolean' },
    customClass: { control: 'text' },
    confirmed: {
      action: 'confirmed',
      table: { category: 'Events' },
    },
    cancelled: {
      action: 'cancelled',
      table: { category: 'Events' },
    },
    closed: {
      action: 'closed',
      table: { category: 'Events' },
    },
  },
};

export default meta;

type Story = StoryObj<UiModalComponent>;

export const Informative: Story = {
  args: {
    open: true,
    type: 'informative',
    title: 'Informação importante',
    description:
      'Esse modal exibe uma mensagem informativa com apenas um botão.',
    icon: 'ℹ️',
    closeLabel: 'Entendi',
    size: 'md',
    showCloseButton: true,
    presentationMode: 'inline',
    customClass: '',
  },
};

export const Confirmation: Story = {
  args: {
    open: true,
    type: 'confirmation',
    title: 'Confirmar exclusão',
    description:
      'Tem certeza que deseja excluir este item? Essa ação não poderá ser desfeita.',
    icon: '⚠️',
    confirmLabel: 'Excluir',
    cancelLabel: 'Cancelar',
    size: 'md',
    showCloseButton: true,
    presentationMode: 'inline',
    customClass: '',
  },
};

export const Content: Story = {
  render: (args) => ({
    props: args,
    template: `
      <ui-modal
        [open]="open"
        [type]="type"
        [title]="title"
        [description]="description"
        [icon]="icon"
        [size]="size"
        [showCloseButton]="showCloseButton"
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
    open: true,
    type: 'content',
    title: 'Modal de conteúdo',
    description: 'Modal sem footer, ideal para conteúdo customizado.',
    icon: '🧩',
    size: 'lg',
    showCloseButton: true,
    presentationMode: 'inline',
    customClass: '',
  },
};

export const WithoutIcon: Story = {
  args: {
    open: true,
    type: 'informative',
    title: 'Modal sem ícone',
    description: 'Esse exemplo não possui ícone ao lado do título.',
    icon: '',
    closeLabel: 'Fechar',
    size: 'md',
    showCloseButton: true,
    presentationMode: 'inline',
    customClass: '',
  },
};
