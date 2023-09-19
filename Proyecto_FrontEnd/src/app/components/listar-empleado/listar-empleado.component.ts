import { Component, OnInit } from '@angular/core';

import { EmpleadoService } from 'src/app/services/empleado.service';
import { EmpleadoConVisibilidad } from 'src/app/models/empleado';

@Component({
  selector: 'app-listar-empleado',
  templateUrl: './listar-empleado.component.html',
  styleUrls: ['./listar-empleado.component.css']
})
export class ListarEmpleadoComponent implements OnInit {
  empleados: EmpleadoConVisibilidad[] = [];
  busqueda: string = '';

  constructor(private empleadoService: EmpleadoService) {}

  ngOnInit(): void {
    this.empleadoService.getEmpleados().subscribe(
      empleados => {
        this.empleados.push(...Object.values(empleados)); 
      },
      err => console.log(err)
    );    
  }

  toggleTabla(empleado: EmpleadoConVisibilidad): void {
    empleado.mostrarTabla = !empleado.mostrarTabla;
  }

  eliminarEmpleado(tdoc: string, id: number){
    this.empleadoService.eliminarEmpleado(tdoc, id).subscribe(
        res => {
            console.log(res);
        },
        err => {
            console.log(err);
        }
    );
}
}
