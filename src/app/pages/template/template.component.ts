import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisesService } from '../../services/paises.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html'
})
export class TemplateComponent implements OnInit {

  user: Usuario = {
    name: '',
    lastName: '',
    email: ''
  };

  constructor(private _paisesService: PaisesService) { }

  ngOnInit(): void {
    this._paisesService.getSpanishCountries()
      .subscribe((data:any) => {
        console.log(data);
      }, (service_error) => {
        console.error(service_error.error.message);
      });
  }

  guardar(data: NgForm){
    console.log(data);
    console.log(data.value);
  }
}

interface Usuario {
  name: string,
  lastName: string,
  email: string
}
