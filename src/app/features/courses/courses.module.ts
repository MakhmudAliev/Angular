import { CourseCardComponent } from './course-card/course-card.component';
import { NgModule } from '@angular/core';
import { CourseListComponent } from './course-list/course-list.component';
import { SharedModule } from '@app/shared/shared.module';
import { CoursesComponent } from './courses.component';
import { CustomDatePipe } from '@app/shared/pipes/custom-date.pipe';
import { DurationPipe } from '@app/shared/pipes/duration.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CourseFormComponent } from './course-form/course-form.component';
import { CourseInfoComponent } from './course-info/course-info.component';
import { CoursesRoutingModule } from './courses-routing.module';

@NgModule({
  declarations: [
    CourseListComponent,
    CoursesComponent,
    CourseCardComponent,
    CourseFormComponent,
    CourseInfoComponent,
    DurationPipe,
    CustomDatePipe,
  ],
  imports: [SharedModule, FormsModule, ReactiveFormsModule, CoursesRoutingModule],
  exports: [
    CourseListComponent,
    CoursesComponent,
    CourseCardComponent,
    CourseFormComponent,
    CourseInfoComponent,
    DurationPipe,
    CustomDatePipe,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class CoursesModule {}
