import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { FormsModule } from '@angular/forms';
import { AutenticacaoModalComponent } from "./components/modal/autenticacao-modal.component";
import { AppComponent } from './app.component';
import { HdkButtonComponent } from './components/hdk/button/hdk-button.component';
import { TabelaComponent } from './components/hdk/tabela/hdk-tabela.component';
import { HdkModalComponent } from './components/hdk/modal/hdk-modal.component';
import { TutoresComponent } from './components/tutores/tutores.component';
import { RelatoriosComponent } from './components/relatorios/relatorios.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpClientModule } from '@angular/common/http';
import { HdkDivisor } from './components/hdk/divisor/hdk-divisor.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { MedicamentosComponent } from './components/medicamentos/medicamentos.component';
import { PacientesComponent } from './components/pacientes/pacientes.component';
import { ProntuariosComponent } from './components/prontuarios/prontuarios.component';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { ExpansionPanelComponent } from './components/hdk/expansion-panel/expansion-panel.component';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import { PageTesteComponent } from './components/page-teste/page-teste.component';

@NgModule({
  declarations: [
    AppComponent, 
    RelatoriosComponent, TutoresComponent, PageTesteComponent, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavbarComponent,
    FormsModule,
    AutenticacaoModalComponent,
    MatTableModule,
    MatPaginatorModule,
    MedicamentosComponent, 
    PacientesComponent, 
    ProntuariosComponent, 
    TabelaComponent,
    HttpClientModule,
    HdkModalComponent,
    HdkButtonComponent,
    HdkDivisor,
    UsuariosComponent,
    NgxMaskDirective,
    ExpansionPanelComponent,
    CdkAccordionModule,
],
  providers: [provideNgxMask()],
  bootstrap: [AppComponent]
})
export class AppModule { }
