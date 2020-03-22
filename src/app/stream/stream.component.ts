import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ScullyRoute, ScullyRoutesService } from '@scullyio/ng-lib';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Post {
  route: string;
  title: string;
  date: Date;
  stats: { text: string };
  description: string;
}

@Component({
  selector: 'np-stream',
  styleUrls: ['./stream.component.scss'],
  templateUrl: './stream.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StreamComponent {

  posts$: Observable<Post[]> = this.scullyRoutesService.available$.pipe(
    map((routes: ScullyRoute[]) => routes.filter((route: ScullyRoute) => route.isArticle) as Post[]),
  );

  constructor(private scullyRoutesService: ScullyRoutesService) {
  }
}
