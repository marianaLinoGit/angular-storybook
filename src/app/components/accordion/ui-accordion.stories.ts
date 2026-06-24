import type { Meta, StoryObj } from '@storybook/angular';
import { AccordionComponent } from './ui-accordion.component';

const meta: Meta<AccordionComponent> = {
  title: 'Components/Accordion',
  component: AccordionComponent,
  tags: ['autodocs'],
  argTypes: {
    multiple: {
      control: 'boolean',
    },
    showNumbers: {
      control: 'boolean',
    },
    showIcons: {
      control: 'boolean',
    },
  },
};

export default meta;

type Story = StoryObj<AccordionComponent>;

export const SingleOpen: Story = {
  args: {
    multiple: false,
    showNumbers: false,
    showIcons: true,
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
