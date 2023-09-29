import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  login(tdoc: string, id: number, password: string): Observable<any> {
    const userData = { tdoc, id, password };
    return this.http.post(`${this.baseUrl}/login`, userData);
  }
  
  obtenerTiposDocumento(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/tipoDocumento`);
  }

  obtenerRoles() {
    return this.http.get<any[]>(`${this.baseUrl}/roles`);
  }

  registrarUsuario(nuevoUsuario: any): Observable<any> {
    const url = `${this.baseUrl}/usuarios`; 
    return this.http.post(url, nuevoUsuario);
  }

  // Consultar un usuario por su tdoc_user e id_user
  consultarUsuario(tdoc_user: string, id_user: number): Observable<any> {
    const url = `${this.baseUrl}/usuarios/${tdoc_user}/${id_user}`;
    return this.http.get(url);
  }

  // Consultar todos los usuarios
  obtenerUsuarios(): Observable<any[]> {
    const url = `${this.baseUrl}/usuarios`;
    return this.http.get<any[]>(url);
  }

  obtenerRolPorId(id_rol: number) {
    return this.http.get(`${this.baseUrl}/roles/${id_rol}`);
  }

  actualizarUsuario(tdoc_user: string, id_user: number, usuarioActualizado: any) {
    return this.http.put(`${this.baseUrl}/usuarios/${tdoc_user}/${id_user}`, usuarioActualizado);
  }

  eliminarUsuario(tdoc_user: string, id_user: number): Observable<any> {
    const url = `${this.baseUrl}/usuarios/${tdoc_user}/${id_user}`;
    return this.http.delete(url);
  }
  


}





