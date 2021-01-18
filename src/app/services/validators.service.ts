import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor() { }

  userValidator(control: FormControl): ErrorValidate {
    if(control.value?.toLowerCase() === 'mcubico')
      return { userExist: true }

    return null;
  }

  userValidatorAsync(control: FormControl): Promise<ErrorValidate> | Observable<ErrorValidate> {
    console.log('Validacion de usuario');
    if(!control.value)
      return Promise.resolve(null);

    console.log('Inicia la validación asyncrona');
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if(control.value?.toLowerCase() === 'mcubico')
          resolve({ userExist: true });
    
        resolve(null);
      }, 3500);
    });
  }

  confirmPassword(passName: string, confirmPassName: string) {
    return (control: AbstractControl): ValidationErrors | null => {
      const passControl = control.get(passName);
      const confirmControl = control.get(confirmPassName);

      if( passControl?.value != confirmControl?.value)  {
        control.get(confirmPassName)?.setErrors({ confirmPasswordInvalid: true });
        return { confirmPasswordInvalid: true };
      }
      
      return null;
    }
  }
}

interface ErrorValidate {
  [s:string]: boolean
}
