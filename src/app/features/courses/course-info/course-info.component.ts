import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesFacade } from '@app/store/courses/courses.facade';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss'],
})
export class CourseInfoComponent implements OnInit {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() id?: string;
  @Input() creationDate: Date = new Date();
  @Input() duration: number = 60;
  @Input() authors: string[] = [];

  isLoading$ = this.coursesFacade.isSingleCourseLoading$;
  currentCourse$ = this.coursesFacade.course$;

  constructor(private coursesFacade: CoursesFacade, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const courseId = params.get('id');

      if (courseId) {
        this.coursesFacade.getSingleCourse(courseId);
      } else {
        this.router.navigate(['/courses']);
      }
    });
  }
}
