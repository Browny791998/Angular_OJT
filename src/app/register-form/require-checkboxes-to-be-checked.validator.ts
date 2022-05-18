
import { FormGroup, ValidatorFn } from '@angular/forms';

export const requireCheckboxesToBeCheckedValidator:ValidatorFn = () => {
  return function validate (formGroup:FormGroup) {
    let checked = 0;
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.controls[key];

      if (control.value === true) {
        checked ++;
      }
    });
         const minRequired=1;
    if (checked < minRequired) {
      return {
        requireOneCheckboxToBeChecked: true,
      };
    }

    return null;
  };
}
