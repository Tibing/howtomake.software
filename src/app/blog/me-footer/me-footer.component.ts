import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'np-me-footer',
  templateUrl: './me-footer.component.html',
  styleUrls: ['./me-footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MeFooterComponent {
}
