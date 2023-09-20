import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/auth/services/auth.service';
import { SessionStorageService } from '@app/auth/services/session-storage.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  @ViewChild('loginForm') public loginForm!: NgForm;

  constructor(
    private authService: AuthService,
    private router: Router 
  ) {}

  email = '';
  password = '';
  isFormSubmitted = false;
  error = '';

  onSubmit() {
    this.isFormSubmitted = true;

    if (!this.email.trim() || !this.password.trim() || !this.loginForm.controls.email.valid) {
      return;
    }

    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: () => {
        this.router.navigate(['/courses']);
      },
      error: (err: HttpErrorResponse) => {
        this.error = 'Incorrect email or password';
      },
    });
  }
}
