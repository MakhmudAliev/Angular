import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of, tap } from 'rxjs';
import { CoursesService } from '@app/services/courses.service';
import * as CourseActions from './courses.actions';

@Injectable()
export class CoursesEffects {
  constructor(private actions$: Actions, private router: Router, private coursesService: CoursesService) {}

  getAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.requestAllCourses),
      switchMap(() =>
        this.coursesService.getAll().pipe(
          map(courses => CourseActions.requestAllCoursesSuccess({ courses })),
          catchError(error => of(CourseActions.requestAllCoursesFail({ error })))
        )
      )
    )
  );

  filteredCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.requestFilteredCourses),
      switchMap(action =>
        this.coursesService.getAll().pipe(
          map(courses => {
            const searchValue = action.title.toLowerCase();
            const filteredCourses = courses.filter(course => course.title.toLowerCase().includes(searchValue));
            return CourseActions.requestFilteredCoursesSuccess({
              courses: filteredCourses,
            });
          }),
          catchError(error => of(CourseActions.requestFilteredCoursesFail({ error })))
        )
      )
    )
  );

  getSpecificCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.requestSingleCourse),
      switchMap(({ id }) =>
        this.coursesService.getCourse(id).pipe(
          map(course => CourseActions.requestSingleCourseSuccess({ course })),
          catchError(error => of(CourseActions.requestSingleCourseFail({ error })))
        )
      )
    )
  );

  deleteCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.requestDeleteCourse),
      switchMap(({ id }) =>
        this.coursesService.deleteCourse(id).pipe(
          switchMap(() => [CourseActions.requestAllCourses()]),
          catchError(error => of(CourseActions.requestDeleteCourseFail({ error })))
        )
      )
    )
  );

  editCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.requestEditCourse),
      switchMap(({ id, course }) =>
        this.coursesService.editCourse(id, course).pipe(
          map(() => CourseActions.requestEditCourseSuccess({ course })),
          catchError(error => of(CourseActions.requestEditCourseFail({ error })))
        )
      )
    )
  );

  createCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.requestCreateCourse),
      switchMap(({ course }) =>
        this.coursesService.createCourse(course).pipe(
          map(createdCourse => CourseActions.requestCreateCourseSuccess({ course: createdCourse })),
          catchError(error => of(CourseActions.requestCreateCourseFail({ error })))
        )
      )
    )
  );

  redirectToTheCoursesPage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          CourseActions.requestCreateCourseSuccess,
          CourseActions.requestEditCourseSuccess,
          CourseActions.requestSingleCourseFail
        ),
        tap(() => {
          this.router.navigate(['/courses']);
        })
      ),
    { dispatch: false }
  );
}
