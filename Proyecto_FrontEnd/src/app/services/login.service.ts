import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private URI = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  login(tdoc: string, id: number, password: string): Observable<any> {
    const userData = { tdoc, id, password };
    return this.http.post(`${this.URI}/login`, userData);
  }
}
