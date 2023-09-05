import { Component, EventEmitter, Input, Output } from '@angular/core';
import { mockedCoursesList } from '@app/shared/mocks/mock';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
})
export class CourseListComponent {
  @Input() courses: typeof mockedCoursesList = [];

  @Output() showCourse: EventEmitter<string> = new EventEmitter<string>();
  @Output() editCourse: EventEmitter<string> = new EventEmitter<string>();
  @Output() deleteCourse: EventEmitter<string> = new EventEmitter<string>();

  onShowCourse = (courseId: string) => {
    console.log('🚀 ~ onShowCourse:', courseId);
    this.showCourse.emit(courseId);
  };

  onEditCourse = (courseId: string) => {
    console.log('🚀 ~ onEditCourse:', courseId);
    this.editCourse.emit(courseId);
  };

  onDeleteCourse = (courseId: string) => {
    console.log('🚀 ~ onDeleteCourse:', courseId);
    this.deleteCourse.emit(courseId);
  };

  parseDate = (dateString: string): Date => {
    const parts = dateString.split('/');
    return new Date(+parts[2], +parts[1] - 1, +parts[0]);
  };
}
