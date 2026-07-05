import type { Meta, StoryObj } from '@storybook/angular';
import { accordionPanelPlaygroundPlay } from '../../storybook/play.helpers';
import type { UiIconName } from '../icon/ui-icon.component';
import { UiAccordionPanelComponent } from './ui-accordion-panel.component';

const panelDemoContent = `
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
`;

const playgroundDefaults = {
  id: 'filters',
  title: 'Filtros',
  icon: 'search' as UiIconName,
  badge: '12 pets',
  badgeType: 'default' as const,
  disabled: false,
  open: true,
  allowOverflow: false,
};

const meta: Meta<UiAccordionPanelComponent> = {
  title: 'Components/Accordion Panel',
  component: UiAccordionPanelComponent,
  tags: ['autodocs'],
  includeStories:
    /^(PlaygroundCompleto|Default|Closed|WithoutBadge|WithoutIcon|Disabled)$/,
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
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Painel expansível individual com título, ícone, badge e conteúdo projetado via `ng-content`.\n\n' +
          '**Uso:** informe `id` e `title`. Vincule `[(open)]` para controlar o estado. Emite `openedChange` ao alternar.',
      },
    },
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
        [allowOverflow]="allowOverflow"
        [(open)]="open"
        (openedChange)="openedChange($event)"
      >
        ${panelDemoContent}
      </ui-accordion-panel>
    `,
  }),
  argTypes: {
    id: {
      control: 'text',
      table: { category: 'Formulário' },
      description:
        'Identificador único do painel. Usado nos IDs de acessibilidade do trigger e do painel.',
    },
    title: {
      control: 'text',
      table: { category: 'Conteúdo' },
      description: 'Título exibido no cabeçalho clicável do painel.',
    },
    icon: {
      control: 'text',
      table: { category: 'Conteúdo' },
      description:
        'Ícone ou emoji opcional exibido antes do título.',
    },
    badge: {
      control: 'text',
      table: { category: 'Conteúdo' },
      description:
        'Texto ou número exibido como badge (`ui-badge`) ao lado do título. Quando `null`, não é exibido.',
    },
    badgeType: {
      control: 'select',
      options: ['default', 'danger', 'warning', 'success', 'info'],
      table: { category: 'Aparência' },
      description: 'Variação semântica de cor do badge.',
    },
    open: {
      control: 'boolean',
      table: { category: 'Estado' },
      description:
        'Estado aberto/fechado do painel. Suporta two-way binding com `[(open)]`.',
    },
    disabled: {
      control: 'boolean',
      table: { category: 'Estado' },
      description: 'Impede abrir ou fechar o painel.',
    },
    allowOverflow: {
      control: 'boolean',
      table: { category: 'Estado' },
      description:
        'Quando `true`, permite que dropdowns e popovers dentro do painel ultrapassem os limites do container.',
    },
    openedChange: {
      action: 'openedChange',
      table: { category: 'Events' },
      description: 'Evento disparado quando o painel é aberto ou fechado.',
    },
  },
  args: { ...playgroundDefaults },
};

export default meta;

type Story = StoryObj<UiAccordionPanelComponent>;

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
  play: accordionPanelPlaygroundPlay,
};

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Painel aberto com ícone, badge e formulário de filtros no conteúdo.',
      },
    },
  },
  args: { ...playgroundDefaults },
};

export const Closed: Story = {
  parameters: {
    docs: { description: { story: 'Painel iniciando fechado.' } },
  },
  args: {
    ...playgroundDefaults,
    id: 'closed',
    title: 'Filtros fechados',
    open: false,
  },
};

export const WithoutBadge: Story = {
  parameters: {
    docs: { description: { story: 'Painel sem badge no cabeçalho.' } },
  },
  args: {
    ...playgroundDefaults,
    id: 'without-badge',
    title: 'Sem badge',
    badge: null,
  },
};

export const WithoutIcon: Story = {
  parameters: {
    docs: { description: { story: 'Painel apenas com título e badge.' } },
  },
  args: {
    ...playgroundDefaults,
    id: 'without-icon',
    title: 'Sem ícone',
    icon: null,
  },
};

export const Disabled: Story = {
  parameters: {
    docs: { description: { story: 'Painel desabilitado, sem interação.' } },
  },
  args: {
    ...playgroundDefaults,
    id: 'disabled',
    title: 'Painel desabilitado',
    disabled: true,
    open: false,
  },
};

export const TutorFilterExample: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Exemplo de filtro por tutor com badge informativo.',
      },
    },
  },
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
          <p style="margin: 0;">Nenhum tutor selecionado.</p>

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
  parameters: {
    docs: {
      description: {
        story: 'Composição de múltiplos painéis empilhados, como em telas de filtro.',
      },
    },
  },
  render: () => ({
    template: `
      <div style="display: grid; gap: 12px;">
        <ui-accordion-panel
          id="pet-filters"
          title="Filtros de pets"
          icon="search"
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
