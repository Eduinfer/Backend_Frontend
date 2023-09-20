import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Administrador } from 'src/app/models/administrador';
import { AdministradorService} from 'src/app/services/administrador.service';


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
    rol: 0,
    pass_admin: ''
  }

  edit: boolean = false

  constructor(private administradorService: AdministradorService, private router: Router, private activateRoute: ActivatedRoute) {}

  ngOnInit(): void {
    const params = this.activateRoute.snapshot.params
    if (params['id'], params['tdoc']) {
      this.administradorService.getAdministrador(params['tdoc'], params['id'])
      .subscribe(
        res => {
          console.log(res);
          this.admin = res as Administrador;
          this.edit = true
        },
        err => {
          console.log(err);
        }
      )
    }
  }

  actualizarAdmin(){
    this.administradorService.actualizarAdministrador(this.admin.tdoc_admin,this.admin.id_admin, this.admin)
    .subscribe(
      res =>{
        console.log(res); 
      },
      err => console.log(err)
    )
    console.log(this.admin); 
  }

  nuevoRegistro() {
      this.administradorService.guardarAdministrador(this.admin)
      .subscribe(
        res =>{
          console.log(res);
          this.router.navigate(['/listar-admin']);
          
        },
        err => console.error(err)
        )
  }

}
