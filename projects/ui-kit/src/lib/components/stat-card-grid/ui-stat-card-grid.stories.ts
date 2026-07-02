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
                <ui-stat-card type="default" [value]="6" label="Total de alertas" icon="/icons/logo.svg" />
                <ui-stat-card type="danger" [value]="2" label="Urgentes" icon="/icons/alert.svg" />
                <ui-stat-card type="warning" [value]="2" label="Em breve" icon="/icons/calendar.svg" />
                <ui-stat-card type="info" [value]="2" label="Informativos" icon="/icons/info.svg" />
            </ui-stat-card-grid>
        `,
  }),
};

export const TwoCards: Story = {
  render: () => ({
    template: `
            <ui-stat-card-grid>
                <ui-stat-card type="success" [value]="18" label="Concluídos" icon="/icons/success.svg" />
                <ui-stat-card type="danger" [value]="3" label="Pendentes" icon="/icons/alert.svg" />
            </ui-stat-card-grid>
        `,
  }),
};

export const SixCards: Story = {
  render: () => ({
    template: `
            <ui-stat-card-grid>
                <ui-stat-card type="default" [value]="6" label="Total" />
                <ui-stat-card type="danger" [value]="2" label="Urgentes" />
                <ui-stat-card type="warning" [value]="5" label="Em breve" />
                <ui-stat-card type="info" [value]="7" label="Info" />
                <ui-stat-card type="success" [value]="21" label="Resolvidos" />
                <ui-stat-card type="default" [value]="4" label="Outros" />
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
                <ui-stat-card type="default" [value]="6" label="Total" icon="/icons/logo.svg" />
                <ui-stat-card type="danger" [value]="2" label="Urgentes" icon="/icons/alert.svg" />
                <ui-stat-card type="warning" [value]="2" label="Em breve" icon="/icons/calendar.svg" />
                <ui-stat-card type="info" [value]="2" label="Informativos" icon="/icons/info.svg" />
            </ui-stat-card-grid>
        `,
  }),
};
