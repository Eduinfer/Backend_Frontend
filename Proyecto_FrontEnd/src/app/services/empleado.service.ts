import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Empleado } from '../models/empleado'; 

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  API_URI = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  getEmpleados(){
    return this.http.get(`${this.API_URI}/empleado`);
  }

  getEmpleado(id: string){
    return this.http.get(`${this.API_URI}/empleado/${id}`);
  }

  eliminarEmpleado(tdoc: string, id: number){
    return this.http.delete(`${this.API_URI}/empleado/${tdoc}/${id}`);
  }

  guardarEmpleado(empleado: Empleado){
    return this.http.post(`${this.API_URI}/empleado`, empleado);
  }

  actualizarEmpleado(id: string, empleadoActualizado: Empleado){
    return this.http.put(`${this.API_URI}/empelado/${id}`, empleadoActualizado)
  }
}
