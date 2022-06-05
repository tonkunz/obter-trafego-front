import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function isGoogleCode(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null =>
    /^ua-\d{4,9}-\d{1,4}$/i.test(control.value)
      ? null
      : { invalidGoogleCode: true };
}
