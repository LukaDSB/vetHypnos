import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { PacientesComponent } from './components/pacientes/pacientes.component';
import { MedicamentosComponent } from './components/medicamentos/medicamentos.component';
import { FormsModule } from '@angular/forms';
import { AutenticacaoModalComponent } from "./components/modal/autenticacao-modal.component";
import { AppComponent } from './app.component';
import { HdkButtonComponent } from './components/hdk/button/hdk-button.component';
import { HdkDivisor } from './components/hdk/divisor/hdk-divisor.component';
import { TabelaComponent } from './components/hdk/tabela/hdk-tabela.component';

@NgModule({
  declarations: [
    AppComponent,MedicamentosComponent, HdkButtonComponent, HdkDivisor
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavbarComponent,
    FormsModule,
    AutenticacaoModalComponent,
    PacientesComponent,
    TabelaComponent
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
