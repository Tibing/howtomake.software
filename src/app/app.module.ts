import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/app.component';
import { LayoutComponent } from './layout/layout.component';
import { ContributionsComponent } from './contributions/contributions.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { LetsGetAcquaintedComponent } from './home/lets-get-acquainted/lets-get-acquainted.component';
import { SocialLinksComponent } from './home/social-links/social-links.component';
import { PleaseReadMyBlogComponent } from './home/please-read-my-blog/please-read-my-blog.component';


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    HomeComponent,
    AboutComponent,
    ContributionsComponent,
    LetsGetAcquaintedComponent,
    SocialLinksComponent,
    PleaseReadMyBlogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ScullyLibModule,
    FontAwesomeModule,
    ReactiveFormsModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
