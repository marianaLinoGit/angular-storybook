import { Injectable, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class RouteHistoryService {
  private router = inject(Router);
  private key = 'routeHistory.stack';
  private stack: string[] = [];

  constructor() {
    this.stack = this.read() || [];

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        const navigation = event as NavigationEnd;
        const url = navigation.urlAfterRedirects || navigation.url;
        const last = this.stack[this.stack.length - 1];

        if (last !== url) {
          this.stack.push(url);

          if (this.stack.length > 50) {
            this.stack.shift();
          }

          this.write();
        }
      });
  }

  back(fallback: string = '/'): void {
    const current = this.stack[this.stack.length - 1] || null;
    let target: string | null = null;

    for (let i = this.stack.length - 2; i >= 0; i--) {
      if (this.stack[i] !== current) {
        target = this.stack[i];
        break;
      }
    }

    if (target) {
      this.stack.pop();
      this.write();
      this.router.navigateByUrl(target, { replaceUrl: true });
      return;
    }

    this.router.navigateByUrl(fallback, { replaceUrl: true });
  }

  private read(): string[] | null {
    try {
      const raw = sessionStorage.getItem(this.key);
      return raw ? (JSON.parse(raw) as string[]) : null;
    } catch {
      return null;
    }
  }

  private write(): void {
    try {
      sessionStorage.setItem(this.key, JSON.stringify(this.stack));
    } catch {}
  }
}
