import type { Meta, StoryObj } from '@storybook/angular';
import { UiModalComponent } from './ui-modal.component';

const meta: Meta<UiModalComponent> = {
  title: 'Components/Modal',
  component: UiModalComponent,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['confirmation', 'informative', 'content'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
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
    closeLabel: 'Entendi',
    size: 'md',
    showCloseButton: true,
  },
};

export const Confirmation: Story = {
  args: {
    open: true,
    type: 'confirmation',
    title: 'Confirmar exclusão',
    description:
      'Tem certeza que deseja excluir este item? Essa ação não poderá ser desfeita.',
    confirmLabel: 'Excluir',
    cancelLabel: 'Cancelar',
    size: 'md',
    showCloseButton: true,
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
        [size]="size"
        [showCloseButton]="showCloseButton"
      >
        <div style="display: grid; gap: 12px;">
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
    size: 'lg',
    showCloseButton: true,
  },
};
