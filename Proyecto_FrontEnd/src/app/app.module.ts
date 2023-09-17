import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrarComponent } from './components/registrar/registrar.component';
import { ListarComponent } from './components/listar/listar.component';
import { NavComponent } from './components/nav/nav.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { MenuComponent } from './components/menu/menu.component';

import { PersonaService } from './services/persona.service';

@NgModule({
  declarations: [
    AppComponent,
    RegistrarComponent,
    ListarComponent,
    NavComponent,
    InicioComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, 
    FormsModule
  ],
  providers: [
    PersonaService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
