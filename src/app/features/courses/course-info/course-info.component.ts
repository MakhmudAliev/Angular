import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesStoreService } from '@app/services/courses-store.service';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss'],
})
export class CourseInfoComponent implements OnInit {
  // Use the names for the input `course`.
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() id?: string;
  @Input() creationDate: Date = new Date();
  @Input() duration: number = 60;
  @Input() authors: string[] = [];

  isLoading$ = this.coursesStore.isLoading$;
  currentCourse$ = this.coursesStore.currentCourse$;

  constructor(private coursesStore: CoursesStoreService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const courseId = params.get('id');

      if (courseId) {
        this.coursesStore.getCourse(courseId);
      } else {
        this.router.navigate(['/courses']);
      }
    });
  }
}
