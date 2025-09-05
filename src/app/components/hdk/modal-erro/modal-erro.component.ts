import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HdkButtonComponent } from 'src/app/components/hdk/button/hdk-button.component'; 

@Component({
  selector: 'app-modal-erro',
  templateUrl: './modal-erro.component.html',
  styleUrls: ['./modal-erro.component.scss'],
  standalone: true,
  imports: [CommonModule, HdkButtonComponent] 
})
export class ModalErroComponent {
  
  public isModalOpen = false;
  
  public mensagemErro: string = '';

  constructor() { }
  public abrir(mensagem: string): void {
    this.mensagemErro = mensagem;
    this.isModalOpen = true;
  }

  public fechar(): void {
    this.isModalOpen = false;
  }
}