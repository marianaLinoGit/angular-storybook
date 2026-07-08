import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { tabsPlaygroundPlay } from '../../storybook/play.helpers';
import { UiTabComponent } from './ui-tab.component';
import { UiTabsComponent } from './ui-tabs.component';

const playgroundDefaults = {
  ariaLabel: 'Navegação por abas',
  activeId: 'overview',
  variant: 'underline' as const,
};

const defaultTabsTemplate = `
  <ui-tabs
    [ariaLabel]="ariaLabel"
    [variant]="variant"
    [(activeId)]="activeId"
    (tabChange)="tabChange($event)"
  >
    <ui-tab id="overview" label="Overview">
      <p style="margin: 0; color: var(--ui-color-muted); line-height: 1.6">
        Conteúdo da aba Overview.
      </p>
    </ui-tab>
    <ui-tab id="details" label="Detalhes">
      <p style="margin: 0; color: var(--ui-color-muted); line-height: 1.6">
        Conteúdo da aba Detalhes.
      </p>
    </ui-tab>
    <ui-tab id="settings" label="Configurações">
      <p style="margin: 0; color: var(--ui-color-muted); line-height: 1.6">
        Conteúdo da aba Configurações.
      </p>
    </ui-tab>
  </ui-tabs>
`;

const meta: Meta<UiTabsComponent> = {
  title: 'Components/Tabs',
  component: UiTabsComponent,
  decorators: [
    moduleMetadata({
      imports: [UiTabsComponent, UiTabComponent],
    }),
  ],
  tags: ['autodocs'],
  includeStories:
    /^(PlaygroundCompleto|Default|WithCounts|Card|RichContent|WithDisabled|InitialDisabledFallback)$/,
  argTypes: {
    activeId: {
      control: 'text',
      table: { category: 'Estado' },
      description: 'ID da aba ativa. Suporta two-way binding com [(activeId)].',
    },
    initialActiveId: {
      control: 'text',
      table: { category: 'Estado' },
      description:
        'ID da aba ativa inicial quando activeId não está definido.',
    },
    variant: {
      control: 'inline-radio',
      options: ['underline', 'card'],
      table: { category: 'Aparência' },
      description:
        'Estilo das abas: "underline" (texto + sublinhado) ou "card" (cartões com ícone acima do texto e fundo sólido na ativa).',
    },
    ariaLabel: {
      control: 'text',
      table: { category: 'Acessibilidade' },
      description: 'Texto acessível para identificar o conjunto de abas.',
    },
    tabChange: {
      action: 'tabChange',
      table: { category: 'Events' },
      description: 'Evento disparado quando uma aba é selecionada.',
    },
  },
  args: { ...playgroundDefaults },
};

export default meta;

type Story = StoryObj<UiTabsComponent>;

export const PlaygroundCompleto: Story = {
  name: 'Playground completo',
  parameters: {
    docs: {
      description: {
        story:
          'Modelo interativo com **todas as opções** disponíveis nos controles. O conteúdo de cada aba é projetado via `<ui-tab>`.',
      },
    },
  },
  args: { ...playgroundDefaults },
  render: (args) => ({
    props: args,
    template: defaultTabsTemplate,
  }),
  play: tabsPlaygroundPlay,
};

export const Default: Story = {
  args: { ...playgroundDefaults },
  render: (args) => ({
    props: args,
    template: defaultTabsTemplate,
  }),
};

export const WithCounts: Story = {
  render: () => ({
    template: `
      <ui-tabs ariaLabel="Filtros por status" activeId="all">
        <ui-tab id="all" label="Todos" [count]="24">
          <p style="margin: 0; color: var(--ui-color-muted)">Todos os itens.</p>
        </ui-tab>
        <ui-tab id="active" label="Ativos" [count]="12">
          <p style="margin: 0; color: var(--ui-color-muted)">Itens ativos.</p>
        </ui-tab>
        <ui-tab id="archived" label="Arquivados" [count]="3">
          <p style="margin: 0; color: var(--ui-color-muted)">Itens arquivados.</p>
        </ui-tab>
      </ui-tabs>
    `,
  }),
};

export const Card: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Variante "card": cada aba é um cartão com ícone acima do texto e fundo sólido na aba ativa.',
      },
    },
  },
  render: () => ({
    template: `
      <ui-tabs variant="card" ariaLabel="Visões do peso" activeId="summary">
        <ui-tab id="summary" label="Resumo" icon="weight">
          <p style="margin: 0; color: var(--ui-color-muted)">Resumo do peso.</p>
        </ui-tab>
        <ui-tab id="chart" label="Gráfico" icon="glucose-comparison">
          <p style="margin: 0; color: var(--ui-color-muted)">Gráfico de evolução.</p>
        </ui-tab>
        <ui-tab id="timeline" label="Timeline" icon="config">
          <p style="margin: 0; color: var(--ui-color-muted)">Linha do tempo.</p>
        </ui-tab>
        <ui-tab id="stats" label="Estatísticas" icon="exam">
          <p style="margin: 0; color: var(--ui-color-muted)">Estatísticas.</p>
        </ui-tab>
        <ui-tab id="events" label="Eventos" icon="add-note">
          <p style="margin: 0; color: var(--ui-color-muted)">Eventos registrados.</p>
        </ui-tab>
      </ui-tabs>
    `,
  }),
};

export const RichContent: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Cada `<ui-tab>` aceita componentes e formulários projetados — ideal para telas como peso, configurações, etc.',
      },
    },
  },
  render: () => ({
    template: `
      <ui-tabs variant="card" ariaLabel="Peso do pet" activeId="form">
        <ui-tab id="form" label="Registrar" icon="add-note">
          <form style="display: grid; gap: 12px; max-width: 320px; padding-top: 16px">
            <label style="display: grid; gap: 4px">
              <span>Peso (kg)</span>
              <input type="number" step="0.01" placeholder="12.50" />
            </label>
            <label style="display: grid; gap: 4px">
              <span>Data</span>
              <input type="date" />
            </label>
            <button type="button">Salvar</button>
          </form>
        </ui-tab>
        <ui-tab id="history" label="Histórico" icon="config">
          <ul style="margin: 16px 0 0; padding-left: 20px; color: var(--ui-color-muted)">
            <li>12,50 kg — 01/07/2026</li>
            <li>12,30 kg — 15/06/2026</li>
            <li>12,10 kg — 01/06/2026</li>
          </ul>
        </ui-tab>
      </ui-tabs>
    `,
  }),
};

export const WithDisabled: Story = {
  render: () => ({
    template: `
      <ui-tabs ariaLabel="Abas com item desabilitado" activeId="available">
        <ui-tab id="available" label="Disponível">
          <p style="margin: 0; color: var(--ui-color-muted)">Essa aba está disponível.</p>
        </ui-tab>
        <ui-tab id="disabled" label="Desabilitada" [disabled]="true">
          <p style="margin: 0; color: var(--ui-color-muted)">Essa aba não pode ser aberta.</p>
        </ui-tab>
        <ui-tab id="other" label="Outra aba">
          <p style="margin: 0; color: var(--ui-color-muted)">Outra aba disponível.</p>
        </ui-tab>
      </ui-tabs>
    `,
  }),
};

export const InitialDisabledFallback: Story = {
  render: () => ({
    template: `
      <ui-tabs ariaLabel="Fallback de aba inicial" initialActiveId="blocked">
        <ui-tab id="blocked" label="Bloqueada" [disabled]="true">
          <p style="margin: 0; color: var(--ui-color-muted)">
            Essa aba não deve abrir inicialmente.
          </p>
        </ui-tab>
        <ui-tab id="first-available" label="Primeira disponível">
          <p style="margin: 0; color: var(--ui-color-muted)">
            Como a inicial estava desabilitada, esta aba é exibida.
          </p>
        </ui-tab>
        <ui-tab id="second-available" label="Segunda disponível">
          <p style="margin: 0; color: var(--ui-color-muted)">Outra opção disponível.</p>
        </ui-tab>
      </ui-tabs>
    `,
  }),
};
