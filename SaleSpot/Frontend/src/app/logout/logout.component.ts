import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  template: '<p>Cerrando sesión...</p>',
})
export class LogoutComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    // Elimina el token JWT del LocalStorage
    localStorage.removeItem('token');

    // Redirige al usuario a la página de inicio de sesión (login)
    this.router.navigate(['login']);

    // Evita que el usuario retroceda al historial del navegador
    window.history.pushState(null, '', '/login');
    
  }
}

