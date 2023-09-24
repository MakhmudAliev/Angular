import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SessionStorageService } from '@app/auth/services/session-storage.service';
import { Author } from '@app/features/courses/model/authors.model';
import { Course } from '@app/features/courses/model/courses.model';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

type ApiResponse<T> = {
  successful: boolean;
  result: T;
};

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  constructor(private http: HttpClient, private sessionStorage: SessionStorageService) {}

  private baseUrl = 'http://localhost:4000';
  private headers = new HttpHeaders({
    Authorization: `${this.sessionStorage.getToken()}`,
  });

  getAll() {
    return this.http.get<ApiResponse<Course[]>>(`${this.baseUrl}/courses/all`).pipe(
      // TODO: chain inside of pipe, instead of nested operations
      switchMap(({ result: courses }) => {
        const authorRequests = courses.map(course => this.fetchAuthorNames(course.authors));
        return forkJoin(authorRequests).pipe(
          map(authorNames => {
            courses.forEach((course, index) => {
              course.authors = authorNames[index];
            });
            return courses;
          })
        );
      })
    );
  }

  createCourse(course: Course) {
    return this.http.post<Course>(`${this.baseUrl}/courses/add`, course);
  }

  editCourse(id: string, course: Course) {}

  getCourse(id: string) {
    return this.http.get<ApiResponse<Course>>(`${this.baseUrl}/courses/${id}`).pipe(
      map(resp => {
        const course = resp.result;
        this.fetchAuthorNames(course.authors).subscribe(val => {
          course.authors = val;
        });
        return course;
      })
    );
  }

  private fetchAuthorNames(authorIds: string[]): Observable<string[]> {
    const observables = authorIds.map(authorId => this.getAuthorById(authorId));

    return forkJoin(observables).pipe(map(authors => authors.map(author => author.result.name)));
  }

  deleteCourse(id: string) {
    // Add your code here
  }

  filterCourses(value: string) {
    // Add your code here
  }

  getAllAuthors() {
    return this.http.get<ApiResponse<Author[]>>(`${this.baseUrl}/authors/all`);
  }

  createAuthor(name: string) {
    return this.http.post<Author>(`${this.baseUrl}/authors/add`, { name, id: 'id' });
  }

  getAuthorById(id: string) {
    return this.http.get<ApiResponse<Author>>(`${this.baseUrl}/authors/${id}`);
  }
}
