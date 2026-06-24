import type { Meta, StoryObj } from '@storybook/angular';
import { AccordionComponent } from './ui-accordion.component';

const meta: Meta<AccordionComponent> = {
  title: 'Components/Accordion',
  component: AccordionComponent,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<AccordionComponent>;

export const SingleOpen: Story = {
  args: {
    multiple: false,
    items: [
      {
        id: '1',
        title: 'O que é um Design System?',
        content:
          'É um conjunto de padrões, componentes e regras visuais para construir interfaces consistentes.',
      },
      {
        id: '2',
        title: 'O que é Storybook?',
        content:
          'É uma ferramenta para documentar, testar e visualizar componentes isoladamente.',
      },
      {
        id: '3',
        title: 'Item desabilitado',
        content: 'Este conteúdo não deve abrir.',
        disabled: true,
      },
    ],
  },
};

export const MultipleOpen: Story = {
  args: {
    multiple: true,
    items: [
      {
        id: '1',
        title: 'Componente 1',
        content: 'Este item pode ficar aberto junto com outros.',
      },
      {
        id: '2',
        title: 'Componente 2',
        content:
          'Quando multiple é true, vários itens podem abrir ao mesmo tempo.',
      },
      {
        id: '3',
        title: 'Componente 3',
        content: 'Útil para FAQs e documentações.',
      },
    ],
  },
};
