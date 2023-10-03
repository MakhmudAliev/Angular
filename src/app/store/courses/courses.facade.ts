import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CoursesState } from './courses.reducer';
import { coursesQuery } from './courses.selectors';
import {
  requestAllCourses,
  requestCreateCourse,
  requestDeleteCourse,
  requestFilteredCourses,
  requestSingleCourse,
} from './courses.actions';
import { Course } from '@app/features/courses/model/courses.model';

@Injectable({
  providedIn: 'root',
})
export class CoursesFacade {
  isAllCoursesLoading$ = this.store.select(coursesQuery.isAllCoursesLoadingSelector);
  isSingleCourseLoading$ = this.store.select(coursesQuery.isSingleCourseLoadingSelector);
  isSearchingState$ = this.store.select(coursesQuery.isSearchingStateSelector);
  allCourses$ = this.store.select(coursesQuery.getAllCourses);
  course$ = this.store.select(coursesQuery.getCourse);
  errorMessage$ = this.store.select(coursesQuery.getErrorMessage);

  constructor(private store: Store<CoursesState>) {}

  getAllCourses() {
    this.store.dispatch(requestAllCourses());
  }

  getSingleCourse(id: string) {
    this.store.dispatch(requestSingleCourse({ id }));
  }

  getFilteredCourses(searchValue: string) {
    this.store.dispatch(requestFilteredCourses({ title: searchValue }));
  }

  // editCourse(body, id) -> requestEditCourse({ body, id })

  createCourse(course: Course) {
    this.store.dispatch(requestCreateCourse({ course }));
  }

  deleteCourse(id: string) {
    this.store.dispatch(requestDeleteCourse({ id }));
  }
}
