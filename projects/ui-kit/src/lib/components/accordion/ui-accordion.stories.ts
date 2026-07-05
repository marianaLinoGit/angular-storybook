import type { Meta, StoryObj } from '@storybook/angular';
import { accordionPlaygroundPlay } from '../../storybook/play.helpers';
import type { AccordionItem } from './ui-accordion.component';
import { UiAccordionComponent } from './ui-accordion.component';

const defaultItems: AccordionItem[] = [
  {
    id: '1',
    title: 'O que é um Design System?',
    icon: 'config',
    content:
      'É um conjunto de padrões, componentes e regras visuais para construir interfaces consistentes.',
  },
  {
    id: '2',
    title: 'O que é Storybook?',
    icon: 'folder',
    content:
      'É uma ferramenta para documentar, testar e visualizar componentes isoladamente.',
  },
  {
    id: '3',
    title: 'Item desabilitado',
    icon: 'lock-blocked',
    content: 'Este conteúdo não deve abrir.',
    disabled: true,
  },
];

const playgroundDefaults = {
  items: defaultItems,
  multiple: false,
  showNumbers: false,
  showIcons: true,
  initialOpenedIds: [] as string[],
  size: 'md' as const,
  variant: 'default' as const,
  customClass: '',
};

const meta: Meta<UiAccordionComponent> = {
  title: 'Components/Accordion',
  component: UiAccordionComponent,
  tags: ['autodocs'],
  includeStories:
    /^(PlaygroundCompleto|SingleOpen|MultipleOpen|WithNumbers|WithNumbersAndIcons|WithoutIcons|Flush)$/,
  decorators: [
    (story) => ({
      ...story(),
      styles: [
        `
        :host {
          display: block;
          max-width: 640px;
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
          'Accordion para conteúdo expansível em lista. Suporta múltiplos itens abertos, numeração, ícones e variantes visuais.\n\n' +
          '**Uso:** informe `items` (array com `id`, `title`, `content` e opcionalmente `icon`, `disabled`). Emite `itemToggle` ao abrir/fechar.',
      },
    },
  },
  argTypes: {
    items: {
      control: 'object',
      table: { category: 'Conteúdo' },
      description:
        'Lista de itens. Cada item possui `id`, `title`, `content` e opcionalmente `icon` e `disabled`.',
    },
    initialOpenedIds: {
      control: 'object',
      table: { category: 'Conteúdo' },
      description: 'IDs dos itens que devem iniciar abertos.',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      table: { category: 'Aparência' },
      description:
        'Tamanho visual do accordion. Altera espaçamentos e proporção dos itens.',
    },
    variant: {
      control: 'radio',
      options: ['default', 'bordered', 'flush'],
      table: { category: 'Aparência' },
      description:
        'Variação visual: `default` (espaçado), `bordered` (com borda) ou `flush` (compacto).',
    },
    customClass: {
      control: 'text',
      table: { category: 'Aparência' },
      description: 'Classe CSS adicional aplicada ao container do accordion.',
    },
    multiple: {
      control: 'boolean',
      table: { category: 'Estado' },
      description:
        'Quando `true`, permite manter vários itens abertos simultaneamente.',
    },
    showNumbers: {
      control: 'boolean',
      table: { category: 'Estado' },
      description: 'Exibe numeração sequencial antes do título de cada item.',
    },
    showIcons: {
      control: 'boolean',
      table: { category: 'Estado' },
      description: 'Exibe os ícones configurados em cada item.',
    },
    itemToggle: {
      action: 'itemToggle',
      table: { category: 'Events' },
      description:
        'Evento disparado quando um item é aberto ou fechado. Emite `{ id, open }`.',
    },
  },
  args: { ...playgroundDefaults },
};

export default meta;

type Story = StoryObj<UiAccordionComponent>;

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
  play: accordionPlaygroundPlay,
};

export const SingleOpen: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Modo padrão: apenas um item aberto por vez (`multiple = false`).',
      },
    },
  },
  args: { ...playgroundDefaults },
};

export const MultipleOpen: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Vários itens podem permanecer abertos ao mesmo tempo.',
      },
    },
  },
  args: {
    ...playgroundDefaults,
    multiple: true,
    initialOpenedIds: ['1'],
    items: [
      {
        id: '1',
        title: 'Componente 1',
        icon: 'package',
        content: 'Este item pode ficar aberto junto com outros.',
      },
      {
        id: '2',
        title: 'Componente 2',
        icon: 'config',
        content: 'Quando multiple é true, vários itens podem abrir ao mesmo tempo.',
      },
      {
        id: '3',
        title: 'Componente 3',
        icon: 'check-circle',
        content: 'Útil para FAQs e documentações.',
      },
    ] as AccordionItem[],
  },
};

export const WithNumbers: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Itens numerados sequencialmente, sem ícones.',
      },
    },
  },
  args: {
    ...playgroundDefaults,
    showNumbers: true,
    showIcons: false,
    initialOpenedIds: ['1'],
    items: [
      { id: '1', title: 'Primeiro passo', content: 'Conteúdo do primeiro item numerado.' },
      { id: '2', title: 'Segundo passo', content: 'Conteúdo do segundo item numerado.' },
      { id: '3', title: 'Terceiro passo', content: 'Conteúdo do terceiro item numerado.' },
    ],
  },
};

export const WithNumbersAndIcons: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Numeração + ícones com variante `bordered` e múltiplos itens abertos.',
      },
    },
  },
  args: {
    ...playgroundDefaults,
    multiple: true,
    showNumbers: true,
    initialOpenedIds: ['1', '2'],
    variant: 'bordered',
    items: [
      {
        id: '1',
        title: 'Planejamento',
        icon: 'add-note',
        content: 'Definição dos padrões, tokens e componentes base.',
      },
      {
        id: '2',
        title: 'Implementação',
        icon: 'overview',
        content: 'Criação dos componentes reutilizáveis em Angular.',
      },
      {
        id: '3',
        title: 'Documentação',
        icon: 'folder',
        content: 'Documentação visual e interativa usando Storybook.',
      },
    ] as AccordionItem[],
  },
};

export const WithoutIcons: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Layout simplificado apenas com texto nos títulos.',
      },
    },
  },
  args: {
    ...playgroundDefaults,
    showIcons: false,
    items: [
      { id: '1', title: 'Item sem ícone', content: 'Accordion usando apenas texto no título.' },
      {
        id: '2',
        title: 'Outro item sem ícone',
        content: 'Útil quando o layout precisa ser mais simples.',
      },
    ],
  },
};

export const Flush: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Variante `flush` sem espaçamento entre os itens.',
      },
    },
  },
  args: {
    ...playgroundDefaults,
    variant: 'flush',
    initialOpenedIds: ['1'],
    items: [
      {
        id: '1',
        title: 'Accordion flush',
        icon: 'add-note',
        content: 'Variação sem espaçamento entre os itens.',
      },
      {
        id: '2',
        title: 'Segundo item',
        icon: 'filter',
        content: 'Útil para layouts mais compactos.',
      },
    ] as AccordionItem[],
  },
};
