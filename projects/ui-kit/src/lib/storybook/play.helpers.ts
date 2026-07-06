import { expect, userEvent, within } from 'storybook/test';

export type StoryPlayFn = (context: { canvasElement: HTMLElement }) => Promise<void>;

async function canvasOf(canvasElement: HTMLElement) {
  return within(canvasElement);
}

export async function expectButton(
  canvasElement: HTMLElement,
  name: string | RegExp,
  click = true,
): Promise<void> {
  const canvas = await canvasOf(canvasElement);
  const button = canvas.getByRole('button', { name });

  await expect(button).toBeVisible();
  await expect(button).toBeEnabled();

  if (click) {
    await userEvent.click(button);
  }
}

export async function expectText(
  canvasElement: HTMLElement,
  text: string | RegExp,
): Promise<void> {
  const canvas = await canvasOf(canvasElement);
  await expect(canvas.getByText(text)).toBeVisible();
}

export async function expectHeading(
  canvasElement: HTMLElement,
  name: string | RegExp,
): Promise<void> {
  const canvas = await canvasOf(canvasElement);
  await expect(canvas.getByRole('heading', { name })).toBeVisible();
}

export async function expectCheckbox(
  canvasElement: HTMLElement,
  name: string | RegExp,
  toggle = true,
): Promise<void> {
  const canvas = await canvasOf(canvasElement);
  const checkbox = canvas.getByRole('checkbox', { name, hidden: true });

  await expect(checkbox).toBeInTheDocument();

  if (toggle) {
    const label = canvas.getByText(name);
    await userEvent.click(label);
    await expect(checkbox).toBeChecked();
  }
}

export async function expectInput(
  canvasElement: HTMLElement,
  label: string | RegExp,
  value: string,
): Promise<void> {
  const canvas = await canvasOf(canvasElement);
  const nameMatcher =
    typeof label === 'string' ? new RegExp(label, 'i') : label;
  const input = canvas.getByRole('textbox', { name: nameMatcher });

  await expect(input).toBeVisible();
  await userEvent.clear(input);
  await userEvent.type(input, value);
  await expect(input).toHaveValue(value);
}

export async function expectSelectTrigger(
  canvasElement: HTMLElement,
  name: string | RegExp,
): Promise<void> {
  const canvas = await canvasOf(canvasElement);
  const trigger = canvas.getByRole('combobox', { name });

  await expect(trigger).toBeVisible();
  await userEvent.click(trigger);
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');
}

export async function expectSwitch(
  canvasElement: HTMLElement,
  name?: string | RegExp,
): Promise<void> {
  const canvas = await canvasOf(canvasElement);
  const nameMatcher =
    typeof name === 'string' ? new RegExp(name, 'i') : name;
  const switchEl = nameMatcher
    ? canvas.getByRole('switch', { name: nameMatcher, hidden: true })
    : canvas.getByRole('switch', { hidden: true });

  if (nameMatcher) {
    await userEvent.click(canvas.getByText(nameMatcher));
  } else {
    await userEvent.click(switchEl);
  }

  await expect(switchEl).toBeChecked();
}

export async function expectStatus(
  canvasElement: HTMLElement,
  label: string | RegExp,
): Promise<void> {
  const canvas = await canvasOf(canvasElement);
  await expect(canvas.getByRole('status', { name: label })).toBeVisible();
}

export async function expectTableCell(
  canvasElement: HTMLElement,
  text: string | RegExp,
): Promise<void> {
  const canvas = await canvasOf(canvasElement);
  await expect(canvas.getByRole('table')).toBeVisible();
  await expect(canvas.getByText(text)).toBeVisible();
}

export const buttonPlaygroundPlay: StoryPlayFn = async ({ canvasElement }) => {
  await expectButton(canvasElement, 'Salvar');
};

export const badgePlaygroundPlay: StoryPlayFn = async ({ canvasElement }) => {
  await expectText(canvasElement, '12 pets');
};

export const checkboxPlaygroundPlay: StoryPlayFn = async ({ canvasElement }) => {
  await expectCheckbox(canvasElement, /Li e aceito/i);
};

export const emptyStatePlaygroundPlay: StoryPlayFn = async ({ canvasElement }) => {
  await expectHeading(canvasElement, 'Nenhum dado encontrado');
  await expectButton(canvasElement, 'Criar novo item');
};

export const inputPlaygroundPlay: StoryPlayFn = async ({ canvasElement }) => {
  await expectInput(canvasElement, 'Nome completo', 'Maria');
};

export const selectPlaygroundPlay: StoryPlayFn = async ({ canvasElement }) => {
  await expectSelectTrigger(canvasElement, /Como conheceu/i);
};

export const switchPlaygroundPlay: StoryPlayFn = async ({ canvasElement }) => {
  await expectSwitch(canvasElement, /Tema/i);
};

export const iconPlaygroundPlay: StoryPlayFn = async ({ canvasElement }) => {
  await expect(canvasElement.querySelector('svg')).toBeTruthy();
};

export const labelPlaygroundPlay: StoryPlayFn = async ({ canvasElement }) => {
  await expectText(canvasElement, 'E-mail');
};

export const loadingPlaygroundPlay: StoryPlayFn = async ({ canvasElement }) => {
  await expectStatus(canvasElement, 'Carregando conteúdo');
  await expectText(canvasElement, 'Carregando...');
};

export const pageTitlePlaygroundPlay: StoryPlayFn = async ({ canvasElement }) => {
  await expectHeading(canvasElement, 'Meus Pets');
  await expectButton(canvasElement, 'Adicionar pet');
};

export const statCardPlaygroundPlay: StoryPlayFn = async ({ canvasElement }) => {
  await expectText(canvasElement, '6');
  await expectText(canvasElement, 'Total de alertas');
};

export const accordionPlaygroundPlay: StoryPlayFn = async ({ canvasElement }) => {
  await expectButton(
    canvasElement,
    /O que é um Design System/i,
    true,
  );
};

export const accordionPanelPlaygroundPlay: StoryPlayFn = async ({ canvasElement }) => {
  await expectButton(canvasElement, /Filtros/i, true);
};

export const tablePlaygroundPlay: StoryPlayFn = async ({ canvasElement }) => {
  await expectTableCell(canvasElement, 'Dino');
  const canvas = await canvasOf(canvasElement);
  const navigations = canvas.getAllByRole('navigation', {
    name: /Paginação da tabela/i,
  });
  await expect(navigations.length).toBeGreaterThan(0);

  const previousButtons = canvas.getAllByRole('button', { name: 'Anterior' });
  await expect(previousButtons.length).toBeGreaterThan(0);
  await expect(previousButtons[0]).toBeDisabled();
};

export async function expectNavigation(
  canvasElement: HTMLElement,
  name: string | RegExp,
): Promise<void> {
  const canvas = await canvasOf(canvasElement);
  await expect(canvas.getByRole('navigation', { name })).toBeVisible();
}

export const paginationPlaygroundPlay: StoryPlayFn = async ({ canvasElement }) => {
  await expectNavigation(canvasElement, 'Paginação de resultados');
  await expectButton(canvasElement, 'Anterior', false);
  await expectButton(canvasElement, 'Próxima', true);
};

export async function expectAlert(
  canvasElement: HTMLElement,
  name?: string | RegExp,
): Promise<void> {
  const canvas = await canvasOf(canvasElement);
  const alert = name
    ? canvas.getByRole('alert', { name })
    : canvas.getByRole('alert');

  await expect(alert).toBeVisible();
}

export const alertPlaygroundPlay: StoryPlayFn = async ({ canvasElement }) => {
  await expectAlert(canvasElement);
  await expectText(canvasElement, /Mensagem informativa/i);
  await expectButton(canvasElement, 'Fechar alerta', true);
};

export const breadcrumbPlaygroundPlay: StoryPlayFn = async ({ canvasElement }) => {
  await expectNavigation(canvasElement, 'Navegação estrutural');
};

export const cardPlaygroundPlay: StoryPlayFn = async ({ canvasElement }) => {
  await expectHeading(canvasElement, 'Design System');
};

export async function expectDialog(
  canvasElement: HTMLElement,
  name?: string | RegExp,
): Promise<void> {
  const canvas = await canvasOf(canvasElement);
  const dialog = name
    ? canvas.getByRole('dialog', { name })
    : canvas.getByRole('dialog');

  await expect(dialog).toBeVisible();
}

export const modalPlaygroundPlay: StoryPlayFn = async ({ canvasElement }) => {
  await expectDialog(canvasElement, /Informação importante/i);
  await expectButton(canvasElement, 'Entendi', true);
};

export const tabsPlaygroundPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = await canvasOf(canvasElement);
  await expect(canvas.getByRole('tablist')).toBeVisible();
  const detailsTab = canvas.getByRole('tab', { name: 'Detalhes' });
  await expect(detailsTab).toBeVisible();
  await userEvent.click(detailsTab);
  await expectText(canvasElement, /Conteúdo da aba Detalhes/i);
};

export const toastPlaygroundPlay: StoryPlayFn = async ({ canvasElement }) => {
  await expectText(canvasElement, 'Informação');
  await expectButton(canvasElement, 'Fechar notificação', true);
};

export const tooltipPlaygroundPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = await canvasOf(canvasElement);
  const trigger = canvas.getByRole('button', { name: /Passe o mouse/i });

  await expect(trigger).toBeVisible();
  await userEvent.hover(trigger);
  await expect(await canvas.findByRole('tooltip')).toBeVisible();
};

export const statCardGridPlaygroundPlay: StoryPlayFn = async ({
  canvasElement,
}) => {
  await expectText(canvasElement, 'Total de alertas');
  await expectText(canvasElement, 'Urgentes');
};
