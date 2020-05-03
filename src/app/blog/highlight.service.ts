import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

import 'clipboard/dist/clipboard.js';
import 'prismjs/prism.js';
import 'prismjs/plugins/toolbar/prism-toolbar.js';
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard.js';
import 'prismjs/components/prism-bash.js';
import 'prismjs/components/prism-css.js';
import 'prismjs/components/prism-javascript.js';
import 'prismjs/components/prism-json.js';
import 'prismjs/components/prism-markup.js';
import 'prismjs/components/prism-typescript.js';


declare var Prism: {
  highlightAll(): void;
};

@Injectable({ providedIn: 'any' })
export class HighlightService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
  }

  highlightAll() {
    Prism.highlightAll();
  }
}
