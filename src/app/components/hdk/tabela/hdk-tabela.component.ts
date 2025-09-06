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
  // --- ALTERAÇÃO 1: Usaremos um setter para o dataSource ---
  private _dataSource: MatTableDataSource<T> = new MatTableDataSource<T>([]);

  @Input()
  set dataSource(data: MatTableDataSource<T>) {
    this._dataSource = data;
    this.connectPaginator(); // Conecta o paginador sempre que os dados mudam
  }
  get dataSource(): MatTableDataSource<T> {
    return this._dataSource;
  }
  // --- FIM DA ALTERAÇÃO 1 ---

  @Input() displayedColumns?: string[];
  @Input() pageSize = 10; // Define o tamanho padrão da página

  @Output() excluir: EventEmitter<T> = new EventEmitter<T>();
  @Output() atualizar: EventEmitter<T> = new EventEmitter<T>();
  @Output() selecionadosChange = new EventEmitter<Animal[]>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  selecionados: any[] = [];
  
  constructor(public dialog: MatDialog) {}
  
  ngAfterViewInit() {
    // --- ALTERAÇÃO 2: A lógica foi movida para uma função separada ---
    this.connectPaginator();
  }

  // --- ALTERAÇÃO 3: Nova função para conectar o paginador ---
  private connectPaginator() {
    if (this._dataSource && this.paginator) {
      this._dataSource.paginator = this.paginator;
    }
  }

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
}