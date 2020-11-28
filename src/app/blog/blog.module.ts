import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { EmotionControlModule } from 'emotion-control';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './blog/blog.component';
import { PostComponent } from './post/post.component';
import { MeFooterComponent } from './me-footer/me-footer.component';
import { SubscribeModule } from '../subscribe/subscribe.module';
import { WideLinkModule } from '../wide-link/wide-link.module';
import { WebpPipe } from './blog/webp';


@NgModule({
  declarations: [BlogComponent, PostComponent, MeFooterComponent, WebpPipe],
  imports: [CommonModule, BlogRoutingModule, ScullyLibModule, SubscribeModule, WideLinkModule, EmotionControlModule],
})
export class BlogModule {
}
