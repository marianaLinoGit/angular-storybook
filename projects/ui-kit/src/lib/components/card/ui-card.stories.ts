import type { Meta, StoryObj } from '@storybook/angular';
import { UiCardComponent } from './ui-card.component';

const meta: Meta<UiCardComponent> = {
  title: 'Components/Card',
  component: UiCardComponent,
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
    },
    subtitle: {
      control: 'text',
    },
    description: {
      control: 'text',
    },
    imageUrl: {
      control: 'text',
    },
    imageAlt: {
      control: 'text',
    },
    footer: {
      control: 'text',
    },
    linkUrl: {
      control: 'text',
    },
    target: {
      control: 'radio',
      options: ['_self', '_blank'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    align: {
      control: 'radio',
      options: ['left', 'center', 'right'],
    },
    shadow: {
      control: 'boolean',
    },
    bordered: {
      control: 'boolean',
    },
    clickable: {
      control: 'boolean',
    },
    highlighted: {
      control: 'boolean',
    },
    customClass: {
      control: 'text',
    },
    cardClick: {
      action: 'cardClick',
      table: {
        category: 'Events',
      },
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
    imageUrl: '',
    imageAlt: '',
    size: 'md',
    shadow: true,
    bordered: false,
    clickable: false,
    highlighted: false,
    align: 'left',
    footer: '',
    linkUrl: '',
    target: '_self',
    customClass: '',
  },
};

export const WithImage: Story = {
  args: {
    title: 'Card com imagem',
    subtitle: 'Customizável',
    description: 'Exemplo de card com imagem, título, subtítulo e descrição.',
    imageUrl:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Mesa com notebook exibindo código',
    size: 'md',
    shadow: true,
    bordered: false,
    clickable: false,
    highlighted: false,
    align: 'left',
    footer: '',
    linkUrl: '',
    target: '_self',
    customClass: '',
  },
};

export const ClickableWithLink: Story = {
  args: {
    title: 'Card clicável',
    subtitle: 'Com link externo',
    description:
      'Clique no card para abrir um link. Use essa variação para cards navegáveis.',
    imageUrl:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Workspace com notebook',
    size: 'md',
    shadow: true,
    bordered: false,
    clickable: true,
    highlighted: false,
    align: 'left',
    footer: 'Abrir documentação',
    linkUrl: 'https://storybook.js.org/',
    target: '_blank',
    customClass: '',
  },
};

export const Highlighted: Story = {
  args: {
    title: 'Card em destaque',
    subtitle: 'Destaque visual',
    description: 'Útil para planos, features principais ou cards selecionados.',
    imageUrl: '',
    imageAlt: '',
    size: 'md',
    shadow: true,
    bordered: false,
    clickable: false,
    highlighted: true,
    align: 'left',
    footer: 'Footer opcional',
    linkUrl: '',
    target: '_self',
    customClass: '',
  },
};

export const AlignCenter: Story = {
  args: {
    title: 'Alinhamento central',
    subtitle: 'Center',
    description: 'Conteúdo textual centralizado dentro do card.',
    imageUrl: '',
    imageAlt: '',
    size: 'md',
    shadow: true,
    bordered: true,
    clickable: false,
    highlighted: false,
    align: 'center',
    footer: '',
    linkUrl: '',
    target: '_self',
    customClass: '',
  },
};

export const AlignRight: Story = {
  args: {
    title: 'Alinhamento à direita',
    subtitle: 'Right',
    description: 'Conteúdo textual alinhado à direita dentro do card.',
    imageUrl: '',
    imageAlt: '',
    size: 'md',
    shadow: true,
    bordered: true,
    clickable: false,
    highlighted: false,
    align: 'right',
    footer: '',
    linkUrl: '',
    target: '_self',
    customClass: '',
  },
};

export const Small: Story = {
  args: {
    title: 'Card pequeno',
    subtitle: 'SM',
    description: 'Exemplo de card com tamanho menor.',
    imageUrl: '',
    imageAlt: '',
    size: 'sm',
    shadow: true,
    bordered: true,
    clickable: false,
    highlighted: false,
    align: 'left',
    footer: '',
    linkUrl: '',
    target: '_self',
    customClass: '',
  },
};

export const Large: Story = {
  args: {
    title: 'Card grande',
    subtitle: 'LG',
    description:
      'Exemplo de card com mais largura para conteúdos mais descritivos.',
    imageUrl: '',
    imageAlt: '',
    size: 'lg',
    shadow: true,
    bordered: true,
    clickable: false,
    highlighted: false,
    align: 'left',
    footer: '',
    linkUrl: '',
    target: '_self',
    customClass: '',
  },
};
