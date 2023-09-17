import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { MenuComponent } from './components/menu/menu.component';
import { ListarComponent } from './components/listar/listar.component';
import { RegistrarComponent } from './components/registrar/registrar.component';

const routes: Routes = [
  {path: "", redirectTo: "inicio", pathMatch: "full"},
  {path: "inicio", component: InicioComponent},
  {path: "menu", component: MenuComponent},
  {path: "listar", component: ListarComponent},
  {path: "registrar", component: RegistrarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
