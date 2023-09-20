import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseFormComponent } from './course-form/course-form.component';
import { CoursesComponent } from './courses.component';
import { CourseInfoComponent } from './course-info/course-info.component';
import { AdminGuard } from '@app/user/guards/admin.guard';
import { AuthorizedGuard } from '@app/auth/guards/authorized.guard';

const routes: Routes = [
  {
    path: '',
    component: CoursesComponent,
    canActivate: [AuthorizedGuard],
  },
  {
    path: 'add',
    component: CourseFormComponent,
    canActivate: [AdminGuard],
  },
  { path: ':id', component: CourseInfoComponent, canActivate: [AuthorizedGuard] },
  // {
  //   path: 'edit/:id',
  //   component: CourseEditComponent,
  //   canActivate: [AdminGuard],
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule {}
