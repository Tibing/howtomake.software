import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';


@Component({
  selector: 'app-angular-cdk-crash-course',
  templateUrl: './angular-cdk-crash-course.component.html',
  styleUrls: ['./angular-cdk-crash-course.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AngularCdkCrashCourseComponent {
  drag = true;
  overlays = true;
  tables = true;

  constructor(title: Title, meta: Meta) {
    title.setTitle('Angular CDK Crash Course');
    meta.updateTag({ name: 'description', content: 'Learn how to build more robust Angular applications faster' });
  }
}
