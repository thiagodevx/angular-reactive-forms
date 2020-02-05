import { AbstractControl, ValidatorFn } from '@angular/forms';

export class NumberValidators {

  static range(min: number, max: number): ValidatorFn {
    return (c: AbstractControl) => {
      if (c.value && (isNaN(c.value) || c.value < min || c.value > max)) {
        return { range: true };
      }
      return null;
    };
  }
}
