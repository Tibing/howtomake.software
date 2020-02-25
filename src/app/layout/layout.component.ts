import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: '[np-layout]',
  styleUrls: ['./layout.component.scss'],
  templateUrl: './layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {
}
