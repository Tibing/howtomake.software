import { Inject, Injectable, OnDestroy } from '@angular/core';
import { ScullyRoute, ScullyRoutesService } from '@scullyio/ng-lib';
import { Meta, Title } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({ providedIn: 'any' })
export class MetadataService implements OnDestroy {

  private destroy$ = new Subject();

  constructor(private routes: ScullyRoutesService,
              private router: Router,
              private title: Title,
              private meta: Meta) {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  trackMetadataChanges(): void {
    this.routes.getCurrent().subscribe((route: ScullyRoute) => {

      this.title.setTitle(route.title);

      const domain: string = 'howtomake.software';
      const url: string = 'https://' + domain;

      this.meta.updateTag({ property: 'og:url', content: url + this.router.url });
      this.meta.updateTag({ property: 'og:type', content: 'website' });
      this.meta.updateTag({ property: 'og:title', content: route.title });
      this.meta.updateTag({ property: 'og:description', content: route.description });
      this.meta.updateTag({ property: 'og:image', content: url + route.cover });

      this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
      this.meta.updateTag({ property: 'twitter:domain', content: domain });
      this.meta.updateTag({ property: 'twitter:url', content: url + this.router.url });
      this.meta.updateTag({ name: 'twitter:title', content: route.title });
      this.meta.updateTag({ name: 'twitter:description', content: route.description });
      this.meta.updateTag({ name: 'twitter:image', content: url + route.cover });
    });
  }
}
