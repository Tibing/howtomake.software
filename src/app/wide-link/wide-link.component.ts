import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'np-wide-link',
  templateUrl: './wide-link.component.html',
  styleUrls: ['./wide-link.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WideLinkComponent {

  @Input() link: string;
  @Input() text: string;
  @Input() external: boolean;
}
