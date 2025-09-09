import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

})

export class AppComponent {
  title = 'vetHypnos';
  isLoginModalOpen = true;
  isLoggedIn$: Observable<boolean>;

  constructor(private authService: AuthService, private router: Router) {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/principal']);
  }

  menuItems = [
    { text: 'Animais', icon: 'fa-solid fa-address-card', route: '/animais' },
    { text: 'Medicamentos', icon: 'fa-solid fa-briefcase-medical', route: '/medicamentos' },
    { text: 'Prontuários', icon: 'fa-solid fa-book-open', route: '/prontuarios' },
    { text: 'Relatórios', icon: 'fa-solid fa-chart-column', route: '/relatorios' },
    { text: 'Tutores', icon: 'fa-solid fa-user-group', route: '/tutores' },
  ];
}
