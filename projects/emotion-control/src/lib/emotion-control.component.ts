import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { EmotionControlService } from './emotion-control.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'ec-emotion-control',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./emotion-control.component.scss'],
  template: `
    <button *ngIf="!(loaded$ | async)" (click)="load()">Start Emotion Recognition</button>
    <div class="emotion-recognition" [class.visible]="loaded$ | async">
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

        <div class="text">
          <span>Please wait. It'll take a few seconds.</span>
          <span>We need to load emotion detector.</span>
        </div>
      </div>
    </div>
  `,
})
export class EmotionControlComponent {

  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('video') video: ElementRef;

  loaded$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(public emotionControl: EmotionControlService) {
  }

  load(): void {
    this.emotionControl
      .start({
        video: this.video.nativeElement,
        canvas: this.canvas.nativeElement,
      });
    this.loaded$.next(true);
  }
}
