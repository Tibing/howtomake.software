import { ChangeDetectionStrategy, Component } from '@angular/core';


@Component({
  selector: 'app-angular-cdk-crash-course',
  templateUrl: './angular-cdk-crash-course.component.html',
  styleUrls: ['./angular-cdk-crash-course.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AngularCdkCrashCourseComponent {
  drag = false;
  overlays = false;
  tables = false;
}
