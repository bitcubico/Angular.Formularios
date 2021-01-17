import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisesService } from '../../services/paises.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html'
})
export class TemplateComponent implements OnInit {

  paises: Pais[];
  user: Usuario = {
    name: '',
    lastName: '',
    email: '',
    sex: 'M',
    countryOfBirth: ''
  };

  constructor(private _paisesService: PaisesService) { }

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

  guardar(data: NgForm){
    console.log(data);

    if(data.invalid) {
      Object.values(data.controls).forEach(control => {
        control.markAllAsTouched();
      })
    }

    console.log(data.value);
  }
}

interface Usuario {
  name: string,
  lastName: string,
  email: string,
  sex?: string,
  countryOfBirth?: string
}

interface Pais {
  name: string,
  code: string
}
