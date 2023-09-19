import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { Administrador } from '../models/administrador'

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

  API_URI = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  getAdministradores(){
    return this.http.get(`${this.API_URI}/administrador`);
  }

  getAdministrador(id: string){
    return this.http.get(`${this.API_URI}/administrador/${id}`);
  }

  eliminarAdministrador(tip_doc: string, id: number){
    return this.http.delete(`${this.API_URI}/administrador/${tip_doc}/${id}`);
  }

  guardarAdministrador(administrador: Administrador){
    return this.http.post(`${this.API_URI}/administrador`, administrador);
  }

  actualizarAdministrador(id: string, empleadoActualizado: Administrador){
    return this.http.put(`${this.API_URI}/administrador/${id}`, empleadoActualizado)
  }
}
