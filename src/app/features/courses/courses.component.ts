import { Component, Input } from '@angular/core';
import { mockedCoursesList } from '@app/shared/mocks/mock';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent {
  @Input() courses: typeof mockedCoursesList = [];
}
