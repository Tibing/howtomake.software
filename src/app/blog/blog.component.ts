import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ScullyRoute, ScullyRoutesService } from '@scullyio/ng-lib';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'np-blog',
  styleUrls: ['./blog.component.scss'],
  templateUrl: './blog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogComponent {

  posts$: Observable<ScullyRoute[]> = this.scullyRoutesService.available$.pipe(
    map((routes: ScullyRoute[]) => routes.filter((route: ScullyRoute) => route.isArticle)),
  );

  constructor(private scullyRoutesService: ScullyRoutesService) {
  }
}
