// src/app/pages/prontuarios/prontuarios.component.ts

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Prontuario } from 'src/app/models/prontuario';
import { ProntuarioService } from 'src/app/services/prontuario.service';
import { TabelaComponent } from '../hdk/tabela/hdk-tabela.component';
import { HdkButtonComponent } from '../hdk/button/hdk-button.component';
import { HdkDivisor } from '../hdk/divisor/hdk-divisor.component';
import { MatTableDataSource } from '@angular/material/table';
import { AssociarAnimalModalComponent } from './modalAssociarAnimal/associar-animal-modal/associar-animal-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prontuarios',
  templateUrl: './prontuarios.component.html',
  styleUrls: ['./prontuarios.component.scss'],
  standalone: true,
  imports: [HdkDivisor, HdkButtonComponent, TabelaComponent],
})
export class ProntuariosComponent implements OnInit {
  dataSource:MatTableDataSource<Prontuario> = new MatTableDataSource<Prontuario>([]);
  displayedColumns: string[] = ['id', 'usuario_nome','animal_nome', 'data_prontuario', 'procedimento', 'status', 'acoes'];

  constructor(public dialog: MatDialog, private prontuarioService: ProntuarioService, private router: Router){}

  ngOnInit(): void {
    this.carregarDados();
  }

  visualizarProntuario(prontuario: Prontuario): void {
    this.router.navigate(['/prontuarios/prontuarioFinalizado', prontuario.id], {
      state: { prontuarioData: prontuario } 
    });
  }

  deletarProntuario(prontuario: Prontuario){
    if (confirm(`Deseja realmente excluir o prontuário "${prontuario.id}"?`)){
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
      console.log('Dados recebidos para a tabela:', data);
      this.dataSource = new MatTableDataSource(data);
    })
  }

  abrirModal(): void {
    const dialogRef = this.dialog.open(AssociarAnimalModalComponent, {
      width: '400px',
      data: {}
    });
  
    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  buscarProntuarios(): void {
    
  }
}