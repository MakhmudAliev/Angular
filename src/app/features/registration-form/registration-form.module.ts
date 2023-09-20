import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { RegistrationFormComponent } from './registration-form.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [RegistrationFormComponent],
  imports: [SharedModule, RouterModule.forChild([{ path: '', component: RegistrationFormComponent }])],
  exports: [RegistrationFormComponent],
})
export class RegistrationFormModule {}
