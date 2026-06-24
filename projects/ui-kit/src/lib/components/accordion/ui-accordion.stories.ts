import type { Meta, StoryObj } from '@storybook/angular';
import { UiAccordionComponent } from './ui-accordion.component';

const meta: Meta<UiAccordionComponent> = {
  title: 'Components/Accordion',
  component: UiAccordionComponent,
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: 'object',
    },
    multiple: {
      control: 'boolean',
    },
    showNumbers: {
      control: 'boolean',
    },
    showIcons: {
      control: 'boolean',
    },
    initialOpenedIds: {
      control: 'object',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: 'radio',
      options: ['default', 'bordered', 'flush'],
    },
    customClass: {
      control: 'text',
    },
    itemToggle: {
      action: 'itemToggle',
      table: {
        category: 'Events',
      },
    },
  },
};

export default meta;

type Story = StoryObj<UiAccordionComponent>;

export const SingleOpen: Story = {
  args: {
    multiple: false,
    showNumbers: false,
    showIcons: true,
    initialOpenedIds: [],
    size: 'md',
    variant: 'default',
    customClass: '',
    items: [
      {
        id: '1',
        title: 'O que é um Design System?',
        icon: '🎨',
        content:
          'É um conjunto de padrões, componentes e regras visuais para construir interfaces consistentes.',
      },
      {
        id: '2',
        title: 'O que é Storybook?',
        icon: '📚',
        content:
          'É uma ferramenta para documentar, testar e visualizar componentes isoladamente.',
      },
      {
        id: '3',
        title: 'Item desabilitado',
        icon: '🔒',
        content: 'Este conteúdo não deve abrir.',
        disabled: true,
      },
    ],
  },
};

export const MultipleOpen: Story = {
  args: {
    multiple: true,
    showNumbers: false,
    showIcons: true,
    initialOpenedIds: ['1'],
    size: 'md',
    variant: 'default',
    customClass: '',
    items: [
      {
        id: '1',
        title: 'Componente 1',
        icon: '🧩',
        content: 'Este item pode ficar aberto junto com outros.',
      },
      {
        id: '2',
        title: 'Componente 2',
        icon: '⚙️',
        content:
          'Quando multiple é true, vários itens podem abrir ao mesmo tempo.',
      },
      {
        id: '3',
        title: 'Componente 3',
        icon: '✅',
        content: 'Útil para FAQs e documentações.',
      },
    ],
  },
};

export const WithNumbers: Story = {
  args: {
    multiple: false,
    showNumbers: true,
    showIcons: false,
    initialOpenedIds: ['1'],
    size: 'md',
    variant: 'default',
    customClass: '',
    items: [
      {
        id: '1',
        title: 'Primeiro passo',
        content: 'Conteúdo do primeiro item numerado.',
      },
      {
        id: '2',
        title: 'Segundo passo',
        content: 'Conteúdo do segundo item numerado.',
      },
      {
        id: '3',
        title: 'Terceiro passo',
        content: 'Conteúdo do terceiro item numerado.',
      },
    ],
  },
};

export const WithNumbersAndIcons: Story = {
  args: {
    multiple: true,
    showNumbers: true,
    showIcons: true,
    initialOpenedIds: ['1', '2'],
    size: 'md',
    variant: 'bordered',
    customClass: '',
    items: [
      {
        id: '1',
        title: 'Planejamento',
        icon: '📝',
        content: 'Definição dos padrões, tokens e componentes base.',
      },
      {
        id: '2',
        title: 'Implementação',
        icon: '💻',
        content: 'Criação dos componentes reutilizáveis em Angular.',
      },
      {
        id: '3',
        title: 'Documentação',
        icon: '📖',
        content: 'Documentação visual e interativa usando Storybook.',
      },
    ],
  },
};

export const WithoutIcons: Story = {
  args: {
    multiple: false,
    showNumbers: false,
    showIcons: false,
    initialOpenedIds: [],
    size: 'md',
    variant: 'default',
    customClass: '',
    items: [
      {
        id: '1',
        title: 'Item sem ícone',
        content: 'Accordion usando apenas texto no título.',
      },
      {
        id: '2',
        title: 'Outro item sem ícone',
        content: 'Útil quando o layout precisa ser mais simples.',
      },
    ],
  },
};

export const Flush: Story = {
  args: {
    multiple: false,
    showNumbers: false,
    showIcons: true,
    initialOpenedIds: ['1'],
    size: 'md',
    variant: 'flush',
    customClass: '',
    items: [
      {
        id: '1',
        title: 'Accordion flush',
        icon: '📄',
        content: 'Variação sem espaçamento entre os itens.',
      },
      {
        id: '2',
        title: 'Segundo item',
        icon: '📌',
        content: 'Útil para layouts mais compactos.',
      },
    ],
  },
};
