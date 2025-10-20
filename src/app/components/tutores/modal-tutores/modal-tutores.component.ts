/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HdkButtonComponent } from '../../hdk/button/hdk-button.component';
import { CommonModule } from '@angular/common';
import { Tutor } from 'src/app/models/tutor.model';

@Component({
  selector: 'app-modal-tutores',
  templateUrl: './modal-tutores.component.html',
  styleUrls: ['./modal-tutores.component.scss'],
  standalone: true,
  imports:[FormsModule, HdkButtonComponent, CommonModule]
})
export class ModalTutoresComponent {
  tutorId?: number;
  nome: string = '';
  cpf: string = '';
  telefone: string = '';
  email: string = '';
  bairro: string = '';
  rua: string = '';
  numero: number = 0;
  cidade_nome: string = '';
  estado_nome: string = '';

  idContatoTelefone?: number;
  idContatoEmail?: number;
  
  idEndereco?: number;
  idCidade?: number;
  idEstado?: number;


  isAtualizarModal = false;
  isCadastroModalOpen = false;
  isDropdownTutorAberto = false;
  isDropdownEspecieAberto = false;

  @Output() cadastrar = new EventEmitter<Tutor>();
  @Output() atualizar = new EventEmitter<Tutor>();


  openCadastro() {
    this.isAtualizarModal = false;
    this.resetCampos();
    this.isCadastroModalOpen = true;
  }

  openAtualizar(tutor: Tutor) {
    console.log('Tutor para atualizar:', tutor);
    
    this.isAtualizarModal = true;
    this.tutorId = tutor.id;
    this.nome = tutor.nome;
    this.cpf = tutor.cpf;
    
    if (tutor.endereco) {
      this.idEndereco = tutor.endereco.id;
      this.bairro = tutor.endereco.bairro;
      this.rua = tutor.endereco.rua;
      this.numero = Number(tutor.endereco.numero) || 0;

      if (tutor.endereco.cidade) {
        this.cidade_nome = tutor.endereco.cidade.nome;
        this.idCidade = tutor.endereco.cidade.id;

        if (tutor.endereco.cidade.estado) {
          this.estado_nome = tutor.endereco.cidade.estado.nome;
          this.idEstado = tutor.endereco.cidade.estado.id;
        }
      }
    } else {
        this.idEndereco = undefined;
    }

    if (tutor?.contatos) {
      const contatoTelefone = tutor.contatos.find(
        (contato: any) => contato.tipoContato?.descricao?.toLowerCase() === 'telefone'
      );
      if (contatoTelefone) {
        this.telefone = contatoTelefone.descricao;
        this.idContatoTelefone = contatoTelefone.id;
      }

      const contatoEmail = tutor.contatos.find(
        (contato: any) => contato.tipoContato?.descricao?.toLowerCase() === 'email'
      );
      if (contatoEmail) {
        this.email = contatoEmail.descricao;
        this.idContatoEmail = contatoEmail.id;
      }
    }

    this.isCadastroModalOpen = true;
  }

  onBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).id === 'modal-background') {
      this.isDropdownTutorAberto = false;
      this.isDropdownEspecieAberto = false;
    }
  }

  salvarTutor() {
    if(!this.nome || !this.cpf) {
      alert('Por favor, preencha todos os campos obrigatórios (nome e cpf) antes de salvar.');
      return;
    }

    const tutor: any = {
      id: this.tutorId,
      nome: this.nome,
      cpf: this.cpf
    };

    if (this.rua || this.numero || this.bairro || this.cidade_nome || this.estado_nome) {
      tutor.endereco = {
        ...(this.isAtualizarModal && this.idEndereco ? { id: this.idEndereco } : {}), 
        
        rua: this.rua,
        numero: this.numero.toString(),
        bairro: this.bairro,
        
        cidade: {
          ...(this.isAtualizarModal && this.idCidade ? { id: this.idCidade } : {}), 
          nome: this.cidade_nome,
          
          estado: {
            ...(this.isAtualizarModal && this.idEstado ? { id: this.idEstado } : {}),
            nome: this.estado_nome
          }
        }
      };
    } else {
      tutor.endereco = null;
    }

    // 2. Estrutura dos CONTATOS (Ajustado para o JSON esperado)
    tutor.contatos = [];
    
    if (this.telefone) {
      const contatoTelefone: any = {
        descricao: this.telefone,
        tipoContato: { id: 2, descricao: "telefone" } // ID 2 para telefone (assumido)
      };
      
      // Adiciona o ID do contato se for atualização
      if (this.isAtualizarModal && this.idContatoTelefone) {
        contatoTelefone.id = this.idContatoTelefone;
      }
      tutor.contatos.push(contatoTelefone);
    }

    if (this.email) {
      const contatoEmail: any = {
        descricao: this.email,
        tipoContato: { id: 1, descricao: "email" }
      };

      if (this.isAtualizarModal && this.idContatoEmail) {
        contatoEmail.id = this.idContatoEmail;
      }
      tutor.contatos.push(contatoEmail);
    }

    if (this.isAtualizarModal){
      this.atualizar.emit(tutor);
    } else {
      this.cadastrar.emit(tutor);
    }
    this.closeCadastro();
  }

  closeCadastro() {
    this.isCadastroModalOpen = false;
  }

  resetCampos(){
    this.tutorId = undefined;
    this.nome = '';
    this.cpf = '';
    this.telefone = '';
    this.email = '';
    this.bairro = '';
    this.rua = '';
    this.numero = 0;
    this.cidade_nome = '';
    this.estado_nome = '';
    
    this.idContatoTelefone = undefined;
    this.idContatoEmail = undefined;
    this.idEndereco = undefined;
    this.idCidade = undefined;
    this.idEstado = undefined;
  }

}