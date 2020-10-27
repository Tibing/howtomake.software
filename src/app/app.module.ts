import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ScullyLibModule } from '@scullyio/ng-lib';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/app.component';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { HomeComponent } from './home/home.component';
import { MeComponent } from './home/me/me.component';
import { BlogComponent } from './home/blog/blog.component';
import { SocialsComponent } from './socials/socials.component';
import { AboutComponent } from './about/about.component';
import { SubscribeModule } from './subscribe/subscribe.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { WideLinkModule } from './wide-link/wide-link.module';


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    HomeComponent,
    MeComponent,
    BlogComponent,
    SocialsComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ScullyLibModule,
    SubscribeModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    WideLinkModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
