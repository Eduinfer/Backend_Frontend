import { Component, OnInit, } from '@angular/core';


import { AdministradorService } from 'src/app/services/administrador.service';
import { AdministradorConVisibilidad } from 'src/app/models/administrador';

@Component({
  selector: 'app-listar',
  templateUrl: './listar-admin.component.html',
  styleUrls: ['./listar-admin.component.css']
})
export class ListarAdminComponent implements OnInit {

  administradores: AdministradorConVisibilidad[] = [];

  constructor(private administradorService: AdministradorService,) {}

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

  eliminarAdmin(tdoc: string, id: number){
    this.administradorService.eliminarAdministrador(tdoc, id).subscribe(
        res => {
            console.log(res);
        },
        err => {
            console.log(err);
        }
    );
}
}

