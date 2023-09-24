import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CoursesService } from './courses.service';
import { v4 as uuid } from 'uuid';
import { Author } from '@app/features/courses/model/authors.model';
import { Course } from '@app/features/courses/model/courses.model';

@Injectable({
  providedIn: 'root',
})
export class CoursesStoreService {
  private isLoading$$ = new BehaviorSubject<boolean>(false);
  private courses$$ = new BehaviorSubject<Course[]>([]);
  private currentCourse$$ = new BehaviorSubject<Course | null>(null);
  private authors$$ = new BehaviorSubject<Author[]>([]);

  isLoading$ = this.isLoading$$.asObservable();
  courses$ = this.courses$$.asObservable();
  currentCourse$ = this.currentCourse$$.asObservable();
  authors$ = this.authors$$.asObservable();

  constructor(private coursesService: CoursesService) {}

  getAll() {
    // Add your code here
    this.isLoading$$.next(true);

    // TODO: unsubscribe
    this.coursesService.getAll().subscribe({
      next: courses => {
        this.courses$$.next(courses);
        this.isLoading$$.next(false);
      },
      error: () => {
        this.isLoading$$.next(false);
      },
    });
  }

  createCourse(course: Course) {
    // replace 'any' with the required interface
    // Add your code here

    this.isLoading$$.next(true);

    this.coursesService.createCourse(course).subscribe({
      next: resp => {
        console.log('resp', resp);
      },
    });
  }

  getCourse(id: string) {
    // Add your code here
    this.isLoading$$.next(true);

    this.coursesService.getCourse(id).subscribe({
      next: course => {
        this.currentCourse$$.next(course);
        this.isLoading$$.next(false);
      },
      error: () => {
        this.isLoading$$.next(false);
      },
    });
  }

  editCourse(id: string, course: any) {
    // replace 'any' with the required interface
    // Add your code here
  }

  deleteCourse(id: string) {
    // Add your code here
  }

  filterCourses(value: string) {
    // Add your code here
  }

  getAllAuthors() {
    this.isLoading$$.next(true);

    this.coursesService.getAllAuthors().subscribe({
      next: response => {
        this.authors$$.next(response.result);
      },
    });
  }

  createAuthor(name: string) {
    // Add your code here

    this.isLoading$$.next(true);

    this.coursesService.createAuthor(name).subscribe({
      next: resp => {
        console.log('🚀 ~  Author resp', resp);
        const currentAuthors = this.authors$$.value;
        currentAuthors.push({ name, id: uuid() });
        this.isLoading$$.next(false);
      },
    });
  }

  getAuthorById(id: string) {
    // Add your code here
  }
}
