import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { UiStatCardComponent } from '../stat-card/ui-stat-card.component';
import { UiStatCardGridComponent } from './ui-stat-card-grid.component';

const meta: Meta<UiStatCardGridComponent> = {
  title: 'Layout/Stat Card Grid',
  component: UiStatCardGridComponent,
  decorators: [
    moduleMetadata({
      imports: [UiStatCardGridComponent, UiStatCardComponent],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    minCardWidth: {
      control: 'text',
      description: 'Largura mínima utilizada no desktop >= 900px.',
    },
    gap: {
      control: 'text',
      description: 'Espaçamento entre os cards.',
    },
  },
};

export default meta;

type Story = StoryObj<UiStatCardGridComponent>;

export const Default: Story = {
  args: {
    minCardWidth: '180px',
    gap: '16px',
  },
  render: (args) => ({
    props: args,
    template: `
      <ui-stat-card-grid [minCardWidth]="minCardWidth" [gap]="gap">
        <ui-stat-card type="default" [value]="6" label="Total de alertas" icon="alert" />
        <ui-stat-card type="danger" [value]="2" label="Urgentes" icon="warning" />
        <ui-stat-card type="warning" [value]="2" label="Em breve" icon="calendar" />
        <ui-stat-card type="info" [value]="2" label="Informativos" icon="info" />
      </ui-stat-card-grid>
    `,
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
