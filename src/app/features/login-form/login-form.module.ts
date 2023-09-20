import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { LoginFormComponent } from './login-form.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [LoginFormComponent],
  imports: [SharedModule, RouterModule.forChild([{ path: '', component: LoginFormComponent }])],
  exports: [LoginFormComponent],
})
export class LoginFormModule {}
