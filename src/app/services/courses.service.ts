import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Author } from '@app/features/courses/model/authors.model';
import { Course } from '@app/features/courses/model/courses.model';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { v4 as uuid } from 'uuid';

type ApiResponse<T> = {
  successful: boolean;
  result: T;
};

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  constructor(private http: HttpClient) {}

  private baseUrl = 'http://localhost:4000';

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

  editCourse(id: string, course: Course) {
    return this.http.patch(`${this.baseUrl}/courses/edit/${id}`, { id, course });
  }

  getCourse(id: string) {
    return this.http.get<ApiResponse<Course>>(`${this.baseUrl}/courses/${id}`).pipe(
      switchMap(resp => {
        const course = resp.result;
        return this.fetchAuthorNames(course.authors).pipe(
          map(authorNames => {
            return { ...course, authors: authorNames };
          })
        );
      })
    );
  }

  private fetchAuthorNames(authorIds: string[]): Observable<string[]> {
    const observables = authorIds.map(authorId => this.getAuthorById(authorId));

    return forkJoin(observables).pipe(map(authors => authors.map(author => author.result.name)));
  }

  deleteCourse(id: string) {
    return this.http.delete(`${this.baseUrl}/courses/${id}`);
  }

  filterCourses(value: string) {
    const params = new HttpParams().set('title', value);
    return this.http.get<ApiResponse<Course[]>>(`${this.baseUrl}/courses/filter`, { params });
  }

  getAllAuthors() {
    return this.http.get<ApiResponse<Author[]>>(`${this.baseUrl}/authors/all`);
  }

  createAuthor(name: string) {
    const id = uuid();
    return this.http.post<ApiResponse<Author>>(`${this.baseUrl}/authors/add`, { name, id });
  }

  getAuthorById(id: string) {
    return this.http.get<ApiResponse<Author>>(`${this.baseUrl}/authors/${id}`);
  }
}
