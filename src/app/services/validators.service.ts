import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor() { }

  userValidator(control: FormControl): {[s:string]: boolean} {
    if(control.value?.toLowerCase() === 'mcubico')
      return { userExist: true }

    return null;
  }

  confirmPassword(passName: string, confirmPassName: string) {
    return (fg: FormGroup) => {
      const passControl = fg.controls[passName];
      const confirmControl = fg.controls[confirmPassName];

      if( passControl.value === confirmControl.value) 
        confirmControl.setErrors(null);
      else 
        confirmControl.setErrors({ confirmPasswordInvalid: true })
    }
  }
}
