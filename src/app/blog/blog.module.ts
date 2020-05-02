import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ScullyLibModule} from '@scullyio/ng-lib';

import {BlogRoutingModule} from './blog-routing.module';
import {BlogComponent} from './blog/blog.component';
import { PostComponent } from './post/post.component';
import { MeFooterComponent } from './me-footer/me-footer.component';


@NgModule({
  declarations: [BlogComponent, PostComponent, MeFooterComponent],
  imports: [CommonModule, BlogRoutingModule, ScullyLibModule],
})
export class BlogModule {}
