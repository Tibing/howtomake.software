import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StreamComponent } from './stream/stream.component';
import { PostComponent } from './post/post.component';

const routes: Routes = [
  {
    path: '',
    component: StreamComponent,
  },
  {
    path: ':slug',
    component: PostComponent,
  },
  {
    path: '**',
    component: StreamComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StreamRoutingModule {
}
