import { Component, OnInit } from '@angular/core';
import { Administrador } from 'src/app/models/administrador';
import { AdministradorService} from 'src/app/services/administrador.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar-admin.component.html',
  styleUrls: ['./registrar-admin.component.css']
})
export class RegistrarAdminComponent implements OnInit {

  admin: Administrador = {
    tdoc_admin: '',
    id_admin: 0,
    nombre_1: '',
    nombre_2: '',
    apellido_1: '',
    apellido_2: '',
    direccion: '',
    rol: 2,
    estado: true,
    pass_admin: ''
  }

  constructor(private administradorService: AdministradorService) {}

  ngOnInit(): void {}

  nuevoRegistro() {
      this.administradorService.guardarAdministrador(this.admin)
      .subscribe(
        res =>{
          console.log(res);
          
        },
        err => console.error(err)
        )
  }

}
