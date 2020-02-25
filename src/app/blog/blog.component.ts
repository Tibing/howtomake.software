import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ScullyRoute, ScullyRoutesService } from '@scullyio/ng-lib';
import { Observable } from 'rxjs';

@Component({
  selector: 'np-blog',
  styleUrls: ['./blog.component.scss'],
  templateUrl: './blog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogComponent {

  posts$: Observable<ScullyRoute[]> = this.scullyRoutesService.available$;

  constructor(private scullyRoutesService: ScullyRoutesService) {
  }
}
