import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/models/personas';

import { PersonaService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {

  empleado: Persona = {
    tdoc: '',
    id: 0,
    nombre_1: '',
    nombre_2: '',
    apellido_1: '',
    apellido_2: '',
    direccion: '',
    rol: 0,
    estado: 0,
    salario: 0,
    pass: ''
  }

  constructor(private personaService: PersonaService){

  }

  ngOnInit(): void {
  }

  nuevoRegistro() {
    console.log(this.empleado);
    
  }

}
