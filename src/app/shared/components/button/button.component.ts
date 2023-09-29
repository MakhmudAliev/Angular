import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { IconDefinition, IconName, faEdit, fas } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnChanges {
  @Input() buttonText?: string;
  @Input() iconName?: IconName;
  @Input() disabled = false;
  @Input() type: 'submit' | 'button' = 'submit';
  icon: IconDefinition = faEdit;
  @Output() btnClick = new EventEmitter();

  constructor(public library: FaIconLibrary) {
    library.addIconPacks(fas);
  }

  ngOnChanges() {
    // changes
    if (this.iconName) {
      this.icon = this.library.getIconDefinition('fas', this.iconName) || faEdit;
    }
  }

  onClick() {
    this.btnClick.emit();
  }
}
