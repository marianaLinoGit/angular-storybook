import { expect, userEvent, within } from '@storybook/test';

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
  const checkbox = canvas.getByRole('checkbox', { name });

  await expect(checkbox).toBeVisible();

  if (toggle) {
    await userEvent.click(checkbox);
    await expect(checkbox).toBeChecked();
  }
}

export async function expectInput(
  canvasElement: HTMLElement,
  label: string | RegExp,
  value: string,
): Promise<void> {
  const canvas = await canvasOf(canvasElement);
  const input = canvas.getByLabelText(label);

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
  const trigger = canvas.getByRole('button', { name });

  await expect(trigger).toBeVisible();
  await userEvent.click(trigger);
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');
}

export async function expectSwitch(
  canvasElement: HTMLElement,
  name?: string | RegExp,
): Promise<void> {
  const canvas = await canvasOf(canvasElement);
  const switchEl = name
    ? canvas.getByRole('switch', { name })
    : canvas.getByRole('switch');

  await expect(switchEl).toBeVisible();
  await userEvent.click(switchEl);
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
  await expectButton(canvasElement, 'Criar item');
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
  await expectButton(canvasElement, 'Pet');
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
  await expectButton(canvasElement, 'Anterior', false);
};
