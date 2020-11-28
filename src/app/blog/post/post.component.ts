import { AfterViewChecked, ChangeDetectionStrategy, Component } from '@angular/core';
import { ScullyRoute, ScullyRoutesService } from '@scullyio/ng-lib';
import { from, Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

import { MetadataService } from '../metadata.service';


const addonsMap = {
  'emotion-recognition': () => import('emotion-control'),
};

@Component({
  selector: 'np-post',
  styleUrls: ['./post.component.scss'],
  templateUrl: './post.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostComponent implements AfterViewChecked {

  title$: Observable<string> = this.scullyRoutesService.getCurrent().pipe(
    map((route: ScullyRoute) => route.title),
  );

  readTime$: Observable<string> = this.scullyRoutesService.getCurrent().pipe(
    map((route: ScullyRoute) => route.stats.text),
  );

  date$: Observable<string> = this.scullyRoutesService.getCurrent().pipe(
    map((route: ScullyRoute) => route.date),
  );

  comments$: Observable<string> = this.scullyRoutesService.getCurrent().pipe(
    map((route: ScullyRoute) => route.comments),
  );

  addon$: Observable<any> = this.scullyRoutesService.getCurrent().pipe(
    map((route: ScullyRoute) => route.component),
    filter(Boolean),
    switchMap((component: string) => from(addonsMap[component]())),
    map(({EmotionControlComponent}) => EmotionControlComponent),
  );

  constructor(private metadataService: MetadataService,
              private scullyRoutesService: ScullyRoutesService) {
  }

  ngAfterViewChecked(): void {
    this.metadataService.trackMetadataChanges();
  }
}
