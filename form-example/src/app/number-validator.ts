import { AbstractControl, ValidatorFn } from '@angular/forms';

export const ratingRangeFrom1To5 = (control: AbstractControl) => {
  const isNull = control.value === null;
  const isNotANumber = isNaN(control.value);
  const wrongRange = control.value > 5 || control.value < 1;
  if (isNull || isNotANumber || wrongRange) {
    return {range: true};
  } else {
    return null;
  }
};

export const ratingRangeFromXToY = (min: number, max: number): ValidatorFn => {
  return (control: AbstractControl) => {
    const isNull = control.value === null;
    const isNotANumber = isNaN(control.value);
    const wrongRange = control.value > max || control.value < min;
    if (isNull || isNotANumber || wrongRange) {
      return {range: true};
    } else {
      return null;
    }
  };
};


