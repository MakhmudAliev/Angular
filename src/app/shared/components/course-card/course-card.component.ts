import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss'],
})
export class CourseCardComponent {
  @Input() id?: string;
  @Input() title?: string;
  @Input() description?: string;
  @Input() creationDate?: Date;
  @Input() duration?: number;
  @Input() authors?: string[];

  @Input() isEditable?: boolean;
  @Output() showCourse = new EventEmitter<string>();

  clickOnShow() {
    this.showCourse.emit(this.id);
  }
}
