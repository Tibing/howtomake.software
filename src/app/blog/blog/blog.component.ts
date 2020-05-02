import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ScullyRoute, ScullyRoutesService } from '@scullyio/ng-lib';

import { ThemeService } from '../../theme.service';


interface Post {
  route: string;
  title: string;
  date: Date;
  stats: { text: string };
  description: string;
  cover: string;
}

@Component({
  selector: 'np-blog',
  styleUrls: ['./blog.component.scss'],
  templateUrl: './blog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogComponent implements OnInit, OnDestroy {

  private posts$: Observable<Post[]> = this.scullyRoutesService.available$.pipe(
    map((routes: ScullyRoute[]) => {
      return routes
        .filter((route: ScullyRoute) => route.isArticle)
        .map((route: ScullyRoute) => ({ ...route, date: new Date(route.date) })) as Post[];
    }),
  );

  new$: Observable<Post> = this.posts$.pipe(
    map((posts: Post[]) => posts[0]),
  );

  stream$: Observable<Post[]> = this.posts$.pipe(
    map((posts: Post[]) => posts.slice(1)),
  );

  constructor(private scullyRoutesService: ScullyRoutesService,
              private themeService: ThemeService) {
  }

  ngOnInit(): void {
    this.themeService.setTheme('gray');
  }

  ngOnDestroy(): void {
    this.themeService.restore();
  }
}
