import { Component } from '@angular/core';
import { Empleado } from 'src/app/models/empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-registrar-empleado',
  templateUrl: './registrar-empleado.component.html',
  styleUrls: ['./registrar-empleado.component.css']
})
export class RegistrarEmpleadoComponent {
  empleado: Empleado = {
    tdoc_empleado: '',
    id_empleado: 0,
    nombre_1: '',
    nombre_2: '',
    apellido_1: '',
    apellido_2: '',
    direccion: '',
    rol: 1,
    estado: true,
    pass_empleado: '',
    salario: 0
  }

  constructor(private empleadoService: EmpleadoService) {}

  ngOnInit(): void {}

  nuevoRegistro() {
      this.empleadoService.guardarEmpleado(this.empleado)
      .subscribe(
        res =>{
          console.log(res);
          
        },
        err => console.error(err)
        )
  }

}
