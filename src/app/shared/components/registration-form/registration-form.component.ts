import { Component, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent {
  @ViewChild('registrationForm') public registrationForm!: NgForm;
  // Use the names `name`, `email`, `password` for the form controls.
  name = '';
  email = '';
  password = '';
  isFormSubmitted = false;

  onSubmit() {
    this.isFormSubmitted = true;

    if (!this.name.trim() || !this.email.trim() || !this.password.trim()) {
      return;
    }

    console.log('🚀 ~ Registration Form Submitted:');
    this.registrationForm.reset();
    this.isFormSubmitted = false;
  }
}
