/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { HdkModalComponent } from '../modal/hdk-modal.component';
import { DateMaskPipe } from './pipe';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { Animal } from 'src/app/models/animal.model';
import { DatePipe } from '@angular/common';

@Component({
  imports:[MatTableModule, RouterModule, MatPaginatorModule, MatDialogModule, DateMaskPipe, MatCheckboxModule, DatePipe],
  templateUrl: 'hdk-tabela.component.html',
  styleUrls: ['hdk-tabela.component.scss'],
  selector: 'hdk-tabela',
  standalone: true
})
export class TabelaComponent<T> implements AfterViewInit {
  @Input() dataSource: MatTableDataSource<T> = new MatTableDataSource<T>([]);
  @Input() pageSizeOptions: number[] = [10, 20];
  @Input() displayedColumns?: string[];

  @Output() excluir: EventEmitter<T> = new EventEmitter<T>();
  @Output() atualizar: EventEmitter<T> = new EventEmitter<T>();
  @Output() selecionadosChange = new EventEmitter<Animal[]>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  selecionados: any[] = [];
  
  constructor(public dialog: MatDialog) {}
  
  onCheckboxChange(element: any, checked: boolean) {
    element.selecionado = checked;

    if (checked) {
      this.selecionados.push(element);
    } else {
      this.selecionados = this.selecionados.filter(e => e !== element);
    }

    this.selecionadosChange.emit(this.selecionados);
  }
  
  onExcluir(element: T) {
    this.excluir.emit(element);
  }

  onAtualizar(element: T){
    this.atualizar.emit(element);
  }


  abrirModal(): void {
    const dialogRef = this.dialog.open(HdkModalComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  fecharModal(): void{
  }

  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      
    }
    console.log('Dados: ' + this.dataSource);
    
  }
}