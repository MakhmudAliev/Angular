import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { CoursesService } from './courses.service';
import { v4 as uuid } from 'uuid';
import { Author } from '@app/features/courses/model/authors.model';
import { Course } from '@app/features/courses/model/courses.model';

@Injectable({
  providedIn: 'root',
})
export class CoursesStoreService implements OnDestroy {
  private isLoading$$ = new BehaviorSubject<boolean>(false);
  private courses$$ = new BehaviorSubject<Course[]>([]);
  private currentCourse$$ = new BehaviorSubject<Course | null>(null);
  private authors$$ = new BehaviorSubject<Author[]>([]);

  private subscriptions: Subscription[] = [];

  isLoading$ = this.isLoading$$.asObservable();
  courses$ = this.courses$$.asObservable();
  currentCourse$ = this.currentCourse$$.asObservable();
  authors$ = this.authors$$.asObservable();

  constructor(private coursesService: CoursesService) {}

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    this.subscriptions = [];
  }

  getAll() {
    // Add your code here
    this.isLoading$$.next(true);

    // TODO: unsubscribe
    const subscription = this.coursesService.getAll().subscribe({
      next: courses => {
        this.courses$$.next(courses);
        this.isLoading$$.next(false);
      },
      error: () => {
        this.isLoading$$.next(false);
      },
    });

    this.subscriptions.push(subscription);
  }

  createCourse(course: Course) {
    // replace 'any' with the required interface
    // Add your code here

    return this.coursesService.createCourse(course);
  }

  getCourse(id: string) {
    // Add your code here
    this.isLoading$$.next(true);

    const subscription = this.coursesService.getCourse(id).subscribe({
      next: course => {
        console.log('🚀 ~ ===course:', course);
        this.currentCourse$$.next(course);
        this.isLoading$$.next(false);
      },
      error: () => {
        this.isLoading$$.next(false);
      },
    });

    this.subscriptions.push(subscription);
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

    const subscription = this.coursesService.getAllAuthors().subscribe({
      next: response => {
        this.authors$$.next(response.result);
      },
    });
    this.subscriptions.push(subscription);
  }

  createAuthor(name: string) {
    // Add your code here

    this.isLoading$$.next(true);

    const subscription = this.coursesService.createAuthor(name).subscribe({
      next: resp => {
        this.authors$$.next([...this.authors$$.getValue(), resp.result]);
        this.isLoading$$.next(false);
      },
    });
    this.subscriptions.push(subscription);
  }

  getAuthorById(id: string) {
    // Add your code here
  }
}
