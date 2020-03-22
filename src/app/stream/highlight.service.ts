import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';


declare var Prism: {
  highlightAll(): void;
};

@Injectable({ providedIn: 'any' })
export class HighlightService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
  }

  highlightAll() {
    if (isPlatformBrowser(this.platformId)) {
      Prism.highlightAll();
    }
  }
}
