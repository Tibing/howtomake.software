import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ScullyLibModule} from '@scullyio/ng-lib';

import {StreamRoutingModule} from './stream-routing.module';
import {StreamComponent} from './stream.component';
import { PostComponent } from './post/post.component';


@NgModule({
  declarations: [StreamComponent, PostComponent],
  imports: [CommonModule, StreamRoutingModule, ScullyLibModule],
})
export class StreamModule {}
