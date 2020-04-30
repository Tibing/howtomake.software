import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ScullyRoute, ScullyRoutesService } from '@scullyio/ng-lib';

import { Contribution, CONTRIBUTIONS } from './contributions';


export type Stream = (Post | Contribution)[];

interface Post {
  route: string;
  title: string;
  date: Date;
  stats: { text: string };
  description: string;
}

@Injectable({ providedIn: 'any' })
export class ContributionsService {

  private contributions$: Observable<Contribution[]> = of(CONTRIBUTIONS);

  private posts$: Observable<Post[]> = this.scullyRoutesService.available$.pipe(
    map((routes: ScullyRoute[]) => {
      return routes
        .filter((route: ScullyRoute) => route.isArticle)
        .map((route: ScullyRoute) => ({ ...route, date: new Date(route.date) })) as Post[];
    }),
  );

  stream$: Observable<Stream> = combineLatest([
    this.contributions$,
    this.posts$,
  ])
    .pipe(
      map(([contributions, posts]) => ([
        ...contributions,
        ...posts,
      ])),
      map((stream: Stream) => stream.sort((a, b) => a.date.getTime() - b.date.getTime())),
    );

  constructor(private scullyRoutesService: ScullyRoutesService) {
  }
}
