import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-autenticacao-modal',
  templateUrl: './autenticacao-modal.component.html',
  styleUrls: ['./autenticacao-modal.component.scss'],
  standalone: true,
  imports:[FormsModule, CommonModule]
})

export class AutenticacaoModalComponent {
  isLoginModalOpen = true;
  isCadastroModalOpen = false;
  email = '';
  senha = '';
  nome = '';

  constructor(private authService: AuthService) {}

  login() {
    console.log('Tentativa de login com:', this.email, this.senha);
    this.isLoginModalOpen = false;
  }

  openCadastro() {
    this.isLoginModalOpen = false;
    this.isCadastroModalOpen = true;
  }

  closeCadastro() {
    this.isCadastroModalOpen = false;
    this.isLoginModalOpen = true;
  }

  loginMock() {
    this.authService.loginMock();
    this.isLoginModalOpen = false;
  }
}
