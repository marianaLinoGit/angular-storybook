import type { Meta, StoryObj } from '@storybook/angular';
import { UiStatCardGridComponent } from '../stat-card-grid/ui-stat-card-grid.component';
import { UiStatCardComponent } from './ui-stat-card.component';

const meta: Meta<UiStatCardComponent> = {
  title: 'Components/Stat Card',
  component: UiStatCardComponent,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['default', 'danger', 'warning', 'success', 'info'],
      description: 'Tipo visual do card.',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Tamanho visual do card.',
    },
    appearance: {
      control: 'select',
      options: ['solid', 'gradient'],
      description: 'Aparência do card. Por padrão é sólido.',
    },
    value: {
      control: 'text',
      description: 'Valor em destaque.',
    },
    label: {
      control: 'text',
      description: 'Texto descritivo abaixo do valor.',
    },
    icon: {
      control: 'text',
      description:
        'Caminho do SVG usado como máscara. A cor segue o contraste do card.',
    },
    ariaLabel: {
      control: 'text',
      description: 'Descrição acessível opcional.',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Força largura total.',
    },
  },
};

export default meta;

type Story = StoryObj<UiStatCardComponent>;

export const Default: Story = {
  args: {
    type: 'default',
    size: 'md',
    appearance: 'solid',
    value: 6,
    label: 'Total de alertas',
    icon: '/icons/logo.svg',
    ariaLabel: null,
    fullWidth: false,
  },
};

export const Gradient: Story = {
  args: {
    ...Default.args,
    appearance: 'gradient',
  },
};

export const Danger: Story = {
  args: {
    ...Default.args,
    type: 'danger',
    value: 2,
    label: 'Urgentes',
    icon: '/icons/alert.svg',
  },
};

export const Warning: Story = {
  args: {
    ...Default.args,
    type: 'warning',
    value: 2,
    label: 'Em breve',
    icon: '/icons/calendar.svg',
  },
};

export const Success: Story = {
  args: {
    ...Default.args,
    type: 'success',
    value: 12,
    label: 'Concluídos',
    icon: '/icons/success.svg',
  },
};

export const Info: Story = {
  args: {
    ...Default.args,
    type: 'info',
    value: 2,
    label: 'Informativos',
    icon: '/icons/info.svg',
  },
};

export const WithoutIcon: Story = {
  args: {
    ...Default.args,
    icon: null,
    value: 6,
    label: 'Total de pets',
  },
};

export const AllTypesSolid: Story = {
  render: () => ({
    imports: [UiStatCardComponent, UiStatCardGridComponent],
    template: `
      <ui-stat-card-grid minCardWidth="180px" gap="16px">
        <ui-stat-card type="default" appearance="solid" [value]="6" label="Total de alertas" icon="/icons/logo.svg" />
        <ui-stat-card type="danger" appearance="solid" [value]="2" label="Urgentes" icon="/icons/alert.svg" />
        <ui-stat-card type="warning" appearance="solid" [value]="2" label="Em breve" icon="/icons/calendar.svg" />
        <ui-stat-card type="success" appearance="solid" [value]="12" label="Concluídos" icon="/icons/success.svg" />
        <ui-stat-card type="info" appearance="solid" [value]="2" label="Informativos" icon="/icons/info.svg" />
      </ui-stat-card-grid>
    `,
  }),
};

export const AllTypesGradient: Story = {
  render: () => ({
    imports: [UiStatCardComponent, UiStatCardGridComponent],
    template: `
      <ui-stat-card-grid minCardWidth="180px" gap="16px">
        <ui-stat-card type="default" appearance="gradient" [value]="6" label="Total de alertas" icon="/icons/logo.svg" />
        <ui-stat-card type="danger" appearance="gradient" [value]="2" label="Urgentes" icon="/icons/alert.svg" />
        <ui-stat-card type="warning" appearance="gradient" [value]="2" label="Em breve" icon="/icons/calendar.svg" />
        <ui-stat-card type="success" appearance="gradient" [value]="12" label="Concluídos" icon="/icons/success.svg" />
        <ui-stat-card type="info" appearance="gradient" [value]="2" label="Informativos" icon="/icons/info.svg" />
      </ui-stat-card-grid>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    imports: [UiStatCardComponent, UiStatCardGridComponent],
    template: `
      <ui-stat-card-grid minCardWidth="180px" gap="16px">
        <ui-stat-card size="sm" type="default" [value]="6" label="Pequeno" icon="/icons/logo.svg" />
        <ui-stat-card size="md" type="default" [value]="6" label="Médio" icon="/icons/logo.svg" />
        <ui-stat-card size="lg" type="default" [value]="6" label="Grande" icon="/icons/logo.svg" />
      </ui-stat-card-grid>
    `,
  }),
};

export const PetsAlertsDesktop: Story = {
  render: () => ({
    imports: [UiStatCardComponent, UiStatCardGridComponent],
    template: `
      <ui-stat-card-grid minCardWidth="190px" gap="14px">
        <ui-stat-card type="default" [value]="6" label="Total de alertas" icon="/icons/logo.svg" />
        <ui-stat-card type="danger" [value]="2" label="Urgentes" icon="/icons/alert.svg" />
        <ui-stat-card type="warning" [value]="2" label="Em breve" icon="/icons/calendar.svg" />
        <ui-stat-card type="info" [value]="2" label="Informativos" icon="/icons/info.svg" />
      </ui-stat-card-grid>
    `,
  }),
};

export const PetsAlertsMobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  render: () => ({
    imports: [UiStatCardComponent, UiStatCardGridComponent],
    template: `
      <ui-stat-card-grid minCardWidth="140px" gap="10px">
        <ui-stat-card size="sm" type="default" [value]="6" label="Total" icon="/icons/logo.svg" />
        <ui-stat-card size="sm" type="danger" [value]="2" label="Urgentes" icon="/icons/alert.svg" />
        <ui-stat-card size="sm" type="warning" [value]="2" label="Em breve" icon="/icons/calendar.svg" />
        <ui-stat-card size="sm" type="info" [value]="2" label="Informativos" icon="/icons/info.svg" />
      </ui-stat-card-grid>
    `,
  }),
};
