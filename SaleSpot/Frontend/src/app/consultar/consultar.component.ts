import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.css']
})
export class ConsultarComponent implements OnInit {
  usuarios: any[] = [];

  constructor(private backendService: BackendService) {}

  ngOnInit(): void {
    // Obtener la lista de usuarios
    this.backendService.obtenerUsuarios().subscribe(
      (response: any[]) => {
        this.usuarios = response;
        // Para cada usuario, obtener la descripción del rol
        this.usuarios.forEach(usuario => {
          this.backendService.obtenerRolPorId(usuario.rol).subscribe(
            (rolResponse: any) => {
              // Asignar la descripción del rol al usuario
              usuario.desc_rol = rolResponse.desc_rol;
            },
            error => {
              console.error('Error al obtener la descripción del rol', error);
            }
          );
        });
      },
      error => {
        console.error('Error al obtener la lista de usuarios', error);
      }
    );
  }
}



