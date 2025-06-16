import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

})

export class AppComponent {
  title = 'vetHypnos';
  isLoginModalOpen = true;

  menuItems = [
    { text: 'Animais', icon: 'fa-solid fa-address-card', route: '/animais' },
    { text: 'Medicamentos', icon: 'fa-solid fa-briefcase-medical', route: '/medicamentos' },
    { text: 'Prontuários', icon: 'fa-solid fa-book-open', route: '/prontuarios' },
    { text: 'Relatórios', icon: 'fa-solid fa-chart-column', route: '/relatorios' },
    { text: 'Tutores', icon: 'fa-solid fa-user-group', route: '/tutores' },
  ];
}
