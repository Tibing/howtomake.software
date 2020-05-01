import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AngularCdkCrashCourseComponent } from './angular-cdk-crash-course/angular-cdk-crash-course.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'course/angular-cdk-crash-course', component: AngularCdkCrashCourseComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
