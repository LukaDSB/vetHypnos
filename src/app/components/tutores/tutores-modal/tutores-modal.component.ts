import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { HdkButtonComponent } from '../../hdk/button/hdk-button.component';
import { Location } from '@angular/common';
import { Tutor } from 'src/app/models/tutor.model';
import { TutorService } from 'src/app/services/tutor.service';
import { NgxMaskDirective } from 'ngx-mask';


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
      enderecoId = 0;
      contatoId = 0;
      id = 0;
      @Output() cadastrar = new EventEmitter<Tutor>();
      @Output() atualizar = new EventEmitter<Tutor>();

  constructor(private authService: AuthService, private location: Location, private tutorService: TutorService) {}

  
    cadastrarTutor(){
      const novoTutor: Tutor = {
        id:0,
        tutor_nome: this.nomeTutor,
        tutor_cpf: this.cpfTutor,
        endereco_id: this.enderecoId,
        contato_id: this.contatoId
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
        endereco_id: this.enderecoId || 0,
        contato_id: this.contatoId || 0,
      };
        console.log('teste');
  
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
  
    loginMock() {
      this.authService.loginMock();
    }
}
