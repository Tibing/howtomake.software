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
import { AcquaintedComponent } from './home/acquainted/acquainted.component';
import { SocialsComponent } from './socials/socials.component';
import { AngularCdkCrashCourseComponent } from './angular-cdk-crash-course/angular-cdk-crash-course.component';
import { AboutComponent } from './about/about.component';


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    HomeComponent,
    MeComponent,
    BlogComponent,
    AcquaintedComponent,
    SocialsComponent,
    AngularCdkCrashCourseComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ScullyLibModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
