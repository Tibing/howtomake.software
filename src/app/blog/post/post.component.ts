import { AfterViewChecked, ChangeDetectionStrategy, Component } from '@angular/core';
import { ScullyRoute, ScullyRoutesService } from '@scullyio/ng-lib';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { MetadataService } from '../metadata.service';


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

  constructor(private metadataService: MetadataService,
              private scullyRoutesService: ScullyRoutesService) {
  }

  ngAfterViewChecked(): void {
    this.metadataService.trackMetadataChanges();
  }
}
