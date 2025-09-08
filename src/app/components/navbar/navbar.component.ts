import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Input() menuItems: { text: string; icon: string; route: string }[] = [];
  @Output() logoff = new EventEmitter<void>();
  usuarioLogado: { id: number, nome: string } | null = null;

  constructor(private authService: AuthService){}

  ngOnInit():void{
     this.usuarioLogado = this.authService.getDadosUsuario();
  }

  logout() {
    this.logoff.emit();
  }
}
