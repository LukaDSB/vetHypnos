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
  nome?: string;
  cpf?: string;
  telefone?: string;
  email?: string;
  bairro?: string;
  rua?: string;
  numero?: number;
  cidade_nome?: string;
  estado_nome?: string;

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
      nome: this.nome,
      cpf: this.cpf
    };

    if (this.rua || this.numero || this.bairro || this.cidade_nome || this.estado_nome) {
    tutor.endereco = {
      rua: this.rua,
      numero: this.numero,
      bairro: this.bairro,
      cidade: {
        cidade_nome: this.cidade_nome,
        estado: {
          estado_nome: this.estado_nome
        }
      }
    };
  }else {
      tutor.endereco = null;
    }

    tutor.contatos = [];
    if (this.telefone) {
      tutor.contatos.push({
        descricao: this.telefone,
        tipo_contato_id: 2
      });
    }

    if (this.email) {
      tutor.contatos.push({
        descricao: this.email,
        tipo_contato_id: 1
      });
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
    this.nome = undefined;
    this.cpf = undefined;
    this.telefone = undefined;
    this.email = undefined;
    this.bairro = undefined;
    this.rua = undefined;
    this.numero = undefined;
    this.cidade_nome = undefined;
    this.estado_nome = undefined;
  }

}