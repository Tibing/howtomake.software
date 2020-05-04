import { ChangeDetectionStrategy, Component } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ScullyRoute, ScullyRoutesService } from '@scullyio/ng-lib';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';


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
export class BlogComponent {

  private showUnlisted$: Observable<boolean> = this.route.queryParamMap.pipe(
    map((params: ParamMap) => !!params.get('unlisted')),
  );

  private posts$: Observable<Post[]> = combineLatest([
    this.scullyRoutesService.available$,
    this.showUnlisted$,
  ]) .pipe(
    map(([routes, showUnlisted]: [ScullyRoute[], boolean]) => {
      if (showUnlisted) {
        return routes
          .filter((route: ScullyRoute) => route.isArticle)
          .map((route: ScullyRoute) => ({ ...route, date: new Date(route.date) })) as Post[];
      }

      return routes
        .filter((route: ScullyRoute) => !route.unlisted && route.isArticle)
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
              private route: ActivatedRoute,
              title: Title,
              meta: Meta) {
    title.setTitle('Blog by Nikita Poltoratsky');
    meta.updateTag({ name: 'description', content: 'Personal blog by Nikita Poltoratsky' });
  }
}
