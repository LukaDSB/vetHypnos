import { Component } from '@angular/core';
import { DashboardCard } from './dashboardCards/dashboardCard';
import { ProntuarioParcialComponent } from "../prontuarios/prontuario-parcial/prontuario-parcial.component";
import { DetalhesAnimalComponent } from "../animais/detalhes-animal/detalhes-animal.component";
import { AutenticacaoModalComponent } from "../modal/autenticacao-modal.component";

@Component({
  selector: 'app-principal',
  templateUrl: './app.principal.html',
  styleUrls: ['./app.principal.scss'],
  imports: [DashboardCard, ProntuarioParcialComponent, DetalhesAnimalComponent, AutenticacaoModalComponent],
  standalone: true
})
export class AppPrincipal {
  cardItems = [
    { icone: 'fa-solid fa-address-card', numero: '30', texto:'animal', rota: '/animal', cor: 'hdk-bg-azul' },
    { icone: 'fa-solid fa-suitcase-medical', numero: '20', texto:'Medicamentos', rota: '/medicamentos', cor: 'hdk-bg-verde' },
    { icone: 'fa-solid fa-book-open', numero: '7', texto:'Prontuários', rota: '/prontuarios', cor: 'hdk-bg-preto' },
    { icone: 'fa-solid fa-chart-column', numero: '10', texto:'Relatórios', rota: '/relatorios', cor: 'hdk-bg-amarelo' },
    { icone: 'fa-solid fa-user-group', numero: '10', texto:'Tutores', rota: '/tutores', cor: 'hdk-bg-azul' }
  ];
}
