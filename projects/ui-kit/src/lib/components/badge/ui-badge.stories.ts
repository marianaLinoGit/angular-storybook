import type { Meta, StoryObj } from '@storybook/angular';
import { badgePlaygroundPlay } from '../../storybook/play.helpers';
import { UiBadgeComponent } from './ui-badge.component';

const playgroundDefaults = {
  label: '12 pets',
  allowHtml: false,
  type: 'default' as const,
};

const meta: Meta<UiBadgeComponent> = {
  title: 'Components/Badge',
  component: UiBadgeComponent,
  tags: ['autodocs'],
  includeStories: /^(PlaygroundCompleto|Html|Danger|Warning|Success|Info)$/,
  decorators: [
    (story) => ({
      ...story(),
      styles: [
        `
        :host {
          display: block;
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
          'Badge compacto para status, contadores e rótulos contextuais. Suporta variações de cor semântica e conteúdo HTML opcional.\n\n' +
          '**Uso:** informe `label` e opcionalmente `type` (`default`, `danger`, `warning`, `success`, `info`).',
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      table: { category: 'Conteúdo' },
      description:
        'Texto ou número exibido no badge. Pode conter HTML quando `allowHtml` estiver ativo.',
    },
    allowHtml: {
      control: 'boolean',
      table: { category: 'Conteúdo' },
      description:
        'Renderiza o conteúdo de `label` via `innerHTML`. Use apenas com conteúdo confiável.',
    },
    type: {
      control: 'select',
      options: ['default', 'danger', 'warning', 'success', 'info'],
      table: { category: 'Aparência' },
      description: 'Variação visual e semântica do badge.',
    },
  },
  args: { ...playgroundDefaults },
};

export default meta;

type Story = StoryObj<UiBadgeComponent>;

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
  play: badgePlaygroundPlay,
};

export const Html: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Badge com HTML no conteúdo para destacar parte do texto.',
      },
    },
  },
  args: {
    label: '<strong>12</strong> pets',
    allowHtml: true,
    type: 'default',
  },
};

export const Danger: Story = {
  parameters: {
    docs: { description: { story: 'Variação `danger` para estados críticos ou urgentes.' } },
  },
  args: { label: 'Urgente', allowHtml: false, type: 'danger' },
};

export const Warning: Story = {
  parameters: {
    docs: { description: { story: 'Variação `warning` para alertas ou pendências.' } },
  },
  args: { label: 'Em breve', allowHtml: false, type: 'warning' },
};

export const Success: Story = {
  parameters: {
    docs: { description: { story: 'Variação `success` para estados concluídos ou positivos.' } },
  },
  args: { label: 'Concluído', allowHtml: false, type: 'success' },
};

export const Info: Story = {
  parameters: {
    docs: { description: { story: 'Variação `info` para informações neutras.' } },
  },
  args: { label: 'Informativo', allowHtml: false, type: 'info' },
};

export const AllTypes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Comparação visual de todas as variações de `type`, incluindo HTML.',
      },
    },
  },
  render: () => ({
    imports: [UiBadgeComponent],
    template: `
      <div style="display:flex;gap:12px;flex-wrap:wrap">
        <ui-badge label="Default" />
        <ui-badge label="Danger" type="danger" />
        <ui-badge label="Warning" type="warning" />
        <ui-badge label="Success" type="success" />
        <ui-badge label="Info" type="info" />
        <ui-badge label="<strong>12</strong> pets" [allowHtml]="true" />
      </div>
    `,
  }),
};
