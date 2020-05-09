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
  ]).pipe(
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
    map((posts: Post[]) => {
      return posts.sort((post: Post, post1: Post) => {
        return (post1.date as any) - (post.date as any);
      })
        .map((post: Post) => {
          const MAX_DESCRIPTION_LEN = 110;

          if (post.description.length > MAX_DESCRIPTION_LEN) {
            post.description = post.description.slice(0, MAX_DESCRIPTION_LEN) + '...';
          }

          return post;
        });
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
    meta.updateTag({ name: 'og:image', content: '/assets/home/cover.png' });
  }
}
