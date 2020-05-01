import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-angular-cdk-crash-course',
  templateUrl: './angular-cdk-crash-course.component.html',
  styleUrls: ['./angular-cdk-crash-course.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AngularCdkCrashCourseComponent implements OnInit, OnDestroy {
  drag = false;
  overlays = false;
  tables = false;

  private prevBackground: string;

  constructor(@Inject(DOCUMENT) private document) {
  }

  ngOnDestroy(): void {
    this.document.documentElement.style.backgroundColor = this.prevBackground;
  }

  ngOnInit(): void {
    this.prevBackground = this.document.documentElement.style.backgroundColor;
    this.document.documentElement.style.backgroundColor = 'white';
  }
}
