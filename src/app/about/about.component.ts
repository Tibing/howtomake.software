import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'np-about',
  styleUrls: ['./about.component.scss'],
  templateUrl: './about.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {
}
