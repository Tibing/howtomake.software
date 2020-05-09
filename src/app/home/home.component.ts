import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'np-home',
  styleUrls: ['./home.component.scss'],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {

  constructor(title: Title, meta: Meta) {
    title.setTitle('howtomake.software');
    meta.updateTag({ name: 'description', content: 'Personal blog by Nikita Poltoratsy' });
    meta.updateTag({ name: 'og:image', content: '/assets/home/cover.png' });
  }
}
