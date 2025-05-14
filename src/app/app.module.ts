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
import { HdkModalComponent } from './components/hdk/modal/hdk-modal.component';
import { TutoresComponent } from './components/tutores/tutores.component';
import { RelatoriosComponent } from './components/relatorios/relatorios.component';
import { ProntuariosComponent } from './components/prontuarios/prontuarios.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpClientModule } from '@angular/common/http';
import { ModalPacientesComponent } from './components/pacientes/modal-pacientes/modal-pacientes.component';


@NgModule({
  declarations: [
    AppComponent, MedicamentosComponent, ProntuariosComponent, RelatoriosComponent, TutoresComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavbarComponent,
    FormsModule,
    AutenticacaoModalComponent,
    MatTableModule,
    MatPaginatorModule,
    TabelaComponent,
    HttpClientModule,
    HdkModalComponent,
    HdkButtonComponent,
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
