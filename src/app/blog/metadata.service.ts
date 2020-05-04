import { Injectable, OnDestroy } from '@angular/core';
import { ScullyRoute, ScullyRoutesService } from '@scullyio/ng-lib';
import { Meta, Title } from '@angular/platform-browser';
import { Subject } from 'rxjs';


@Injectable({ providedIn: 'any' })
export class MetadataService implements OnDestroy {

  private destroy$ = new Subject();

  constructor(private routes: ScullyRoutesService,
              private title: Title,
              private meta: Meta) {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  trackMetadataChanges(): void {
    this.routes.getCurrent().subscribe((route: ScullyRoute) => {
      const meta = ['description', 'author', 'keyword'];
      this.title.setTitle(route.title);

      for (const tag of meta) {
        this.meta.updateTag({ name: tag, content: route[tag] });
      }
    });
  }
}
