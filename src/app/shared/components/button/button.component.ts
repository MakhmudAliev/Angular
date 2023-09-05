import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { IconDefinition, IconName, faEdit, fas } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() buttonText?: string;
  @Input() iconName?: IconName;
  icon: IconDefinition = faEdit;
  @Output() btnClick = new EventEmitter();

  constructor(public library: FaIconLibrary) {
    library.addIconPacks(fas);
  }

  ngOnInit() {
    if (this.iconName) {
      this.icon = this.library?.getIconDefinition('fas', this.iconName) || faEdit;
    }
  }

  onClick = () => {
    this.btnClick.emit();
  };
}
