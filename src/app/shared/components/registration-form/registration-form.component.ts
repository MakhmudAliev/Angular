import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { customEmailValidator } from '@app/shared/directives/email.directive';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent {
  registrationForm!: FormGroup;
  // Use the names `name`, `email`, `password` for the form controls.
  isFormSubmitted = false;

  constructor(public fb: FormBuilder) {
    this.registrationForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, customEmailValidator]],
      password: ['', [Validators.required]],
    });
  }

  get nameFormControl() {
    return this.registrationForm.controls.name;
  }

  get emailFormControl() {
    return this.registrationForm.controls.email;
  }

  get passwordFormControl() {
    return this.registrationForm.controls.password;
  }

  onSubmit() {
    this.isFormSubmitted = true;

    if (this.registrationForm.valid) {
      console.log('🚀 ~ Submitted the form');
      this.registrationForm.reset();
      this.isFormSubmitted = false;
    }
  }
}
