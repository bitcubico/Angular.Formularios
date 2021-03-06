import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaisesService } from 'src/app/services/paises.service';
import { ValidatorsService } from '../../services/validators.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html'
})
export class ReactiveComponent implements OnInit {
  paises: Pais[];
  form: FormGroup;

  constructor(private _paisesService: PaisesService, private fb: FormBuilder, private _validator: ValidatorsService) { 
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
    this.form = this.fb.group(
      {
        name: this.fb.control('', [ Validators.required, Validators.minLength(3)])
        , lastName: this.fb.control('',  [Validators.required, Validators.minLength(3)] )
        , email: this.fb.control('', [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')] )
        , sex: this.fb.control('', Validators.required)
        , countryOfBirth: this.fb.control('', Validators.required)
        , direction: this.fb.group({
          address: this.fb.control('', [Validators.required, Validators.minLength(3)])
          , city: this.fb.control('', [Validators.required, Validators.minLength(3)])
        })
        , username: this.fb.control('', [ Validators.required, Validators.minLength(3), this._validator.userValidator] )
        , usernameAsincrono: this.fb.control('', [ Validators.required, Validators.minLength(3) ] , this._validator.userValidatorAsync )
        , password: this.fb.control('', [ Validators.required, Validators.minLength(3)] )
        , passwordConfirm: this.fb.control('',  [Validators.required] )
        , hobby: this.fb.control('')
        , hobbies: this.fb.array([])
      } 
      , { validators: this._validator.confirmPassword('password', 'passwordConfirm') }
    );
  }

  guardar(){
    console.log('SUBMIT');
    console.log(this.form);
    if(this.form.invalid) {
      Object.values(this.form.controls).forEach(control => {
        control.markAllAsTouched();
      });
    }
    else
      this.form.reset();
  }

  get hobbies() {
    return this.form.get('hobbies') as FormArray;
  }

  agregarHobby() {
    console.log('Agregando hobby');
    console.log(this.form.get('hobby'));
    let value: string = this.form.get('hobby').value;
    if(value?.length === 0)
      return;
    
    this.hobbies.push(this.fb.control([value]));
    // Limpio el campo de texto donde se agrega el hobby
    this.form.get('hobby').reset();
  }

  borrarHobby(i: number) {
    this.hobbies.removeAt(i);
  }

  fillForm() {
    console.log('Cargando...');
    
    // Nota IMPORTANTE: Si se desea llenar el formulario completo, usar this.form.setValue, de lo contrario reset
    this.form.reset({
      name: 'Mauricio'
      , lastName: 'Montoya Medrano'
      , email: 'mauricio.montoya@bitcubico.com'
      , sex: 'M'
      , countryOfBirth: 'COL'
      , direction: {
        address: 'Calle 42 #63B-34 apt. 201, Barrio Conquistadores'
        , city: 'Medellín'
      }
      , username: 'mcubico'
      , usernameAsincrono: 'mcubico'
    });

    this.hobbies.clear();
    const hobbiesAux = [['Fútbol'], ['Leer'], ['Caminar'], ['Viajar'], ['Meditar'], ['Juegos de mesa']];
    hobbiesAux.forEach(value => this.hobbies.push(this.fb.control(value)));
  }

  formValidation(controlName: string) {
    return this.form.get(controlName).invalid && this.form.get(controlName).touched;
  }

  notSubmit() {
    return false;
  }

}

interface Pais {
  name: string,
  code: string
}
