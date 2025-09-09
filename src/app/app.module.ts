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
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HdkDivisor } from './components/hdk/divisor/hdk-divisor.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { MedicamentosComponent } from './components/medicamentos/medicamentos.component';
import { ProntuariosComponent } from './components/prontuarios/prontuarios.component';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { ExpansionPanelComponent } from './components/hdk/expansion-panel/expansion-panel.component';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import { AnimaisComponent } from './components/animais/animais.component';
import { ProntuarioProvisorioComponent } from './components/prontuario-provisorio/prontuario-provisorio.component';
import { SelecionarMedicamentosComponent } from './components/prontuarios/selecionar-medicamentos/selecionar-medicamentos.component';
import { ModalErroComponent } from './components/hdk/modal-erro/modal-erro.component';
import { CustomCheckboxComponent } from './components/hdk/custom-checkbox/custom-checkbox.component';
import { HdkModalFeedbackComponent } from './components/hdk/hdk-modal-feedback/hdk-modal-feedback.component';
import { authInterceptor } from './services/auth/auth.interceptor';
import { ProntuarioFinalizadoComponent } from './components/prontuarios/prontuario-finalizado/prontuario-finalizado.component';
import { AcoesModalComponent } from './components/hdk/acoes-modal/acoes-modal.component';

@NgModule({
  declarations: [
    AppComponent, 
    RelatoriosComponent, 
    TutoresComponent, 
    ProntuarioProvisorioComponent, 
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
    AnimaisComponent,
    SelecionarMedicamentosComponent,
    ModalErroComponent,
    CustomCheckboxComponent,
    HdkModalFeedbackComponent,
    ProntuarioFinalizadoComponent,
    AcoesModalComponent
],
  providers: [provideNgxMask(), provideHttpClient(withInterceptors([authInterceptor]))],
  bootstrap: [AppComponent]
})
export class AppModule { }
