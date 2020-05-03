import { ChangeDetectionStrategy, Component } from '@angular/core';


@Component({
  selector: '[np-header]',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
}
