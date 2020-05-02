import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

type Theme = 'yellow' | 'white' | 'gray';

@Injectable({ providedIn: 'root' })
export class ThemeService {

  private prevTheme: Theme;

  constructor(@Inject(DOCUMENT) private document) {
  }

  setTheme(theme: Theme): void {
    this.prevTheme = this.document.documentElement.style.backgroundColor;
    this.document.documentElement.style.backgroundColor = `var(--${theme})`;
  }

  restore(): void {
    this.document.documentElement.style.backgroundColor = this.prevTheme;
  }
}
