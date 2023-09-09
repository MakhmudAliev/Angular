import { Component } from '@angular/core';
import { mockedAuthorsList, mockedCoursesList } from './shared/mocks/mock';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'courses-app';
  coursesList = mockedCoursesList.map((course, i) => ({
    ...course,
    authors: course.authors.map(authorId => mockedAuthorsList.find(author => author.id === authorId)?.name || ''),
  }));
}
