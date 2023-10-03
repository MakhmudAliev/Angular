import { Component, OnInit } from '@angular/core';
import { CoursesFacade } from '@app/store/courses/courses.facade';
import { UserStoreService } from '@app/user/services/user-store.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  isLoading$ = this.coursesFacade.isAllCoursesLoading$;
  courses$ = this.coursesFacade.allCourses$;

  constructor(private userStoreService: UserStoreService, private coursesFacade: CoursesFacade) {}

  ngOnInit(): void {
    this.coursesFacade.getAllCourses();
    this.userStoreService.getUser();
  }

  onSearchClick(searchQuery: string) {
    this.coursesFacade.getFilteredCourses(searchQuery);
  }
}
