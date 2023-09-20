import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  tdoc: string = '';
  id: number | null = null;
  password: string = '';
  errorMessage: string = '';

  constructor(private loginService: LoginService, private router: Router) {}

  login() {
    this.loginService.login(this.tdoc, this.id!, this.password).subscribe(
      (response) => {
        // Manejar la respuesta del servidor aquí
        console.log('Inicio de sesión exitoso', response);
        // Redireccionar a la página de inicio
        this.router.navigate(['/menu']);
      },
      (error) => {
        // Manejar los errores aquí
        console.error('Error al iniciar sesión', error);
        this.errorMessage = 'Credenciales incorrectas. Por favor, verifica tus datos.';
      }
    );
  }
  
}
