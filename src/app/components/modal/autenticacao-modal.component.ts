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
    if (!this.email || !this.senha) {
      console.error('Email e senha são obrigatórios.');
      return;
    }
    const dados = { email: this.email, senha: this.senha };
    this.authService.login(dados).subscribe({
      next: () => console.log('Login bem-sucedido!'),
      error: (err) => console.error('Falha no login', err)
    });
  }

  cadastrar() { 
    const dados = { nome: this.nome, email: this.email, senha: this.senha };
    this.authService.registrar(dados).subscribe({
      next: () => {
        console.log('Cadastro realizado com sucesso!');
        
        this.closeCadastro();
      },
      error: (err) => console.error('Falha no cadastro', err)
    });
  }

  openCadastro() {
    this.isLoginModalOpen = false;
    this.isCadastroModalOpen = true;
  }

  closeCadastro() {
    this.isCadastroModalOpen = false;
    this.isLoginModalOpen = true;
  }

}
