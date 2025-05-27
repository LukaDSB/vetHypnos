import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Prontuario } from 'src/app/models/prontuario';
import { ProntuarioService } from 'src/app/services/prontuario.service';
import { TabelaComponent } from '../hdk/tabela/hdk-tabela.component';
import { HdkButtonComponent } from '../hdk/button/hdk-button.component';
import { HdkDivisor } from '../hdk/divisor/hdk-divisor.component';
import { AssociarPacienteModalComponent } from './modalAssociarPaciente/associar-paciente-modal/associar-paciente-modal.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-prontuarios',
  templateUrl: './prontuarios.component.html',
  styleUrls: ['./prontuarios.component.scss'],
  standalone: true,
  imports: [HdkDivisor, HdkButtonComponent, TabelaComponent],
})
export class ProntuariosComponent implements OnInit {
  dataSource:MatTableDataSource<Prontuario> = new MatTableDataSource<Prontuario>([]);
  displayedColumns: string[] = ['id', 'nome_usuario','nome_animal', 'data_prontuario', 'procedimento', 'status', 'acoes'];

  constructor(public dialog: MatDialog, private prontuarioService: ProntuarioService){}

ngOnInit(): void {
  this.carregarDados();
}

criarProntuario(prontuario: Prontuario){
  this.prontuarioService.criarProntuario(prontuario).subscribe({
    next: () => {
      this.carregarDados();
    },
    error: (err) => {
      console.error('Erro ao criar prontuário: ', err);
    }
  })
}

deletarProntuario(prontuario: Prontuario){
  if (confirm(`Deseja realmente excluir "${prontuario.id}"?`)){
    this.prontuarioService.deletarProntuario(prontuario.id).subscribe({
      next: () => {
        console.log(`Prontuario com ID ${prontuario.id} excluído.`);
        this.carregarDados();
      },
      error: (err) => {
        console.error(`Erro ao excluir prontuario de ID ${prontuario.id}`, err);
      }
    });
  }
}

carregarDados(){
  this.prontuarioService.getProntuarios().subscribe((data) => {
    this.dataSource = new MatTableDataSource(data);
  })
}

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
