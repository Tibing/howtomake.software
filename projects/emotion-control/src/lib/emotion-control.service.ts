import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Box, detectSingleFace, nets, SsdMobilenetv1Options, WithFaceExpressions } from 'face-api.js';

interface ImageProvider {
  video: HTMLVideoElement;
  canvas: HTMLCanvasElement;
}

@Injectable({ providedIn: 'root' })
export class EmotionControlService {


  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  expression$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  age$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  loaded: boolean = false;

  async start(image: ImageProvider): Promise<void> {

    image.video.srcObject = await navigator
      .mediaDevices
      .getUserMedia({ video: true });

    await image.video.play();

    await nets.ssdMobilenetv1.loadFromUri('/assets/emotion-control');
    await nets.ageGenderNet.loadFromUri('/assets/emotion-control');
    await nets.faceExpressionNet.loadFromUri('/assets/emotion-control');

    this.detect(image);
  }

  async detect(image: ImageProvider): Promise<void> {
    const detectionWithLandmarks: WithFaceExpressions<any>
      = await detectSingleFace(image.video, new SsdMobilenetv1Options())
      .withAgeAndGender()
      .withFaceExpressions()
      .run();


    const ctx: CanvasRenderingContext2D = image.canvas.getContext('2d');
    if (!detectionWithLandmarks) {
      ctx.clearRect(0, 0, image.canvas.width, image.canvas.height);
      requestAnimationFrame(() => this.detect(image));
      return;
    }


    const expressions: { expression: string; probability: number; }[] = detectionWithLandmarks.expressions.asSortedArray();

    this.expression$.next(expressions[0].expression);
    this.age$.next(Math.round(detectionWithLandmarks.age) + '');

    if (!this.loaded) {
      this.loaded = true;
      this.loading$.next(false);
    }

    const box: Box = detectionWithLandmarks.detection.box;

    ctx.strokeStyle = 'red';
    ctx.clearRect(0, 0, image.canvas.width, image.canvas.height);
    ctx.beginPath();
    ctx.rect(Math.round(box.x), Math.round(box.y), Math.round(box.width), Math.round(box.height));
    ctx.stroke();

    requestAnimationFrame(() => this.detect(image));
  }

}
