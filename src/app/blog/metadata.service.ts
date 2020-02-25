import { Injectable } from '@angular/core';
import { ScullyRoute, ScullyRoutesService } from '@scullyio/ng-lib';
import { Meta, Title } from '@angular/platform-browser';


@Injectable({ providedIn: 'any' })
export class MetadataService {

  constructor(private routes: ScullyRoutesService,
              private title: Title,
              private meta: Meta) {
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
