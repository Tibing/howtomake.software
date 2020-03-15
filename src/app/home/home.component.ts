import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'np-home',
  styleUrls: ['./home.component.scss'],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
}
