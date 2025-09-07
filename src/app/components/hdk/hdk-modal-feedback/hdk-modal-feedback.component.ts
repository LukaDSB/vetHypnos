import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HdkButtonComponent } from '../button/hdk-button.component';

type ModalType = 'confirmacao' | 'sucesso' | 'erro';

@Component({
  selector: 'app-hdk-modal-feedback',
  standalone: true,
  imports: [CommonModule, HdkButtonComponent],
  templateUrl: './hdk-modal-feedback.component.html',
  styleUrls: ['./hdk-modal-feedback.component.scss']
})
export class HdkModalFeedbackComponent {

  isOpen = false;
  tipo: ModalType = 'confirmacao';
  titulo = '';
  mensagem = '';
  textoConfirmar = 'Confirmar';
  textoCancelar = 'Cancelar';


  @Output() confirmado = new EventEmitter<void>();
  @Output() cancelado = new EventEmitter<void>();


  public open(
    tipo: ModalType,
    titulo: string,
    mensagem: string,
    textoConfirmar = 'Confirmar',
    textoCancelar = 'Cancelar'
  ): void {
    this.tipo = tipo;
    this.titulo = titulo;
    this.mensagem = mensagem;
    this.textoConfirmar = textoConfirmar;
    this.textoCancelar = textoCancelar;
    this.isOpen = true;
  }

  public close(): void {
    this.isOpen = false;
  }



  onConfirm(): void {
    this.confirmado.emit();
    this.close();
  }


  onCancel(): void {
    this.cancelado.emit();
    this.close();
  }
}
