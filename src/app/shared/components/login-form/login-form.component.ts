import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  @ViewChild('loginForm') public loginForm!: NgForm;

  email = '';
  password = '';
  isFormSubmitted = false;

  onSubmit() {
    this.isFormSubmitted = true;

    if (!this.email.trim() || !this.password.trim() || !this.loginForm.controls.email.valid) {
      return;
    }

    console.log('🚀 ~ form submited');
    this.loginForm.reset();
    this.isFormSubmitted = false;
  }
}
