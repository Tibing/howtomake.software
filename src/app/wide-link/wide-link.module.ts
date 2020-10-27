import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';

import { WideLinkComponent } from './wide-link.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [WideLinkComponent],
  exports: [WideLinkComponent],
})
export class WideLinkModule {}