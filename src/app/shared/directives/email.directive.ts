import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, Validators } from '@angular/forms';

@Directive({
  selector: '[emailValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: EmailValidatorDirective,
      multi: true,
    },
  ],
})
export class EmailValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return Validators.email(control);
  }
}

export function customEmailValidator(control: AbstractControl): ValidationErrors | null {
  const emailValidator = new EmailValidatorDirective();
  return emailValidator.validate(control);
}
