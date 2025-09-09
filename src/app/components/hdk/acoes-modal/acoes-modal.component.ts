import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-acoes-modal',
  standalone: true,
  // A CORREÇÃO ESTÁ AQUI: Garanta que estes módulos estão na sua lista de imports
  imports: [
    CommonModule, 
    MatDialogModule, // Para mat-dialog-title, mat-dialog-content, etc.
    MatButtonModule   // Para mat-flat-button
  ],
  templateUrl: './acoes-modal.component.html',
  styleUrls: ['./acoes-modal.component.scss']
})
export class AcoesModalComponent {
  // O 'data' recebe o nome do item para exibição e se a ação de visualizar deve ser exibida.
  constructor(
    public dialogRef: MatDialogRef<AcoesModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { itemName: string, showVisualizar: boolean }
  ) {}

  // Fecha o modal e retorna a ação que foi clicada
  onActionClick(action: 'visualizar' | 'atualizar' | 'excluir'): void {
    this.dialogRef.close(action);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}