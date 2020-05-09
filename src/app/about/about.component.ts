import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'np-about',
  styleUrls: ['./about.component.scss'],
  templateUrl: './about.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {

  constructor(title: Title, meta: Meta) {
    title.setTitle('About Nikita Poltoratsky');
    meta.updateTag({ name: 'description', content: 'Learn who is Nikita Poltoratsky' });
    meta.updateTag({ name: 'og:image', content: '/assets/home/cover.png' });
  }
}
