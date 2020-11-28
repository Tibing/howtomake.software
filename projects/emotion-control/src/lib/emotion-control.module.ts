import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmotionControlComponent } from './emotion-control.component';


@NgModule({
  declarations: [EmotionControlComponent],
  imports: [
    CommonModule,
  ],
  exports: [EmotionControlComponent]
})
export class EmotionControlModule { }
