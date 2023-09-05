import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent {
  // Use the names `title` and `text`.
  @Input() title = 'Your List Is Empty';
  @Input() text?: string;
}
