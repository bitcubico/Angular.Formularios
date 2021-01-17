import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  user: Usuario = {
    name: '',
    lastName: '',
    email: ''
  };

  constructor() { }

  ngOnInit(): void {
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
