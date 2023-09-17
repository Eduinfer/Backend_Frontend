import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { Persona } from '../models/personas'

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  API_URI = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  getAdministradores(){
    return this.http.get(`${this.API_URI}/administrador`);
  }

  getAdministrador(id: string){
    return this.http.get(`${this.API_URI}/administrador/${id}`);
  }

  eliminarAdministrador(id: string){
    return this.http.delete(`${this.API_URI}/adminmistrador/${id}`);
  }

  guardarAdministrador(empleado: Persona){
    return this.http.post(`${this.API_URI}/administrador`, empleado);
  }

  actualizarAdministrador(id: string, empleadoActualizado: Persona){
    return this.http.put(`${this.API_URI}/administrador/${id}`, empleadoActualizado)
  }
  getEmpleados(){
    return this.http.get(`${this.API_URI}/empleado`);
  }

  getEmpleado(id: string){
    return this.http.get(`${this.API_URI}/empleado/${id}`);
  }

  eliminarEmpleado(id: string){
    return this.http.delete(`${this.API_URI}/empleado/${id}`);
  }

  guardarEmpleado(empleado: Persona){
    return this.http.post(`${this.API_URI}/empleado`, empleado);
  }

  actualizarEmpleado(id: string, empleadoActualizado: Persona){
    return this.http.put(`${this.API_URI}/empelado/${id}`, empleadoActualizado)
  }
}
