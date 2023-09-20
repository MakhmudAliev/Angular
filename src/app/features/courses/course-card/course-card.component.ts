import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss'],
})
export class CourseCardComponent implements OnInit {
  @Input() id?: string;
  @Input() title?: string;
  @Input() description?: string;
  @Input() creationDate?: Date;
  @Input() duration?: number;
  @Input() authors?: string[];

  @Input() isEditable: boolean = false;
  @Output() showCourse = new EventEmitter<string>();

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const courseId = this.route.snapshot.paramMap.get('id');
  }

  clickOnShow() {
    this.showCourse.emit(this.id);
  }
}
