import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {
  tdoc_user: string = '';
  id_user: number = 0;
  usuario: any = {
    tdoc_user: '',
    id_user: null,
    nombre_1: '',
    nombre_2: '',
    apellido_1: '',
    apellido_2: '',
    direccion: '',
    rol: '',
    estado: true
  };
  mensajeExito: string = '';
  mensajeError: string = '';
  roles: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private backendService: BackendService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.tdoc_user = params['tdoc_user'];
      this.id_user = +params['id_user'];

      // Obtener la información del usuario para mostrar en el formulario
      this.backendService.consultarUsuario(this.tdoc_user, this.id_user).subscribe(
        (response: any) => {
          this.usuario = response;
        },
        error => {
          console.error('Error al obtener la información del usuario', error);
        }
      );

      // Obtener los roles y asignarlos a la propiedad roles
      this.backendService.obtenerRoles().subscribe(
        (response: any[]) => {
          this.roles = response;
        },
        error => {
          console.error('Error al obtener los roles', error);
        }
      );
    });
  }

  actualizarUsuario() {
    // Llama al método actualizarUsuario del servicio para enviar la información actualizada
    this.backendService.actualizarUsuario(this.tdoc_user, this.id_user, this.usuario).subscribe(
      response => {
        // Maneja la respuesta del backend
        this.mensajeExito = 'Usuario actualizado con éxito';
      },
      error => {
        console.error('Error al actualizar el usuario', error);
        this.mensajeError = 'Error al actualizar el usuario';
      }
    );
  }

  formularioCompleto(): boolean {
    return (
      this.usuario.nombre_1 !== '' &&
      this.usuario.apellido_1 !== '' &&
      this.usuario.direccion !== '' &&
      this.usuario.direccion !== '' && 
      this.usuario.rol !== '' &&
      typeof this.usuario.estado === 'boolean'
    );
  }
  
}




