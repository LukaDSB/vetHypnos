import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Especialidade } from 'src/app/models/especialidade.model';
import { AuthService } from 'src/app/services/auth.service';
import { EspecialidadeService } from 'src/app/services/especialidade.service';
import { HdkButtonComponent } from "../hdk/button/hdk-button.component";


@Component({
  selector: 'app-autenticacao-modal',
  templateUrl: './autenticacao-modal.component.html',
  styleUrls: ['./autenticacao-modal.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule, HdkButtonComponent]
})

export class AutenticacaoModalComponent implements OnInit {
  isLoginModalOpen = true;
  isCadastroModalOpen = false;
  email = '';
  senha = '';
  nome = '';
  cpf = '';
  crmv = '';
  especialidade = '';
  clinica_id = 1;
  especialidades: Especialidade[] = []; 
  especialidadeId: number | null = null;

  constructor(private authService: AuthService, private especialidadeService: EspecialidadeService) {}

  ngOnInit(): void {
    this.carregarEspecialidades();
  }

  carregarEspecialidades(): void {
    this.especialidadeService.getEspecialidades().subscribe({
      next: (data) => {
        this.especialidades = data;
      },
      error: (err) => console.error('Erro ao carregar especialidades:', err)
    });
  }

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
    const dados = { 
      nome: this.nome, 
      email: this.email, 
      senha: this.senha, 
      cpf: this.cpf, 
      crmv: this.crmv,
      clinica_id: this.clinica_id,
      especialidade_id: this.especialidadeId 
    };
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
    if (this.especialidades.length === 0) {
      this.carregarEspecialidades();
    }
  }

  closeCadastro() {
    this.isCadastroModalOpen = false;
    this.isLoginModalOpen = true;
  }

}
