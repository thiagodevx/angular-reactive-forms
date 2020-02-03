import { AbstractControl } from '@angular/forms';

export const compareEmails = (control: AbstractControl) => {
  const emailControl = control.get('email');
  const confirmEmailControl = control.get('confirmEmail');
  const emailsAreDifferent = emailControl.value !== confirmEmailControl.value;
  const dirtyControls = emailControl.dirty || confirmEmailControl.dirty;
  if (emailsAreDifferent && dirtyControls) {
    return {different: true};
  } else {
    return null;
  }
};


