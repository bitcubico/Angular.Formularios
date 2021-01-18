import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      }),
      hobby: [''],
      hobbies: this.fb.array([])
    });
  }

  guardar(){
    console.log('SUBMIT');
    console.log(this.form);
    if(this.form.invalid) {
      Object.values(this.form.controls).forEach(control => {
        control.markAllAsTouched();
      });
    }

    this.form.reset();
  }

  get hobbies() {
    return this.form.get('hobbies') as FormArray;
  }

  agregarHobby() {
    console.log('Agregando hobby');
    console.log(this.form.get('hobby'));
    let value: string = this.form.get('hobby').value;
    if(value == null || value.length === 0)
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
      name: 'Mauricio',
      lastName: 'Montoya Medrano',
      email: 'mauricio.montoya@bitcubico.com',
      sex: 'M',
      countryOfBirth: 'COL',
      direction: {
        address: 'Calle 42 #63B-34 apt. 201, Barrio Conquistadores',
        city: 'Medellín'
      }
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
