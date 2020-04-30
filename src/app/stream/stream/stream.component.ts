import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';

import { ContributionsService, Stream } from '../contributions/contributions.service';


@Component({
  selector: 'np-stream',
  styleUrls: ['./stream.component.scss'],
  templateUrl: './stream.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StreamComponent {

  stream$: Observable<Stream> = this.contributionsService.stream$;

  constructor(private contributionsService: ContributionsService) {
  }
}
