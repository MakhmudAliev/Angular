import { NgModule } from '@angular/core';
import { CourseListComponent } from './course-list/course-list.component';
import { SharedModule } from '@app/shared/shared.module';
import { CoursesComponent } from './courses.component';

@NgModule({
  declarations: [CourseListComponent, CoursesComponent],
  imports: [SharedModule],
  exports: [CourseListComponent, CoursesComponent],
})
export class CoursesModule {}
