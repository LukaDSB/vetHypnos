import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Especialidade } from 'src/app/models/especialidade.model';
import { AuthService } from 'src/app/services/auth.service';
import { EspecialidadeService } from 'src/app/services/especialidade.service';
import { HdkButtonComponent } from "../hdk/button/hdk-button.component";
import { HdkModalFeedbackComponent } from '../hdk/hdk-modal-feedback/hdk-modal-feedback.component';
import { HdkModalComponent } from "../hdk/modal/hdk-modal.component";


@Component({
  selector: 'app-autenticacao-modal',
  templateUrl: './autenticacao-modal.component.html',
  styleUrls: ['./autenticacao-modal.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule, HdkButtonComponent, HdkModalComponent, HdkModalFeedbackComponent]
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
  @ViewChild(HdkModalFeedbackComponent) modalFeedback!: HdkModalFeedbackComponent;

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
    if (!this.nome || !this.email || !this.senha) {
        this.modalFeedback.open('erro', 'Campos Obrigatórios', 'Por favor, preencha os campos obrigatórios (*)');
        return;
    }
    
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
        this.modalFeedback.open('sucesso', 'Sucesso!', 'Cadastro realizado com sucesso! Faça seu login.');
        this.closeCadastro();
      },
      error: (err) => {
        console.error('Falha no cadastro', err);
        
        let mensagemErro = 'Erro desconhecido no cadastro.';
        
        if (err.error && err.error.message) {
          mensagemErro = err.error.message;
        } 
        else if (err.message && err.message.includes('Http failure response')) {
          mensagemErro = 'Preenchimento incompleto. Verifique todos os campos obrigatórios (Nome, Email, Senha, CPF, CRMV).';
        }
        
        this.modalFeedback.open('erro', 'Erro no Cadastro', mensagemErro);
      }
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
