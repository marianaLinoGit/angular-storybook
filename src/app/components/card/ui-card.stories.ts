import type { Meta, StoryObj } from '@storybook/angular';
import { UiCardComponent } from './ui-card.component';

const meta: Meta<UiCardComponent> = {
  title: 'Components/Card',
  component: UiCardComponent,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    align: {
      control: 'radio',
      options: ['left', 'center'],
    },
  },
};

export default meta;

type Story = StoryObj<UiCardComponent>;

export const Default: Story = {
  args: {
    title: 'Design System',
    subtitle: 'Angular + Storybook',
    description: 'Card reutilizável para apresentar conteúdo de forma visual.',
    size: 'md',
    shadow: true,
    bordered: false,
    clickable: false,
    highlighted: false,
    align: 'left',
  },
};

export const WithImage: Story = {
  args: {
    title: 'Card com imagem',
    subtitle: 'Customizável',
    description: 'Exemplo de card com imagem, título, subtítulo e descrição.',
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
    size: 'md',
    shadow: true,
  },
};

export const Highlighted: Story = {
  args: {
    title: 'Card em destaque',
    subtitle: 'Destaque visual',
    description: 'Útil para planos, features principais ou cards selecionados.',
    highlighted: true,
    footer: 'Footer opcional',
  },
};

export const Clickable: Story = {
  args: {
    title: 'Card clicável',
    description: 'Possui estado visual de hover.',
    clickable: true,
    shadow: true,
  },
};
