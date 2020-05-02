import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';

import { ThemeService } from '../theme.service';


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

  constructor(private themeService: ThemeService) {
  }

  ngOnInit(): void {
    this.themeService.setTheme('white');
  }

  ngOnDestroy(): void {
    this.themeService.restore();
  }
}
