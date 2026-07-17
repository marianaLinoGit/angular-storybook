import type { Meta, StoryObj } from '@storybook/angular';
import { cardPlaygroundPlay } from '../../storybook/play.helpers';
import { UiCardComponent } from './ui-card.component';

const playgroundDefaults = {
  title: 'Design System',
  subtitle: 'Angular + Storybook',
  description: 'Card reutilizável para apresentar conteúdo de forma visual.',
  imageUrl: null as string | null,
  imageAlt: null as string | null,
  ariaLabel: null as string | null,
  size: 'md' as const,
  shadow: true,
  bordered: false,
  clickable: false,
  highlighted: false,
  align: 'left' as const,
  footer: null as string | null,
  linkUrl: null as string | null,
  target: '_self' as const,
  customClass: '',
};

const meta: Meta<UiCardComponent> = {
  title: 'Components/Card',
  component: UiCardComponent,
  tags: ['autodocs'],
  includeStories:
    /^(PlaygroundCompleto|Default|WithImage|DecorativeImage|ClickableWithLink|ClickableWithoutLink|Highlighted|AlignCenter|AlignRight|Small|Large)$/,
  argTypes: {
    title: {
      control: 'text',
      description: 'Título principal exibido no card.',
    },
    subtitle: {
      control: 'text',
      description: 'Subtítulo opcional exibido abaixo do título.',
    },
    description: {
      control: 'text',
      description: 'Descrição ou conteúdo textual principal do card.',
    },
    imageUrl: {
      control: 'text',
      description: 'URL da imagem exibida no topo do card.',
    },
    imageAlt: {
      control: 'text',
      description:
        'Texto alternativo da imagem. Use string vazia quando a imagem for decorativa.',
    },
    ariaLabel: {
      control: 'text',
      description: 'Texto acessível usado quando o card é clicável.',
    },
    footer: {
      control: 'text',
      description: 'Texto opcional exibido no rodapé do card.',
    },
    linkUrl: {
      control: 'text',
      description:
        'URL aberta quando o card é clicável. Se vazio, o card apenas emite o evento cardClick.',
    },
    target: {
      control: 'radio',
      options: ['_self', '_blank'],
      description:
        'Define se o link do card abre na mesma aba (_self) ou em uma nova aba (_blank).',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Tamanho visual do card.',
    },
    align: {
      control: 'radio',
      options: ['left', 'center', 'right'],
      description: 'Alinhamento do conteúdo textual do card.',
    },
    shadow: {
      control: 'boolean',
      description: 'Exibe ou remove sombra do card.',
    },
    bordered: {
      control: 'boolean',
      description: 'Exibe ou remove borda do card.',
    },
    clickable: {
      control: 'boolean',
      description: 'Define se o card pode ser clicado ou acessado via teclado.',
    },
    highlighted: {
      control: 'boolean',
      description: 'Aplica estilo visual de destaque ao card.',
    },
    customClass: {
      control: 'text',
      description: 'Classe CSS customizada.',
    },
    cardClick: {
      action: 'cardClick',
      table: {
        category: 'Events',
      },
      description: 'Evento disparado quando o card clicável é acionado.',
    },
  },
  args: { ...playgroundDefaults },
};

export default meta;

type Story = StoryObj<UiCardComponent>;

export const PlaygroundCompleto: Story = {
  name: 'Playground completo',
  args: { ...playgroundDefaults },
  play: cardPlaygroundPlay,
};

export const Default: Story = {
  args: { ...playgroundDefaults },
};

export const WithImage: Story = {
  args: {
    ...Default.args,
    title: 'Card com imagem',
    subtitle: 'Customizável',
    description: 'Exemplo de card com imagem, título, subtítulo e descrição.',
    imageUrl:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Mesa com notebook exibindo código',
  },
};

export const DecorativeImage: Story = {
  args: {
    ...Default.args,
    title: 'Imagem decorativa',
    subtitle: 'Acessibilidade',
    description:
      'Quando a imagem não adiciona informação, o alt pode ser uma string vazia.',
    imageUrl:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
    imageAlt: '',
  },
};

export const ClickableWithLink: Story = {
  args: {
    ...Default.args,
    title: 'Card clicável',
    subtitle: 'Com link externo',
    description:
      'Clique no card para abrir um link. Use essa variação para cards navegáveis.',
    imageUrl:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Workspace com notebook',
    ariaLabel: 'Abrir documentação do Storybook',
    clickable: true,
    footer: 'Abrir documentação',
    linkUrl: 'https://storybook.js.org/',
    target: '_blank',
  },
};

export const ClickableWithoutLink: Story = {
  args: {
    ...Default.args,
    title: 'Card com ação',
    subtitle: 'Sem URL',
    description:
      'Esse card emite o evento cardClick, mas não navega para outra página.',
    ariaLabel: 'Selecionar card com ação',
    clickable: true,
    footer: 'Selecionar',
  },
};

export const Highlighted: Story = {
  args: {
    ...Default.args,
    title: 'Card em destaque',
    subtitle: 'Destaque visual',
    description: 'Útil para planos, features principais ou cards selecionados.',
    highlighted: true,
    footer: 'Footer opcional',
  },
};

export const AlignCenter: Story = {
  args: {
    ...Default.args,
    title: 'Alinhamento central',
    subtitle: 'Center',
    description: 'Conteúdo textual centralizado dentro do card.',
    bordered: true,
    align: 'center',
  },
};

export const AlignRight: Story = {
  args: {
    ...Default.args,
    title: 'Alinhamento à direita',
    subtitle: 'Right',
    description: 'Conteúdo textual alinhado à direita dentro do card.',
    bordered: true,
    align: 'right',
  },
};

export const Small: Story = {
  args: {
    ...Default.args,
    title: 'Card pequeno',
    subtitle: 'SM',
    description: 'Exemplo de card com tamanho menor.',
    size: 'sm',
    bordered: true,
  },
};

export const Large: Story = {
  args: {
    ...Default.args,
    title: 'Card grande',
    subtitle: 'LG',
    description:
      'Exemplo de card com mais largura para conteúdos mais descritivos.',
    size: 'lg',
    bordered: true,
  },
};
