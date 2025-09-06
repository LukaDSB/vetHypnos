import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HdkButtonComponent } from '../button/hdk-button.component';

// Define os tipos de modal que podemos ter
type ModalType = 'confirmacao' | 'sucesso' | 'erro';

@Component({
  selector: 'app-hdk-modal-feedback',
  standalone: true,
  imports: [CommonModule, HdkButtonComponent],
  templateUrl: './hdk-modal-feedback.component.html',
  styleUrls: ['./hdk-modal-feedback.component.scss']
})
export class HdkModalFeedbackComponent {
  // --- Propriedades do Componente ---
  isOpen = false;
  tipo: ModalType = 'confirmacao';
  titulo = '';
  mensagem = '';
  textoConfirmar = 'Confirmar';
  textoCancelar = 'Cancelar';

  // --- Eventos de Saída ---
  @Output() confirmado = new EventEmitter<void>();
  @Output() cancelado = new EventEmitter<void>();

  // --- Métodos Públicos (para serem chamados pelo componente pai) ---

  /**
   * Abre a modal com as configurações desejadas.
   * @param tipo O tipo de modal: 'confirmacao', 'sucesso' ou 'erro'.
   * @param titulo O título a ser exibido.
   * @param mensagem A mensagem principal do corpo da modal.
   * @param textoConfirmar (Opcional) Texto para o botão de confirmação.
   * @param textoCancelar (Opcional) Texto para o botão de cancelar.
   */
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

  /**
   * Fecha a modal.
   */
  public close(): void {
    this.isOpen = false;
  }

  // --- Métodos Internos (usados pelo template) ---

  /**
   * Chamado quando o botão de confirmação é clicado.
   * Emite o evento 'confirmado' e fecha a modal.
   */
  onConfirm(): void {
    this.confirmado.emit();
    this.close();
  }

  /**
   * Chamado quando o botão de cancelar/fechar é clicado.
   * Emite o evento 'cancelado' e fecha a modal.
   */
  onCancel(): void {
    this.cancelado.emit();
    this.close();
  }
}
