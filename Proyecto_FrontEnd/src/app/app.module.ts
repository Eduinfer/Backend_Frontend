import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrarAdminComponent } from './components/registrar-admin/registrar-admin.component';
import { RegistrarEmpleadoComponent } from './components/registrar-empleado/registrar-empleado.component';
import { ListarAdminComponent } from './components/listar-admin/listar-admin.component';
import { NavComponent } from './components/nav/nav.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { MenuComponent } from './components/menu/menu.component';

import { AdministradorService} from './services/administrador.service';
import { EmpleadoService } from './services/empleado.service';
import { PerfilComponent } from './components/perfil/perfil.component';
import { ListarEmpleadoComponent } from './components/listar-empleado/listar-empleado.component';
import { AdministrarComponent } from './components/administrar/administrar.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    InicioComponent,
    MenuComponent,
    PerfilComponent,
    RegistrarAdminComponent,
    ListarAdminComponent,
    RegistrarEmpleadoComponent,
    ListarEmpleadoComponent,
    AdministrarComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, 
    FormsModule
  ],
  providers: [
    AdministradorService,
    EmpleadoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
