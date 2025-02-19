import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'dashboardCard',
  templateUrl: './dashboardCard.html',
  styleUrls: ['./dashboardCard.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink]
})
export class DashboardCard {
  @Input() cardItems: { icone: string; numero: string ; texto: string; rota: string, cor: string }[] = [];
}
