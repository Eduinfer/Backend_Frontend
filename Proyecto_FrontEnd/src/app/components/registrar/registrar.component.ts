import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/models/personas';

import { PersonaService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {
  selectedDocumentType: string = '';

  persona: Persona = {
    tdoc_admin: '',
    tdoc_empleado: '',
    id_admin: 0,
    nombre_1: '',
    nombre_2: '',
    apellido_1: '',
    apellido_2: '',
    direccion: '',
    rol: 0,
    estado: 0,
    salario: 0,
    pass: '',
    id_empleado: 0 
  }

  constructor(private personaService: PersonaService){

  }

  ngOnInit(): void {
  }
  
  updateDocumentType() {
    if (this.persona.rol === 1) {
      this.persona.tdoc_empleado = this.selectedDocumentType;
    } else if (this.persona.rol === 2) {
      this.persona.tdoc_admin = this.selectedDocumentType;
    }
  }
  
  nuevoRegistro() {
    console.log(this.persona);
    
  }


  

}
