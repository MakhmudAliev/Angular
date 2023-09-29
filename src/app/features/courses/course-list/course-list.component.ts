import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserStoreService } from '@app/user/services/user-store.service';
import { Course } from '../model/courses.model';
import { CoursesFacade } from '@app/store/courses/courses.facade';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
})
export class CourseListComponent {
  @Input() courses: Course[] = [];
  @Input() editable: boolean = false;

  isAdmin$ = this.userStoreService.isAdmin$;

  @Output() showCourse: EventEmitter<string> = new EventEmitter<string>();
  @Output() editCourse: EventEmitter<string> = new EventEmitter<string>();
  @Output() deleteCourse: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private router: Router,
    private userStoreService: UserStoreService,
    private coursesFacade: CoursesFacade
  ) {}

  onShowCourse(courseId: string) {
    this.router.navigate(['/courses', courseId]);
  }

  onEditCourse(courseId: string) {
    console.log('🚀 ~ onEditCourse:', courseId);
    this.router.navigate(['/courses/edit', courseId]);
  }

  onDeleteCourse(courseId: string) {
    this.coursesFacade.deleteCourse(courseId);
  }

  parseDate = (dateString: string): Date => {
    const parts = dateString.split('/');
    return new Date(+parts[2], +parts[1] - 1, +parts[0]);
  };
}
