import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { LogoutComponent } from './logout/logout.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { RegistroComponent } from './registro/registro.component';
import { ConsultarComponent } from './consultar/consultar.component';
import { EditarComponent } from './editar/editar.component';
import { EliminarComponent } from './eliminar/eliminar.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'logout', component: LogoutComponent },
  { path: 'home', component: HomeComponent },
  { path: 'menu', component:MenuComponent},
  { path: 'usuarios', component:UsuariosComponent},
  { path: 'registrar', component:RegistroComponent},
  { path: 'consultar', component:ConsultarComponent},
  { path: 'editar/:tdoc_user/:id_user', component:EditarComponent},
  { path: 'eliminar/:tdoc_user/:id_user', component: EliminarComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' } // Ruta predeterminada
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
