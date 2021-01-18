import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

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
}
