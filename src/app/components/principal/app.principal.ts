import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import { DashboardCard } from './dashboardCards/dashboardCard';

@Component({
  selector: 'app-principal',
  templateUrl: './app.principal.html',
  styleUrls: ['./app.principal.scss'],
  imports: [DashboardCard],
  standalone: true
})
export class AppPrincipal {
  cardItems = [
    { icone: 'fa-solid fa-address-card', numero: '30', texto:'Pacientes', rota: '/pacientes', cor: 'hypnosColor--azul' },
    { icone: 'fa-solid fa-suitcase-medical', numero: '20', texto:'Medicamentos', rota: '/medicamentos', cor: 'hypnosColor--verde1' },
    { icone: 'fa-solid fa-address-card', numero: '7', texto:'Prontuários', rota: '/pacientes', cor: 'hypnosColor--cinza' },
    { icone: 'fa-solid fa-address-card', numero: '10', texto:'Relatórios', rota: '/pacientes', cor: 'hypnosColor--bg-amarelo' },
  ];
}
