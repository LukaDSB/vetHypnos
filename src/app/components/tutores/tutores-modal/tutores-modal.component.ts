import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { HdkButtonComponent } from '../../hdk/button/hdk-button.component';
import { Location } from '@angular/common';
import { Tutor } from 'src/app/models/tutor.model';
import { NgxMaskDirective } from 'ngx-mask';
import { ViaCepService } from 'src/app/services/viacep.service';

@Component({
  selector: 'app-tutores-modal',
  templateUrl: './tutores-modal.component.html',
  styleUrls: ['./tutores-modal.component.scss'],
  standalone: true,
  imports:[FormsModule, CommonModule, HdkButtonComponent, NgxMaskDirective]
})
export class TutoresModalComponent{
    tutor: Tutor | undefined;
   isCadastroModalOpen = false;
   isAtualizarModal = false;
   isCadastrarModal = true;
      nomeTutor = "";
      cpfTutor = 0;
      contatoId?: number;
      cepId = "";
      rua = "";
      bairro = "";
      numero = "";
      cidade = "";
      estado = "";
      enderecoId?: number;
      id = 0;
      @Output() cadastrar = new EventEmitter<Tutor>();
      @Output() atualizar = new EventEmitter<Tutor>();

  constructor(private authService: AuthService, private location: Location, private viaCepService: ViaCepService) {}

  
    cadastrarTutor(){
      const novoTutor: Tutor = {
        id: this.id,
        tutor_nome: this.nomeTutor,
        tutor_cpf: this.cpfTutor,
         ...(this.contatoId != null && { contato_id: this.contatoId }),
      };
  
      if (this.isAtualizarModal){
      this.atualizar.emit(novoTutor);
      } else {
      this.cadastrar.emit(novoTutor);
      }
      this.closeCadastro();
    }
  
    openAtualizar(ttr: Tutor){
        this.tutor = ttr; 
        this.nomeTutor = ttr.tutor_nome;
        this.cpfTutor = ttr.tutor_cpf;
        this.contatoId = ttr.contato_id;
        this.enderecoId = ttr.endereco_id;
  
        this.isCadastroModalOpen = false;
        this.isAtualizarModal = true;
        this.isCadastroModalOpen = true;
    }
  
    atualizarTutor(){
      if (!this.tutor) return;
  
      const tutorAtualizado: Tutor = {
        ...this.tutor,
        tutor_nome: this.nomeTutor || "",
        tutor_cpf: this.cpfTutor || 0,
        endereco_id: this.enderecoId,
        contato_id: this.contatoId,
      };
  
      this.atualizar.emit(tutorAtualizado);
      this.closeCadastro();
    }
  
    resetCampos(){
        this.nomeTutor = '';
        this.cpfTutor = 0;
        this.contatoId =  0;
        this.enderecoId = 0;
    }
  
  
    voltar(){
      this.location.back();
    }
  
    openCadastro() {
      this.isCadastroModalOpen = true;
      this.isAtualizarModal = false;
      this.resetCampos();
      this.isCadastrarModal= true;
    }
  
    closeCadastro() {
      this.isCadastroModalOpen = false;
    }
  
    carregarEnderecoViaCep(cep: string) {
       this.viaCepService.getEnderecosViaCEP(cep).subscribe({
        next: (data) => {
        this.rua = data.logradouro;
        this.cidade = data.cidade;
        this.estado = data.estado;
    },
    error: (err) => {
      console.error('Erro ao carregar endereço:', err);
    }
  });
}
}
