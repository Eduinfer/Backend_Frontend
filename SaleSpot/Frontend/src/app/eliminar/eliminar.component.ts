import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-eliminar',
  templateUrl: './eliminar.component.html',
  styleUrls: ['./eliminar.component.css']
})
export class EliminarComponent implements OnInit {
  tdoc_user: string = '';
  id_user: number = 0;
  mensajeExito: string = '';
  mensajeError: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private backendService: BackendService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.tdoc_user = params['tdoc_user'];
      this.id_user = +params['id_user'];
    });
  }

  eliminarUsuario() {
    // Llama al método eliminarUsuario del servicio para enviar la solicitud de eliminación
    this.backendService.eliminarUsuario(this.tdoc_user, this.id_user).subscribe(
      response => {
        // Maneja la respuesta del backend, por ejemplo, redirige a la página de consulta de perfiles
        this.router.navigate(['/consultar']);
      },
      error => {
        console.error('Error al eliminar el usuario', error);
      }
    );
  }
}
