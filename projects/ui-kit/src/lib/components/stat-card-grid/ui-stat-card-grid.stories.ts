import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { statCardGridPlaygroundPlay } from '../../storybook/play.helpers';
import { UiStatCardComponent } from '../stat-card/ui-stat-card.component';
import { UiStatCardGridComponent } from './ui-stat-card-grid.component';

const playgroundDefaults = {
  columnsMobile: 2,
  columnsDesktop: 4,
  gap: '16px',
};

const meta: Meta<UiStatCardGridComponent> = {
  title: 'Layout/Stat Card Grid',
  component: UiStatCardGridComponent,
  decorators: [
    moduleMetadata({
      imports: [UiStatCardGridComponent, UiStatCardComponent],
    }),
  ],
  tags: ['autodocs'],
  includeStories:
    /^(PlaygroundCompleto|Default|TwoCards|SixCards|Gradient|MixedSizes|WithoutIcons|MobilePetsExample)$/,
  argTypes: {
    columnsMobile: {
      control: { type: 'number', min: 1, max: 4, step: 1 },
      table: { category: 'Layout' },
      description: 'Quantidade de colunas no mobile. Padrão: 2.',
    },
    columnsDesktop: {
      control: { type: 'number', min: 1, max: 6, step: 1 },
      table: { category: 'Layout' },
      description: 'Quantidade de colunas no desktop. Padrão: 4.',
    },
    gap: {
      control: 'text',
      table: { category: 'Layout' },
      description: 'Espaçamento entre os cards.',
    },
  },
  args: { ...playgroundDefaults },
};

export default meta;

type Story = StoryObj<UiStatCardGridComponent>;

const defaultGridTemplate = `
  <ui-stat-card-grid [columnsMobile]="columnsMobile" [columnsDesktop]="columnsDesktop" [gap]="gap">
    <ui-stat-card type="default" [value]="6" label="Total de alertas" icon="alert" />
    <ui-stat-card type="danger" [value]="2" label="Urgentes" icon="warning" />
    <ui-stat-card type="warning" [value]="2" label="Em breve" icon="calendar" />
    <ui-stat-card type="info" [value]="2" label="Informativos" icon="info" />
  </ui-stat-card-grid>
`;

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
  render: (args) => ({
    props: args,
    template: defaultGridTemplate,
  }),
  play: statCardGridPlaygroundPlay,
};

export const Default: Story = {
  args: { ...playgroundDefaults },
  render: (args) => ({
    props: args,
    template: defaultGridTemplate,
  }),
};

export const TwoCards: Story = {
  render: () => ({
    template: `
      <ui-stat-card-grid>
        <ui-stat-card type="success" [value]="18" label="Concluídos" icon="check-circle" />
        <ui-stat-card type="danger" [value]="3" label="Pendentes" icon="warning" />
      </ui-stat-card-grid>
    `,
  }),
};

export const SixCards: Story = {
  render: () => ({
    template: `
      <ui-stat-card-grid>
        <ui-stat-card type="default" [value]="6" label="Total" icon="alert" />
        <ui-stat-card type="danger" [value]="2" label="Urgentes" icon="warning" />
        <ui-stat-card type="warning" [value]="5" label="Em breve" icon="calendar" />
        <ui-stat-card type="info" [value]="7" label="Info" icon="info" />
        <ui-stat-card type="success" [value]="21" label="Resolvidos" icon="check-circle" />
        <ui-stat-card type="default" [value]="4" label="Outros" icon="folder" />
      </ui-stat-card-grid>
    `,
  }),
};

export const Gradient: Story = {
  render: () => ({
    template: `
      <ui-stat-card-grid minCardWidth="180px" gap="16px">
        <ui-stat-card appearance="gradient" type="default" [value]="6" label="Total" icon="alert" />
        <ui-stat-card appearance="gradient" type="danger" [value]="2" label="Urgentes" icon="warning" />
        <ui-stat-card appearance="gradient" type="warning" [value]="5" label="Em breve" icon="calendar" />
        <ui-stat-card appearance="gradient" type="info" [value]="7" label="Informativos" icon="info" />
      </ui-stat-card-grid>
    `,
  }),
};

export const MixedSizes: Story = {
  render: () => ({
    template: `
      <ui-stat-card-grid minCardWidth="180px" gap="16px">
        <ui-stat-card size="sm" type="default" [value]="6" label="Pequeno" icon="alert" />
        <ui-stat-card size="md" type="info" [value]="12" label="Médio" icon="info" />
        <ui-stat-card size="lg" type="success" [value]="21" label="Grande" icon="check-circle" />
      </ui-stat-card-grid>
    `,
  }),
};

export const WithoutIcons: Story = {
  render: () => ({
    template: `
      <ui-stat-card-grid>
        <ui-stat-card type="default" [value]="6" label="Total" />
        <ui-stat-card type="danger" [value]="2" label="Urgentes" />
        <ui-stat-card type="warning" [value]="5" label="Em breve" />
        <ui-stat-card type="info" [value]="7" label="Info" />
      </ui-stat-card-grid>
    `,
  }),
};

export const MobilePetsExample: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  render: () => ({
    template: `
      <ui-stat-card-grid>
        <ui-stat-card size="sm" type="default" [value]="6" label="Total" icon="alert" />
        <ui-stat-card size="sm" type="danger" [value]="2" label="Urgentes" icon="warning" />
        <ui-stat-card size="sm" type="warning" [value]="2" label="Em breve" icon="calendar" />
        <ui-stat-card size="sm" type="info" [value]="2" label="Informativos" icon="info" />
      </ui-stat-card-grid>
    `,
  }),
};
