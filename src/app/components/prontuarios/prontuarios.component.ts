import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { AssociarPacienteModalComponent } from './modalAssociarPaciente/associar-paciente-modal/associar-paciente-modal.component';

@Component({
  selector: 'app-prontuarios',
  templateUrl: './prontuarios.component.html',
  styleUrls: ['./prontuarios.component.scss']
})
export class ProntuariosComponent {

  constructor(public dialog: MatDialog){}

  abrirModal(): void {
    console.log('Modal abriu');
    const dialogRef = this.dialog.open(AssociarPacienteModalComponent, {
      width: '400px',
      data: {}
    });
  
    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

}
