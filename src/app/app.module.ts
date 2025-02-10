import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppPrincipal } from './components/principal/app.principal';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { PacientesComponent } from './components/pacientes/pacientes.component';
import { MedicamentosComponent } from './components/medicamentos/medicamentos.component';

@NgModule({
  declarations: [
    AppComponent, AppPrincipal, PacientesComponent, MedicamentosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavbarComponent,
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
