import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/auth/services/auth.service';
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
  error = '';

  constructor(public fb: FormBuilder, private authService: AuthService, private router: Router) {
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
      this.authService
        .register({
          name: this.nameFormControl.value,
          email: this.emailFormControl.value,
          password: this.passwordFormControl.value,
        })
        .subscribe({
          next: response => {
            if (response.successful) {
              this.isFormSubmitted = false;
              this.router.navigate(['/login']);
            } else {
              this.error = 'Registration failed. Please try again.';
            }
          },
          error: (err: HttpErrorResponse) => {
            this.error = err.error.errors?.[0];
          },
        });
    }
  }
}
