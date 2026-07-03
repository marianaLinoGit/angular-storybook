import type { Meta, StoryObj } from '@storybook/angular';
import { UiAccordionPanelComponent } from './ui-accordion-panel.component';

const meta: Meta<UiAccordionPanelComponent> = {
  title: 'Components/Accordion Panel',
  component: UiAccordionPanelComponent,
  tags: ['autodocs'],
  argTypes: {
    id: {
      control: 'text',
      description: 'Identificador único usado para acessibilidade.',
    },
    title: {
      control: 'text',
      description: 'Título exibido no cabeçalho do painel.',
    },
    icon: {
      control: 'text',
      description: 'Ícone opcional exibido antes do título.',
    },
    badge: {
      control: 'text',
      description: 'Badge opcional exibido ao lado do título.',
    },
    badgeType: {
      control: 'select',
      options: ['default', 'danger', 'warning', 'success', 'info'],
      description: 'Variação visual do badge.',
    },
    disabled: {
      control: 'boolean',
      description: 'Desabilita a abertura/fechamento do painel.',
    },
    open: {
      control: 'boolean',
      description: 'Controla o estado aberto/fechado do painel.',
    },
    openedChange: {
      action: 'openedChange',
      table: {
        category: 'Events',
      },
    },
  },
};

export default meta;

type Story = StoryObj<UiAccordionPanelComponent>;

export const Default: Story = {
  args: {
    id: 'filters',
    title: 'Filtros',
    icon: '🔎',
    badge: '12 pets',
    badgeType: 'default',
    disabled: false,
    open: true,
  },
  render: (args) => ({
    props: args,
    template: `
            <ui-accordion-panel
                [id]="id"
                [title]="title"
                [icon]="icon"
                [badge]="badge"
                [badgeType]="badgeType"
                [disabled]="disabled"
                [(open)]="open"
                (openedChange)="openedChange($event)"
            >
                <div style="display: grid; gap: 12px;">
                    <label>
                        Nome
                        <input
                            style="width: 100%; padding: 10px; border-radius: 8px; border: 1px solid #ddd;"
                            placeholder="Buscar por nome"
                        />
                    </label>

                    <label>
                        Espécie
                        <select
                            style="width: 100%; padding: 10px; border-radius: 8px; border: 1px solid #ddd;"
                        >
                            <option>Cachorro</option>
                            <option>Gato</option>
                            <option>Outro</option>
                        </select>
                    </label>
                </div>
            </ui-accordion-panel>
        `,
  }),
};

export const Closed: Story = {
  args: {
    ...Default.args,
    id: 'closed',
    title: 'Filtros fechados',
    open: false,
  },
};

export const WithoutBadge: Story = {
  args: {
    ...Default.args,
    id: 'without-badge',
    title: 'Sem badge',
    badge: null,
    open: true,
  },
};

export const WithoutIcon: Story = {
  args: {
    ...Default.args,
    id: 'without-icon',
    title: 'Sem ícone',
    icon: null,
    open: true,
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    id: 'disabled',
    title: 'Painel desabilitado',
    disabled: true,
    open: false,
  },
};

export const TutorFilterExample: Story = {
  render: () => ({
    template: `
          <ui-accordion-panel
              id="tutor-filter"
              title="Selecionar tutor"
              icon="👤"
              badge="18 pets"
              badgeType="info"
              [open]="true"
          >
              <div style="display: grid; gap: 12px;">
                  <p style="margin: 0;">
                      Nenhum tutor selecionado.
                  </p>

                  <select
                      style="width: 100%; padding: 10px; border-radius: 8px; border: 1px solid #ddd;"
                  >
                      <option>Selecione um tutor</option>
                      <option>Mariana Lino — mariana&#64;email.com</option>
                      <option>João Silva — joao&#64;email.com</option>
                  </select>
              </div>
          </ui-accordion-panel>
      `,
  }),
};

export const MultiplePanelsExample: Story = {
  render: () => ({
    template: `
            <div style="display: grid; gap: 12px;">
                <ui-accordion-panel
                    id="pet-filters"
                    title="Filtros de pets"
                    icon="🔎"
                    badge="12 pets"
                    badgeType="default"
                    [open]="true"
                >
                    <div style="display: grid; gap: 12px;">
                        <input
                            style="width: 100%; padding: 10px; border-radius: 8px; border: 1px solid #ddd;"
                            placeholder="Buscar por nome do pet"
                        />

                        <select
                            style="width: 100%; padding: 10px; border-radius: 8px; border: 1px solid #ddd;"
                        >
                            <option>Espécie</option>
                            <option>Cachorro</option>
                            <option>Gato</option>
                        </select>
                    </div>
                </ui-accordion-panel>

                <ui-accordion-panel
                    id="tutor-filter"
                    title="Selecionar tutor"
                    icon="👤"
                    badge="18 pets"
                    badgeType="info"
                    [open]="false"
                >
                    <div style="display: grid; gap: 12px;">
                        <p style="margin: 0;">Nenhum tutor selecionado.</p>

                        <select
                            style="width: 100%; padding: 10px; border-radius: 8px; border: 1px solid #ddd;"
                        >
                            <option>Selecione um tutor</option>
                            <option>Mariana Lino — mariana&#64;email.com</option>
                        </select>
                    </div>
                </ui-accordion-panel>
            </div>
        `,
  }),
};
