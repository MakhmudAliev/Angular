import { Component, OnInit } from '@angular/core';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { UserStoreService } from '@app/user/services/user-store.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  isLoading$ = this.coursesStore.isLoading$;
  courses$ = this.coursesStore.courses$;

  constructor(private coursesStore: CoursesStoreService, private userStoreService: UserStoreService) {}

  ngOnInit(): void {
    this.coursesStore.getAll();
    this.userStoreService.getUser();
  }

  onSearchClick(searchQuery: string) {
    console.log('🚀 ~ search...', searchQuery);
  }
}
