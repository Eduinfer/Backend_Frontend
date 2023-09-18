import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/models/personas';
import { PersonaService } from 'src/app/services/persona.service';
import { PersonaConVisibilidad } from 'src/app/models/personas';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {
  
  personas: PersonaConVisibilidad[] = [];
  persona: any;

  constructor(private personaService: PersonaService) {}

  ngOnInit(): void {
    this.personaService.getEmpleados().subscribe(
      empleados => {
        this.personas.push(...Object.values(empleados)); 
      },
      err => console.log(err)
    );
    
    this.personaService.getAdministradores().subscribe(
      administradores => {
        this.personas.push(...Object.values(administradores)); 
      },
      err => console.log(err)
    );    
  }

  toggleTabla(persona: PersonaConVisibilidad): void {
    persona.mostrarTabla = !persona.mostrarTabla;
}

}
