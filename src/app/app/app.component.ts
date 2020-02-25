import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'np-root',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
}
