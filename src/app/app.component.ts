import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'vetHypnos';
  menuItems = [
    { text: 'Pacientes', icon: 'fa-solid fa-address-card', route: '/pacientes' },
    { text: 'Medicamentos', icon: 'fa-solid fa-briefcase-medical', route: '/medicamentos' },
    { text: 'Prontuários', icon: 'fa-solid fa-book-open', route: '/medicamentos' },
    { text: 'Relatórios', icon: 'fa-solid fa-clipboard-list', route: '/medicamentos' },
    { text: 'Tutores', icon: 'fa-solid fa-user-group', route: '/medicamentos' },

  ];
}
