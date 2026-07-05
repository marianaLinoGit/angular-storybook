import type { Meta, StoryObj } from '@storybook/angular';
import { statCardPlaygroundPlay } from '../../storybook/play.helpers';
import { UI_ICON_NAMES } from '../icon/ui-icon.component';
import { UiStatCardGridComponent } from '../stat-card-grid/ui-stat-card-grid.component';
import { UiStatCardComponent } from './ui-stat-card.component';

const playgroundDefaults = {
  type: 'default' as const,
  size: 'md' as const,
  appearance: 'solid' as const,
  value: 6,
  label: 'Total de alertas',
  icon: 'alert' as const,
  ariaLabel: null as string | null,
  fullWidth: false,
};

const meta: Meta<UiStatCardComponent> = {
  title: 'Components/Stat Card',
  component: UiStatCardComponent,
  tags: ['autodocs'],
  includeStories:
    /^(PlaygroundCompleto|Gradient|Danger|Warning|Success|Info|WithoutIcon)$/,
  decorators: [
    (story) => ({
      ...story(),
      styles: [
        `
        :host {
          display: block;
          max-width: 280px;
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
          'Card compacto para exibir métricas e KPIs. Combina valor em destaque, rótulo descritivo e ícone opcional.\n\n' +
          '**Uso:** informe `value` e `label`. Combine com `ui-stat-card-grid` para layouts responsivos.',
      },
    },
  },
  argTypes: {
    value: {
      control: 'text',
      table: { category: 'Conteúdo' },
      description: 'Valor numérico ou textual exibido em destaque.',
    },
    label: {
      control: 'text',
      table: { category: 'Conteúdo' },
      description: 'Texto descritivo exibido abaixo ou ao lado do valor.',
    },
    icon: {
      control: 'select',
      options: [null, ...UI_ICON_NAMES],
      table: { category: 'Conteúdo' },
      description:
        'Nome do ícone exibido no card. Usa o componente `ui-icon`. Quando `null`, o ícone não é exibido.',
    },
    type: {
      control: 'select',
      options: ['default', 'danger', 'warning', 'success', 'info'],
      table: { category: 'Aparência' },
      description: 'Variação semântica de cor do card.',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      table: { category: 'Aparência' },
      description: 'Tamanho visual do card (`sm`, `md`, `lg`).',
    },
    appearance: {
      control: 'select',
      options: ['solid', 'gradient'],
      table: { category: 'Aparência' },
      description: 'Estilo de preenchimento: sólido ou gradiente.',
    },
    fullWidth: {
      control: 'boolean',
      table: { category: 'Aparência' },
      description: 'Faz o card ocupar 100% da largura do container.',
    },
    ariaLabel: {
      control: 'text',
      table: { category: 'Acessibilidade' },
      description:
        'Descrição acessível do card. Quando vazio, usa `label` e `value` como fallback.',
    },
  },
  args: { ...playgroundDefaults },
};

export default meta;

type Story = StoryObj<UiStatCardComponent>;

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
  play: statCardPlaygroundPlay,
};

export const Gradient: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Card com aparência `gradient` para destaque visual.',
      },
    },
  },
  args: { ...playgroundDefaults, appearance: 'gradient' },
};

export const Danger: Story = {
  parameters: {
    docs: { description: { story: 'Métrica com variação `danger`.' } },
  },
  args: {
    ...playgroundDefaults,
    type: 'danger',
    value: 2,
    label: 'Urgentes',
    icon: 'warning',
  },
};

export const Warning: Story = {
  parameters: {
    docs: { description: { story: 'Métrica com variação `warning`.' } },
  },
  args: {
    ...playgroundDefaults,
    type: 'warning',
    value: 2,
    label: 'Em breve',
    icon: 'calendar',
  },
};

export const Success: Story = {
  parameters: {
    docs: { description: { story: 'Métrica com variação `success`.' } },
  },
  args: {
    ...playgroundDefaults,
    type: 'success',
    value: 12,
    label: 'Concluídos',
    icon: 'check-circle',
  },
};

export const Info: Story = {
  parameters: {
    docs: { description: { story: 'Métrica com variação `info`.' } },
  },
  args: {
    ...playgroundDefaults,
    type: 'info',
    value: 2,
    label: 'Informativos',
    icon: 'info',
  },
};

export const WithoutIcon: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Card apenas com valor e label, sem ícone.',
      },
    },
  },
  args: {
    ...playgroundDefaults,
    icon: null,
    value: 6,
    label: 'Total de pets',
  },
};

export const AllTypesSolid: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Comparação de todos os tipos com aparência sólida em grid.',
      },
    },
  },
  render: () => ({
    imports: [UiStatCardComponent, UiStatCardGridComponent],
    template: `
      <ui-stat-card-grid minCardWidth="180px" gap="16px">
        <ui-stat-card type="default" appearance="solid" [value]="6" label="Total de alertas" icon="alert" />
        <ui-stat-card type="danger" appearance="solid" [value]="2" label="Urgentes" icon="warning" />
        <ui-stat-card type="warning" appearance="solid" [value]="2" label="Em breve" icon="calendar" />
        <ui-stat-card type="success" appearance="solid" [value]="12" label="Concluídos" icon="check-circle" />
        <ui-stat-card type="info" appearance="solid" [value]="2" label="Informativos" icon="info" />
      </ui-stat-card-grid>
    `,
  }),
};

export const AllTypesGradient: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Comparação de todos os tipos com aparência gradiente em grid.',
      },
    },
  },
  render: () => ({
    imports: [UiStatCardComponent, UiStatCardGridComponent],
    template: `
      <ui-stat-card-grid minCardWidth="180px" gap="16px">
        <ui-stat-card type="default" appearance="gradient" [value]="6" label="Total de alertas" icon="alert" />
        <ui-stat-card type="danger" appearance="gradient" [value]="2" label="Urgentes" icon="warning" />
        <ui-stat-card type="warning" appearance="gradient" [value]="2" label="Em breve" icon="calendar" />
        <ui-stat-card type="success" appearance="gradient" [value]="12" label="Concluídos" icon="check-circle" />
        <ui-stat-card type="info" appearance="gradient" [value]="2" label="Informativos" icon="info" />
      </ui-stat-card-grid>
    `,
  }),
};

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Comparação dos tamanhos `sm`, `md` e `lg` lado a lado.',
      },
    },
  },
  render: () => ({
    imports: [UiStatCardComponent, UiStatCardGridComponent],
    template: `
      <ui-stat-card-grid minCardWidth="180px" gap="16px">
        <ui-stat-card size="sm" type="default" [value]="6" label="Pequeno" icon="alert" />
        <ui-stat-card size="md" type="default" [value]="6" label="Médio" icon="alert" />
        <ui-stat-card size="lg" type="default" [value]="6" label="Grande" icon="alert" />
      </ui-stat-card-grid>
    `,
  }),
};

export const PetsAlertsDesktop: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Exemplo de dashboard de alertas de pets em layout desktop.',
      },
    },
  },
  render: () => ({
    imports: [UiStatCardComponent, UiStatCardGridComponent],
    template: `
      <ui-stat-card-grid minCardWidth="190px" gap="14px">
        <ui-stat-card type="default" [value]="6" label="Total de alertas" icon="alert" />
        <ui-stat-card type="danger" [value]="2" label="Urgentes" icon="warning" />
        <ui-stat-card type="warning" [value]="2" label="Em breve" icon="calendar" />
        <ui-stat-card type="info" [value]="2" label="Informativos" icon="info" />
      </ui-stat-card-grid>
    `,
  }),
};

export const PetsAlertsMobile: Story = {
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
    docs: {
      description: {
        story: 'Mesmo dashboard de alertas adaptado para mobile com cards menores.',
      },
    },
  },
  render: () => ({
    imports: [UiStatCardComponent, UiStatCardGridComponent],
    template: `
      <ui-stat-card-grid minCardWidth="140px" gap="10px">
        <ui-stat-card size="sm" type="default" [value]="6" label="Total" icon="alert" />
        <ui-stat-card size="sm" type="danger" [value]="2" label="Urgentes" icon="warning" />
        <ui-stat-card size="sm" type="warning" [value]="2" label="Em breve" icon="calendar" />
        <ui-stat-card size="sm" type="info" [value]="2" label="Informativos" icon="info" />
      </ui-stat-card-grid>
    `,
  }),
};
