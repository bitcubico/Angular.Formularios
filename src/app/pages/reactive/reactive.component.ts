import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaisesService } from 'src/app/services/paises.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html'
})
export class ReactiveComponent implements OnInit {
  paises: Pais[];
  form: FormGroup;

  constructor(private _paisesService: PaisesService, private fb: FormBuilder) { 
    this.buildForm();
  }

  ngOnInit(): void {
    this._paisesService.getSpanishCountries()
      .subscribe((data:any) => {
        this.paises = data;
        console.log(this.paises);

        // Agrego al inicio de la lista la opción para que seleccione un país
        this.paises.unshift({
          name: 'Seleccione un país...',
          code: ''
        })
      }, (service_error) => {
        console.error(service_error.error.message);
      });
  }

  buildForm() {
    this.form = this.fb.group({
      name: ['', [ Validators.required, Validators.minLength(3)] ],
      lastName: ['',[ Validators.required, Validators.minLength(3)] ],
      email: ['', [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')] ],
      sex: ['', Validators.required],
      countryOfBirth: ['', Validators.required],
      direction: this.fb.group({
        address: ['', [Validators.required, Validators.minLength(3)]],
        city: ['', [Validators.required, Validators.minLength(3)]]
      })
    })
  }

  guardar(){
    console.log(this.form);
    if(this.form.invalid) {
      Object.values(this.form.controls).forEach(control => {
        control.markAllAsTouched();
      })
    }
  }

  formValidation(controlName: string) {
    return this.form.get(controlName).invalid && this.form.get(controlName).touched;
  }

}

interface Pais {
  name: string,
  code: string
}
