import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModalComponent } from './components/modal/modal.component';
import { HeaderComponent, ButtonComponent, InfoComponent, SearchComponent } from './components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmailValidatorDirective } from '@shared/directives/email.directive';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { RouterModule } from '@angular/router';

const components = [
  HeaderComponent,
  ButtonComponent,
  InfoComponent,
  SearchComponent,
  ModalComponent,
  EmailValidatorDirective,
  SpinnerComponent,
];

@NgModule({
  declarations: [components, SpinnerComponent],
  imports: [CommonModule, FontAwesomeModule, FormsModule, ReactiveFormsModule, RouterModule],
  exports: [components, CommonModule, FormsModule, ReactiveFormsModule],
})
export class SharedModule {}
