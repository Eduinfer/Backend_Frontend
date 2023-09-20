import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { MenuComponent } from './components/menu/menu.component';
import { ListarAdminComponent } from './components/listar-admin/listar-admin.component'; 
import { ListarEmpleadoComponent } from './components/listar-empleado/listar-empleado.component';
import { RegistrarAdminComponent } from './components/registrar-admin/registrar-admin.component'; 
import { RegistrarEmpleadoComponent } from './components/registrar-empleado/registrar-empleado.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { AdministrarComponent } from './components/administrar/administrar.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {path: "", redirectTo: "inicio", pathMatch: "full"},
  {path: "inicio", component: InicioComponent},
  {path: "menu", component: MenuComponent},
  {path: "listar-admin", component: ListarAdminComponent},
  {path: "registrar-admin", component: RegistrarAdminComponent},
  {path: "listar-empleado", component: ListarEmpleadoComponent},
  {path: "registrar-empleado", component: RegistrarEmpleadoComponent},
  {path: "perfil", component: PerfilComponent},
  {path: "administrar", component: AdministrarComponent},
  {path: "login", component: LoginComponent},
  {path: "editar/admin/:tdoc/:id", component: RegistrarAdminComponent},
  {path: "editar/empleado/:id", component: RegistrarEmpleadoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
