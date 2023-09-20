import { Component, OnInit, } from '@angular/core';
import { Router } from '@angular/router';


import { AdministradorService } from 'src/app/services/administrador.service';
import { AdministradorConVisibilidad } from 'src/app/models/administrador';

@Component({
  selector: 'app-listar',
  templateUrl: './listar-admin.component.html',
  styleUrls: ['./listar-admin.component.css']
})
export class ListarAdminComponent implements OnInit {

  administradores: AdministradorConVisibilidad[] = [];

  constructor(private administradorService: AdministradorService, private router: Router) {}

  ngOnInit(): void {
   this.getAdministrador();
  }

  getAdministrador(){
    this.administradorService.getAdministradores().subscribe(
      administradores => {
        this.administradores.push(...Object.values(administradores)); 
      },
      err => console.log(err)
    ); 
  }

  toggleTabla(administrador: AdministradorConVisibilidad): void {
    administrador.mostrarTabla = !administrador.mostrarTabla;
  }

  eliminarAdmin(tdoc: string | undefined, id: number | undefined){
    this.administradorService.eliminarAdministrador(tdoc, id).subscribe(
        res => {
            console.log(res);
            this.getAdministrador()
        },
        err => {
            console.log(err);
        }
    );
  }
}

