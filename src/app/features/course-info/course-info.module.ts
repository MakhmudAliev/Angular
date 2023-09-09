import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { CourseInfoComponent } from './course-info.component';

@NgModule({
  declarations: [CourseInfoComponent],
  imports: [SharedModule],
  exports: [CourseInfoComponent],
})
export class CourseInfoModule {}
