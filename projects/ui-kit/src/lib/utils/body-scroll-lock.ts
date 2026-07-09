import type { Renderer2 } from '@angular/core';

function shouldLockDocumentScroll(document: Document): boolean {
  // Storybook renderiza docs e stories no mesmo iframe; travar o body
  // impede rolar a documentação enquanto o cropper/modal está aberto.
  return !document.getElementById('storybook-root');
}

export class BodyScrollLock {
  private static openCount = 0;
  private static savedOverflow: string | null = null;

  static lock(document: Document, renderer: Renderer2): void {
    if (!shouldLockDocumentScroll(document)) {
      return;
    }

    BodyScrollLock.openCount += 1;

    if (BodyScrollLock.openCount === 1) {
      BodyScrollLock.savedOverflow = document.body.style.overflow;
      renderer.setStyle(document.body, 'overflow', 'hidden');
    }
  }

  static unlock(document: Document, renderer: Renderer2): void {
    if (!shouldLockDocumentScroll(document)) {
      return;
    }

    BodyScrollLock.openCount = Math.max(0, BodyScrollLock.openCount - 1);

    if (BodyScrollLock.openCount === 0) {
      if (BodyScrollLock.savedOverflow) {
        renderer.setStyle(document.body, 'overflow', BodyScrollLock.savedOverflow);
      } else {
        renderer.removeStyle(document.body, 'overflow');
      }

      BodyScrollLock.savedOverflow = null;
    }
  }
}
