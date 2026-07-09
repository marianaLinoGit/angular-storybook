const OVERLAY_ROOT_ID = 'ui-kit-overlay-root';

export function getUiOverlayRoot(document: Document): HTMLElement {
  const existing = document.getElementById(OVERLAY_ROOT_ID);

  if (existing instanceof HTMLElement) {
    return existing;
  }

  const root = document.createElement('div');
  root.id = OVERLAY_ROOT_ID;
  root.setAttribute('data-ui-overlay-root', 'true');
  document.body.appendChild(root);
  return root;
}

export function bringOverlayRootToFront(document: Document): void {
  const root = getUiOverlayRoot(document);

  if (root.parentElement === document.body) {
    document.body.appendChild(root);
  }
}
