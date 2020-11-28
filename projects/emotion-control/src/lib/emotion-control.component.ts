import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { EmotionControlService } from './emotion-control.service';

@Component({
  selector: 'ec-emotion-control',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./emotion-control.component.scss'],
  template: `
    <video #video width="600" height="450"></video>
    <canvas #canvas width="600" height="450"></canvas>

    <div class="info">
      <span *ngIf="emotionControl.expression$ | async as expression">You are: {{ expression }}</span>
    </div>

    <div class="loader-container" *ngIf="emotionControl.loading$ | async">
      <div class="lds-spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  `,
})
export class EmotionControlComponent implements AfterViewInit {

  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('video') video: ElementRef;

  constructor(public emotionControl: EmotionControlService) {
  }

  ngAfterViewInit(): void {
    this.emotionControl
      .start({
        video: this.video.nativeElement,
        canvas: this.canvas.nativeElement,
      });
  }
}
