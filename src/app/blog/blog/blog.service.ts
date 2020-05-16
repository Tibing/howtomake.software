import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ScullyRoute, ScullyRoutesService } from '@scullyio/ng-lib';
import { ActivatedRoute, ParamMap } from '@angular/router';


export interface Post {
  route: string;
  title: string;
  date: Date;
  stats: { text: string };
  description: string;
  cover: string;
}

export type Posts = Post[];

@Injectable({ providedIn: 'any' })
export class BlogService {

  private showUnlisted$: Observable<boolean> = this.route.queryParamMap.pipe(
    map((params: ParamMap) => !!params.get('unlisted')),
  );

  private routes$: Observable<ScullyRoute[]> = combineLatest([
    this.scullyRoutesService.available$,
    this.showUnlisted$,
  ]).pipe(
    map(([routes, showUnlisted]: [ScullyRoute[], boolean]) => {
      return this.selectVisibleRoutes(routes, showUnlisted);
    }),
  );

  private posts$: Observable<Posts> = this.routes$
    .pipe(
      map((routes: ScullyRoute[]) => this.extractPostsData(routes)),
      map((posts: Posts) => this.sortPosts(posts)),
      map((posts: Posts) => this.addEllipsisToLongDescriptions(posts)),
    );

  readonly new$: Observable<Post> = this.posts$.pipe(
    map((posts: Posts) => posts[0]),
  );

  readonly stream$: Observable<Posts> = this.posts$.pipe(
    map((posts: Posts) => posts.slice(1)),
  );

  constructor(private scullyRoutesService: ScullyRoutesService,
              private route: ActivatedRoute) {
  }

  private selectVisibleRoutes(routes: ScullyRoute[], showUnlisted: boolean): ScullyRoute[] {
    return routes
      .filter((route: ScullyRoute) => route.isArticle && (showUnlisted ? true : !route.unlisted));
  }

  private extractPostsData(routes: ScullyRoute[]): Posts {
    return routes
      .map((route: ScullyRoute) => ({ ...route, date: new Date(route.date) })) as Posts;
  }

  private sortPosts(posts: Posts): Posts {
    return posts.sort((post: Post, post1: Post) => {
      return (post1.date as any) - (post.date as any);
    });
  }

  private addEllipsisToLongDescriptions(posts: Posts): Posts {
    return posts.map((post: Post) => {
      const MAX_DESCRIPTION_LEN = 110;

      if (post.description.length > MAX_DESCRIPTION_LEN) {
        post.description = post.description.slice(0, MAX_DESCRIPTION_LEN) + '...';
      }

      return post;
    });
  }
}
