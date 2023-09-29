import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  nuevoUsuario: any = {
    tdoc_user: '',
    id_user: null,
    nombre_1: '',
    nombre_2: '',
    apellido_1: '',
    apellido_2: '',
    direccion: '',
    rol: '',
    estado: null
  };
  tiposDocumento: any[] = [];
  roles: any[] = [];
  mensajeExito: string = '';
  mensajeError: string = '';
  passwordGenerado: string = ''; // Agregamos una propiedad para almacenar el password generado

  constructor(private backendService: BackendService) {}

  ngOnInit(): void {
    // Obtener tipos de documento y roles al inicializar el componente
    this.obtenerTiposDocumento();
    this.obtenerRoles();
  }

  obtenerTiposDocumento() {
    this.backendService.obtenerTiposDocumento().subscribe(
      (response: any[]) => {
        this.tiposDocumento = response;
      },
      (error) => {
        console.error('Error al obtener tipos de documento', error);
      }
    );
  }

  obtenerRoles() {
    this.backendService.obtenerRoles().subscribe(
      (response: any[]) => {
        this.roles = response;
      },
      (error) => {
        console.error('Error al obtener roles', error);
      }
    );
  }

  registrarUsuario() {
    this.backendService.registrarUsuario(this.nuevoUsuario).subscribe(
      (response) => {
        // Si el registro es exitoso, mostramos el password generado
        this.mensajeExito = 'Usuario registrado con éxito';
        this.passwordGenerado = response.password; // Asignamos el password generado
      },
      (error) => {
        this.mensajeError = 'Error al registrar usuario';
      }
    );
  }

  formularioValido(): boolean {
    return (
      this.nuevoUsuario.tdoc_user !== '' &&
      this.nuevoUsuario.id_user !== null &&
      this.nuevoUsuario.nombre_1 !== '' &&
      this.nuevoUsuario.apellido_1 !== '' &&
      this.nuevoUsuario.direccion !== '' &&
      this.nuevoUsuario.rol !== '' &&
      typeof this.nuevoUsuario.estado === 'boolean'
    );
  }
}



